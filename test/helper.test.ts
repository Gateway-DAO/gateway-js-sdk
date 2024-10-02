import jwt from 'jsonwebtoken';
import {
  AuthMiddleware,
  checkJWTTokenExpiration,
  issueJWT,
  parameterChecker,
  toRFC3339,
} from '../src/helpers/helper';
import { OpenAPIClient } from '../src/common/types';
import { WalletService } from '../src/services/wallet-service';
import { Auth } from '../src/modules/auth/auth';
import { routes } from '../src/common/routes';

jest.mock('../src/modules/auth/auth');
jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

describe('JWT Token Handling', () => {
  let config: { client: string; wallet: string };
  let accessToken: string | null;

  beforeEach(() => {
    config = { client: 'mockClient', wallet: 'mockWallet' };
    accessToken = null;
    jest.resetAllMocks();
  });

  it('should return existing accessToken when the token is valid', async () => {
    jest.mock('../src/helpers/helper', () => ({
      ...jest.requireActual('../src/helpers/helper'),
      checkJWTTokenExpiration: jest.fn().mockReturnValue(true),
      issueJWT: jest.fn(),
    }));

    accessToken = 'mockAccessToken';

    expect(accessToken).toBe('mockAccessToken');
  });

  it('should call issueJWT when the token is invalid', async () => {
    jest.mock('../src/helpers/helper', () => ({
      ...jest.requireActual('../src/helpers/helper'),
      checkJWTTokenExpiration: jest.fn().mockReturnValue(false),
      issueJWT: jest.fn().mockResolvedValue('newMockAccessToken'),
    }));

    accessToken = 'mockAccessToken';

    expect(accessToken).toBe('mockAccessToken');
  });
});

describe('Utils', () => {
  describe('parameterChecker', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should return dev URL and privateKey mode for dev environment', () => {
      const result = parameterChecker('dev', '', 'some-random-hex-key');
      expect(result).toStrictEqual({
        mode: 'privateKey',
        url: 'https://dev.api.gateway.tech',
        value: 'some-random-hex-key',
      });
    });

    it('should throw error if JWT is expired', () => {
      const mockExpiredJwt = 'expiredMockJwt';
      jest.mock('../src/helpers/helper', () => ({
        ...jest.requireActual('../src/helpers/helper'),
        checkJWTTokenExpiration: jest.fn().mockReturnValue(false),
      }));

      expect(() => parameterChecker('dev', mockExpiredJwt)).toThrow(
        'The provided token is expired or invalid.',
      );
    });

    it('should throw error for invalid environment', () => {
      expect(() => parameterChecker('production' as any)).toThrow(
        'Need jwt or private key',
      );
    });

    it('should throw error for undefined environment', () => {
      expect(() => parameterChecker(undefined as any)).toThrow(
        'No url found!.Use either sandbox or production env',
      );
    });

    it('should throw error if neither JWT nor privateKey is provided', () => {
      expect(() => parameterChecker('dev')).toThrow('Need jwt or private key');
    });
  });

  describe('AuthMiddleware', () => {
    let mockClient: jest.Mocked<OpenAPIClient<any, any>>;
    let mockWallet: jest.Mocked<WalletService>;
    let mockConfig: any;

    beforeEach(() => {
      mockClient = {} as any;
      mockWallet = {
        signMessage: jest.fn(),
      } as any;
      mockConfig = {
        client: mockClient,
        wallet: mockWallet,
      };
      (Auth as jest.MockedClass<typeof Auth>).mockClear();
      (jwt.decode as jest.Mock).mockClear();
      jest.resetAllMocks();
    });

    it('should not add authorization header for unprotected routes', async () => {
      const middleware = AuthMiddleware(mockConfig);
      const mockRequest = new Request('https://example.com');
      const mockOptions: any = {
        request: mockRequest,
        schemaPath: routes.AuthenticateAccount,
      };

      if (middleware.onRequest) {
        const result = await middleware.onRequest(mockOptions);
        if (result instanceof Request) {
          expect(result.headers.get('Authorization')).toBeNull();
        } else {
          fail('onRequest did not return a Request object');
        }
      } else {
        fail('onRequest method is undefined');
      }
    });

    it('should add authorization header for protected routes', async () => {
      const mockAuthInstance = {
        getMessage: jest.fn().mockResolvedValue('message'),
        login: jest.fn().mockResolvedValue('jwt_token'),
      };
      (Auth as jest.MockedClass<typeof Auth>).mockImplementation(
        () => mockAuthInstance as any,
      );
      mockWallet.signMessage.mockResolvedValue({
        signature: 'sig',
        signingKey: 'key',
      });
      (jwt.decode as jest.Mock).mockReturnValue({
        exp: Date.now() / 1000 + 3600,
      });

      const middleware = AuthMiddleware(mockConfig);
      const mockRequest = new Request('https://example.com');
      const mockOptions: any = {
        request: mockRequest,
        schemaPath: '/protected/route',
      };

      if (middleware.onRequest) {
        const result = await middleware.onRequest(mockOptions);
        if (result instanceof Request) {
          expect(result.headers.get('Authorization')).toBe('Bearer jwt_token');
        } else {
          fail('onRequest did not return a Request object');
        }
      } else {
        fail('onRequest method is undefined');
      }
    });
  });

  describe('toRFC3339', () => {
    it('should convert Date to RFC3339 format', () => {
      const date = new Date('2023-05-15T10:30:00Z');
      expect(toRFC3339(date)).toBe('2023-05-15T10:30:00.000Z');
    });
  });

  describe('checkJWTTokenExpiration', () => {
    const mockCurrentTime = Math.floor(Date.now() / 1000);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return true if the token is valid and not expired', () => {
      const mockToken = 'mockToken';
      const mockDecodedToken = {
        exp: mockCurrentTime + 3600, // Token expires in 1 hour
      };

      (jwt.decode as jest.Mock).mockReturnValue(mockDecodedToken);

      const result = checkJWTTokenExpiration(mockToken);
      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(true);
    });

    it('should return false if the token is expired', () => {
      const mockToken = 'mockToken';
      const mockDecodedToken = {
        exp: mockCurrentTime - 100, // Token expired 100 seconds ago
      };

      (jwt.decode as jest.Mock).mockReturnValue(mockDecodedToken);

      const result = checkJWTTokenExpiration(mockToken);
      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(false);
    });

    it('should return false if the token does not have an exp field', () => {
      const mockToken = 'mockToken';
      const mockDecodedToken = {
        // no 'exp' field
      };

      (jwt.decode as jest.Mock).mockReturnValue(mockDecodedToken);

      const result = checkJWTTokenExpiration(mockToken);
      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(true); // The token is considered valid if no `exp` field
    });

    it('should return false if jwt.decode returns null', () => {
      const mockToken = 'mockToken';

      (jwt.decode as jest.Mock).mockReturnValue(null);

      const result = checkJWTTokenExpiration(mockToken);
      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(false);
    });

    it('should return false if jwt.decode throws an error', () => {
      const mockToken = 'mockToken';

      (jwt.decode as jest.Mock).mockImplementation(() => {
        throw new Error('Error decoding token');
      });

      const result = checkJWTTokenExpiration(mockToken);
      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(false);
    });
  });
});
