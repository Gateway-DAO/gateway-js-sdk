import { paths } from '../src/api';

import { Auth } from '../src/modules/auth/auth';
import { OpenAPIClient } from '../src/common/types';
import { MediaType } from 'openapi-typescript-helpers';
import createClient from 'openapi-fetch';

let auth: Auth;
let mockClient: OpenAPIClient<paths, MediaType>;
jest.mock('openapi-fetch');
let mockGet: jest.Mock;

beforeAll(() => {
  mockGet = jest.fn();
  mockClient = {
    GET: mockGet,
  } as any as OpenAPIClient<paths, MediaType>;

  (createClient as jest.Mock).mockReturnValue(mockClient);
  auth = new Auth(mockClient);
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Auth Unit Test', () => {
  test('generate sign message', async () => {
    mockGet.mockResolvedValue({
      data: { message: 'Test message' },
      error: null,
      response: {},
    });

    const message = await auth.generateSignMessage();
    console.log(message);
    expect(message).toBeDefined();
  });

  test('generate sign message', async () => {
    mockGet.mockResolvedValue({
      data: { token: 'Test message' },
      error: null,
      response: {},
    });

    const message = await auth.generateRefreshToken();

    expect(message).toBeDefined();
  });
});
