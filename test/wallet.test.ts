import { OpenAPIClient } from '../src/common/types';
import { paths } from '../src/api';

import { GTWError } from '../src/helpers/custom-error';
import { MediaType } from 'openapi-typescript-helpers';
import {
  errorMessage,
  mockClient,
  mockDelete,
  mockPost,
  successMessage,
  mockWalletResponse,
} from './stubs/common.stub';
import { routes } from '../src/common/routes';
import { Wallet } from '../src/modules/account/wallet';

describe('Wallet', () => {
  let wallet: Wallet;

  beforeEach(() => {
    wallet = new Wallet(
      mockClient as unknown as OpenAPIClient<paths, MediaType>,
    );
  });

  describe('add wallet', () => {
    it('should return account with added new wallet', async () => {
      mockPost.mockReturnValue(successMessage(mockWalletResponse));

      const result = await wallet.add(
        '7z6D7cT8W5BXpHeEwr51wwheFzY7C5L1Jo7f6y9vER4T',
      );

      expect(result).toBeDefined();
      expect(mockPost).toHaveBeenCalledWith(routes.AddWallet, {
        body: {
          address: mockWalletResponse().data.wallet_addresses[0].address,
        },
      });
    });

    it('should throw GTWError when API call fails', async () => {
      mockPost.mockResolvedValue(errorMessage());

      await expect(wallet.add('7z6D7cT8W5BXpHeE')).rejects.toThrow(GTWError);
      expect(mockPost).toHaveBeenCalledWith(routes.AddWallet, {
        body: {
          address: mockWalletResponse().data.wallet_addresses[0].address,
        },
      });
    });
  });

  describe('remove wallet', () => {
    it('should return account without given wallet address', async () => {
      const address = '7z6D7cT8W5BXpHeEwr51wwheFzY7C5L1Jo7f6y9vER4T';
      mockDelete.mockReturnValue(
        successMessage(mockWalletResponse({ wallet_addresses: '' })),
      );

      const result = await wallet.remove(address);

      expect(result).toBeDefined();
      expect(mockDelete).toHaveBeenCalledWith(routes.RemoveWallet, {
        params: { path: { address } },
      });
    });
  });
});
