import { OpenAPIClient, MyAccountResponse } from '../src/common/types';
import { paths } from '../src/api';

import { GTWError } from '../src/helpers/custom-error';
import { Account } from '../src/modules/account/account';
import { MediaType } from 'openapi-typescript-helpers';
import {
  authDetails,
  errorMessage,
  mockClient,
  mockDelete,
  mockGet,
  mockPatch,
  mockPost,
  successMessage,
} from './stubs/common.stub';
import { routes } from '../src/common/routes';
import { Wallet } from '../src/modules/account/wallet';

const mockResponse = (overrideParams?: any) => ({
  data: {
    created_at: '2023-01-01',
    did: 'did:something',
    profile_picture: 'profile_picture_url',
    storage_size: 1000,
    updated_at: '2023-01-02',
    username: 'user',
    username_updated_at: '2023-01-03',
    wallet_addresses: [
      {
        account_id: 1,
        address: '7z6D7cT8W5BXpHeEwr51wwheFzY7C5L1Jo7f6y9vER4T',
        chain: 'eth',
        created_at: '2023-01-01',
        id: 1,
        updated_at: '2023-01-02',
      },
    ],
  },
  ...overrideParams,
});

describe('Wallet', () => {
  let wallet: Wallet;

  beforeEach(() => {
    wallet = new Wallet(
      mockClient as unknown as OpenAPIClient<paths, MediaType>,
    );
  });

  describe('add wallet', () => {
    it('should return account with added new wallet', async () => {
      mockPost.mockReturnValue(successMessage(mockResponse));

      const result = await wallet.addWallet(
        '7z6D7cT8W5BXpHeEwr51wwheFzY7C5L1Jo7f6y9vER4T',
      );

      expect(result).toBeDefined();
      expect(mockPost).toHaveBeenCalledWith(routes.AddWallet, {
        body: {
          address: mockResponse().data.wallet_addresses[0].address,
        },
      });
    });

    it('should throw GTWError when API call fails', async () => {
      mockPost.mockResolvedValue(errorMessage());

      await expect(wallet.addWallet('7z6D7cT8W5BXpHeE')).rejects.toThrow(
        GTWError,
      );
      expect(mockPost).toHaveBeenCalledWith(routes.AddWallet, {
        body: {
          address: mockResponse().data.wallet_addresses[0].address,
        },
      });
    });
  });

  describe('remove wallet', () => {
    it('should return account without given wallet address', async () => {
      const address = '7z6D7cT8W5BXpHeEwr51wwheFzY7C5L1Jo7f6y9vER4T';
      mockDelete.mockReturnValue(
        successMessage(mockResponse({ wallet_addresses: '' })),
      );

      const result = await wallet.removeWallet(address);

      expect(result).toBeDefined();
      expect(mockDelete).toHaveBeenCalledWith(routes.RemoveWallet, {
        params: { path: { address } },
      });
    });
  });
});
