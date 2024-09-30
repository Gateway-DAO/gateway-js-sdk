import { OpenAPIClient, MyAccountResponse } from '../src/common/types';
import { paths } from '../src/api';

import { GTWError } from '../src/helpers/custom-error';
import { Account } from '../src/modules/account/account';
import { MediaType } from 'openapi-typescript-helpers';
import {
  authDetails,
  errorMessage,
  mockClient,
  mockGet,
  mockPatch,
  mockPost,
  successMessage,
} from './stubs/common.stub';
import { routes } from '../src/common/routes';

describe('Account', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account(
      mockClient as unknown as OpenAPIClient<paths, MediaType>,
    );
  });

  describe('create Account ', () => {
    it('should return with new account with given credentials', async () => {
      mockPost.mockResolvedValue(successMessage({ data: { token: 'test' } }));

      const result = await account.createAccount(
        authDetails({ username: 'testuser' }),
      );

      expect(result).toBeDefined();
      expect(mockPost).toHaveBeenCalledWith(routes.CreateAccount, {
        body: authDetails({ username: 'testuser' }),
      });
    });

    it('should return error when creating account', async () => {
      mockPost.mockResolvedValue(errorMessage());

      await expect(
        account.createAccount(authDetails({ username: 'testuser' })),
      ).rejects.toThrow(GTWError);
      expect(mockPost).toHaveBeenCalledWith(routes.CreateAccount, {
        body: authDetails({ username: 'testuser' }),
      });
    });
  });

  describe('getAccountInfo', () => {
    it('should return account info when API call is successful', async () => {
      const mockData = {
        did: '123',
        username: 'Test User',
      } as MyAccountResponse;
      mockGet.mockResolvedValue({
        data: mockData,
        response: {},
        error: null,
      });

      const result = await account.getAccountInfo();

      expect(result).toEqual(mockData);
      expect(mockClient.GET).toHaveBeenCalledWith(routes.GetMyAccount);
    });

    it('should throw GTWError when API call fails', async () => {
      mockGet.mockResolvedValue(errorMessage());

      await expect(account.getAccountInfo()).rejects.toThrow(GTWError);
      expect(mockClient.GET).toHaveBeenCalledWith(routes.GetMyAccount);
    });
  });

  describe('update Account', () => {
    it('should return account with updated attributes', async () => {
      const mockData = {
        created_at: '2024-09-25T12:34:56Z',
        did: 'did:example:123456789abcdefghi',
        profile_picture: 'https://example.com/profile-picture.png',
        storage_size: 1024,
        updated_at: '2024-09-25T13:34:56Z',
        username: 'new_username',
        username_updated_at: '2024-09-25T12:35:56Z',
        wallet_address: '0x123456789abcdefghi',
      };

      mockPatch.mockResolvedValue({
        data: mockData,
        response: {},
        error: null,
      });

      const result = await account.updateAccount(
        'https://example.com/profile-picture.png',
      );

      expect(result).toEqual(mockData);
      expect(mockClient.PATCH).toHaveBeenCalledWith(routes.UpdateAccount, {
        body: {
          profile_picture: 'https://example.com/profile-picture.png',
          username: undefined,
        },
      });
    });

    it('should throw GTWError when API call fails', async () => {
      const mockResponse = { status: 401 } as Response;

      mockPatch.mockResolvedValue({
        data: null,
        response: mockResponse,
        error: { error: 'Unauthorized' },
      });

      await expect(account.updateAccount()).rejects.toThrow(GTWError);
      expect(mockClient.PATCH).toHaveBeenCalledWith(routes.UpdateAccount, {
        body: {
          profile_picture: 'https://example.com/profile-picture.png',
          username: undefined,
        },
      });
    });
  });
});
