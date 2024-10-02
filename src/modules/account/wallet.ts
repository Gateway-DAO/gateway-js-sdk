import { MediaType } from 'openapi-typescript-helpers';
import { OpenAPIClient, MyAccountResponse } from '../../common/types';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';
import { ValidationService } from '../../services/validator-service';

export class Wallet {
  private client: OpenAPIClient<paths, `${string}/${string}`>;
  private validationService: ValidationService;

  constructor(client: OpenAPIClient<paths, MediaType>) {
    this.client = client;
    this.validationService = new ValidationService();
  }

  /**
   * The `addWallet` function in TypeScript asynchronously adds a new wallet by sending a POST request
   * to the `/accounts/me/wallets` endpoint, and returns the updated account information upon success.
   * @param {WalletCreateRequest} wallet - The `wallet` parameter is an object that contains the
   * `address` of the wallet to be added.
   * @returns The `addWallet` function returns the updated account information (`MyAccountResponse`)
   * after successfully adding the wallet.
   */
  async addWallet(wallet: string): Promise<MyAccountResponse> {
    const { data, error, response } = await this.client.POST(
      '/accounts/me/wallets',
      {
        body: { address: wallet },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * The `removeWallet` function asynchronously removes a wallet by making a DELETE request to the
   * `/accounts/me/wallets/{address}` endpoint, and returns the updated account information upon success.
   * @param {string} address - The `address` parameter is the wallet address that needs to be removed.
   * @returns The `removeWallet` function returns the updated account information (`MyAccountResponse`)
   * after successfully removing the wallet.
   */
  async removeWallet(address: string): Promise<MyAccountResponse> {
    const { data, error, response } = await this.client.DELETE(
      '/accounts/me/wallets/{address}',
      {
        params: { path: { address: address } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }
}
