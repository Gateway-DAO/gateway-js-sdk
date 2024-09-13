import { Auth } from '../src/modules/auth/auth';

import createClient from 'openapi-fetch';
import { GTWError } from '../src/helpers/custom-error';
import {
  authDetails,
  authSolanaDetails,
  errorMessage,
  mockClient,
  mockGet,
  mockPost,
  successMessage,
} from './stubs/common.stub';
import { routes } from '../src/common/routes';
jest.mock('openapi-fetch');

let auth: Auth;

beforeAll(() => {
  (createClient as jest.Mock).mockReturnValue(mockClient);
  auth = new Auth(mockClient);
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Auth Unit Test', () => {
  test('should generate sign message', async () => {
    mockGet.mockResolvedValue(successMessage());

    const message = await auth.generateSignMessage();
    expect(message).toBeDefined();
    expect(mockGet).toHaveBeenCalledWith(routes.GenerateSignMessage);
  });

  it('should throw GTWError for generate sign message', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(auth.generateSignMessage()).rejects.toThrow(GTWError);
    expect(mockGet).toHaveBeenCalledWith('/auth/message');
    expect(mockGet).toHaveBeenCalledWith(routes.GenerateSignMessage);
  });

  test('should generate refresh token', async () => {
    mockGet.mockResolvedValue(successMessage({ data: { token: 'test' } }));

    const message = await auth.generateRefreshToken();

    expect(message).toBeDefined();
    expect(mockGet).toHaveBeenCalledWith(routes.RefreshToken);
  });

  it('should throw GTWError for generate refresh token', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(auth.generateRefreshToken()).rejects.toThrow(GTWError);
    expect(mockGet).toHaveBeenCalledWith(routes.RefreshToken);
  });

  test('should login using etherum wallet', async () => {
    mockPost.mockResolvedValue(successMessage({ data: { token: 'test' } }));

    const message = await auth.login(authDetails());

    expect(message).toBeDefined();
    expect(mockPost).toHaveBeenCalledWith(routes.AuthenticateAccount, {
      body: authDetails(),
    });
  });

  test('should login using solana wallet', async () => {
    mockPost.mockResolvedValue(successMessage({ data: { token: 'test' } }));

    const message = await auth.login(authSolanaDetails());

    expect(message).toBeDefined();
    expect(mockPost).toHaveBeenCalledWith(routes.AuthenticateAccount, {
      body: authDetails(),
    });
  });

  it('should throw GTWError for login', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(auth.login(authDetails())).rejects.toThrow(GTWError);
    expect(mockPost).toHaveBeenCalledWith(routes.AuthenticateAccount, {
      body: authDetails(),
    });
  });
});
