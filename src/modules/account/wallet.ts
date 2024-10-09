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
   * The `add` function in TypeScript adds a new wallet address to the user's account asynchronously.
   * @param {string} address - The `add` function in the code snippet you provided is an asynchronous
   * function that takes a `string` parameter called `address`. The function first checks if the
   * `address` string is empty using a validation service method `isEmptyString(address)`. Then, it makes
   * a POST request to a specific endpoint
   * @returns The `add` function is returning a `Promise` that resolves to a `MyAccountResponse` object.
   */

  async add(address: string): Promise<MyAccountResponse> {
    this.validationService.isEmptyString(address);
    const { data, error, response } = await this.client.POST(
      '/accounts/me/wallets',
      {
        body: { address: address },
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
    this.validationService.isEmptyString(address);

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
