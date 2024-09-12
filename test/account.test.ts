import { OpenAPIClient, MyAccountResponse } from '../src/common/types';
import { paths } from '../src/api';

import { GTWError } from '../src/helpers/custom-error';
import { Account } from '../src/modules/account/account';
import { MediaType } from 'openapi-typescript-helpers';

const mockClient = {
  GET: jest.fn(),
};

describe('Account', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account(
      mockClient as unknown as OpenAPIClient<paths, MediaType>,
    );
  });

  describe('getAccountInfo', () => {
    it('should return account info when API call is successful', async () => {
      const mockData: MyAccountResponse = { did: '123', username: 'Test User' };
      mockClient.GET.mockResolvedValue({
        data: mockData,
        response: {},
        error: null,
      });

      const result = await account.getAccountInfo();

      expect(result).toEqual(mockData);
      expect(mockClient.GET).toHaveBeenCalledWith('/accounts/me');
    });

    it('should throw GTWError when API call fails', async () => {
      const mockResponse = { status: 401 } as Response;

      mockClient.GET.mockResolvedValue({
        data: null,
        response: mockResponse,
        error: { error: 'Unauthorized' },
      });

      await expect(account.getAccountInfo()).rejects.toThrow(GTWError);
      expect(mockClient.GET).toHaveBeenCalledWith('/accounts/me');
    });
  });
});
