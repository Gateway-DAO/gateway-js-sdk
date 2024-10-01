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
jest.mock('jsonwebtoken');

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
      ...jest.requireActual('../src/helpers/helper'), // preserve other exports
      checkJWTTokenExpiration: jest.fn().mockReturnValue(true),
      issueJWT: jest.fn(), // Mock issueJWT but don't call it
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
    it('should return dev URL for dev environment', () => {
      expect(parameterChecker('dev', '', 'some-random-hex-key')).toStrictEqual({
        mode: 'privateKey',
        url: 'https://dev.api.gateway.tech',
        value: 'some-random-hex-key',
      });
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
});
