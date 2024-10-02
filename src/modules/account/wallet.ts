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
   * This async function adds a wallet address to the user's account and returns a response.
   * @param {string} wallet - The `add` function is an asynchronous function that takes a `wallet`
   * parameter of type string. This function sends a POST request to create a new wallet for the current
   * account. The wallet address is provided in the `wallet` parameter and is sent in the request body.
   * @returns The `add` function is returning a `Promise` that resolves to a `MyAccountResponse` object.
   */
  async add(wallet: string): Promise<MyAccountResponse> {
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
   * This TypeScript function asynchronously removes a wallet associated with a specific address from the
   * user's account.
   * @param {string} address - The `remove` function is an asynchronous function that takes a `string`
   * parameter called `address`. This function sends a DELETE request to the endpoint
   * `/accounts/me/wallets/{address}` with the provided `address` parameter as part of the path. It then
   * returns a `Promise` that resolves
   * @returns The `remove` function is returning a `Promise` that resolves to a `MyAccountResponse`
   * object.
   */
  async remove(address: string): Promise<MyAccountResponse> {
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
