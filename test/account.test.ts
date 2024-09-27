import { OpenAPIClient, MyAccountResponse } from '../src/common/types';
import { paths } from '../src/api';

import { GTWError } from '../src/helpers/custom-error';
import { Account } from '../src/modules/account/account';
import { MediaType } from 'openapi-typescript-helpers';
import {
  errorMessage,
  mockClient,
  mockGet,
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

  describe('getAccountInfo', () => {
    it('should return account info when API call is successful', async () => {
      const mockData: MyAccountResponse = {
        did: '123',
        username: 'Test User',
        created_at: new Date().toDateString(),
        storage_size: 123,
        updated_at: new Date().toDateString(),
        username_updated_at: new Date().toDateString(),
        wallet_addresses: [],
      };
      mockGet.mockResolvedValue(successMessage({ data: mockData }));

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
});
