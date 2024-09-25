import { MediaType } from 'openapi-typescript-helpers';
import {
  OpenAPIClient,
  MyAccountResponse,
  AccountCreateRequest,
} from '../../common/types';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';
import { CryptoService } from '../../services/crypto-service';

export class Account {
  private client: OpenAPIClient<paths, MediaType>;
  private cryptoService: CryptoService;

  constructor(client: OpenAPIClient<paths, MediaType>) {
    this.client = client;
    this.cryptoService = new CryptoService();
  }

  /**
   * The `createAccount` function in TypeScript asynchronously creates a new account by verifying a
   * message, sending a POST request to an endpoint, and returning a token upon success.
   * @param {AccountCreateRequest}  - The `createAccount` function takes in an `AccountCreateRequest`
   * object with the following parameters:
   * @returns The `createAccount` function returns a token from the `data` object after successfully
   * verifying the message signature and creating an account with the provided username and wallet
   * address.
   */
  async createAccount({
    message,
    signature,
    username,
    wallet_address,
  }: AccountCreateRequest) {
    await this.cryptoService.verifyMessage(signature, message, wallet_address);

    const { data, error, response } = await this.client.POST('/accounts', {
      body: { message, signature, username, wallet_address },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data.token;
  }

  /**
   * This async function retrieves account information by making a GET request to '/accounts/me' and
   * handles errors by throwing a custom GTWError if any occur.
   * @returns The `getAccountInfo` function is returning the `data` object fetched from the
   * `/accounts/me` endpoint. If there is an error during the API call, a `GTWError` is thrown with the
   * error and response details.
   */
  async getAccountInfo(): Promise<MyAccountResponse> {
    const { data, response, error } = await this.client.GET('/accounts/me');

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * The function `updateAccount` asynchronously updates the profile picture and username of the current
   * account using a PATCH request.
   * @param  - The `updateAccount` function takes in an object with two properties: `profile_picture` and
   * `username`, both of type string. These values are used to update the user's account information by
   * making a PATCH request to the `/accounts/me` endpoint with the provided data. If there is an error
   * @returns The `updateAccount` function is returning the `data` object after making a PATCH request to
   * update the account information (profile picture and username).
   */
  async updateAccount(profile_picture?: string, username?: string) {
    const { data, error, response } = await this.client.PATCH('/accounts/me', {
      body: { profile_picture, username },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }
}
