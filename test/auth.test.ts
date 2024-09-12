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
    expect(mockGet).toHaveBeenCalled();
  });

  it('should throw GTWError for generate sign message', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(auth.generateSignMessage()).rejects.toThrow(GTWError);
    expect(mockGet).toHaveBeenCalledWith('/auth/message');
    expect(mockGet).toHaveBeenCalled();
  });

  test('should generate refresh token', async () => {
    mockGet.mockResolvedValue(successMessage({ data: { token: 'test' } }));

    const message = await auth.generateRefreshToken();

    expect(message).toBeDefined();
    expect(mockGet).toHaveBeenCalled();
  });

  it('should throw GTWError for generate refresh token', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(auth.generateRefreshToken()).rejects.toThrow(GTWError);
    expect(mockGet).toHaveBeenCalledWith('/auth/refresh-token');
    expect(mockGet).toHaveBeenCalled();
  });

  test('should login using etherum wallet', async () => {
    mockPost.mockResolvedValue(successMessage({ data: { token: 'test' } }));

    const message = await auth.login(authDetails());

    expect(message).toBeDefined();
    expect(mockPost).toHaveBeenCalled();
  });

  test('should login using solana wallet', async () => {
    mockPost.mockResolvedValue(successMessage({ data: { token: 'test' } }));

    const message = await auth.login(authSolanaDetails());

    expect(message).toBeDefined();
    expect(mockPost).toHaveBeenCalled();
  });

  it('should throw GTWError for login', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(auth.login(authDetails())).rejects.toThrow(GTWError);
    expect(mockPost).toHaveBeenCalledWith('/auth', {
      body: authDetails(),
    });
    expect(mockPost).toHaveBeenCalled();
  });
});
