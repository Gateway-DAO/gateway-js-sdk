import { MediaType } from 'openapi-typescript-helpers';
import {
  OpenAPIClient,
  MyAccountResponse,
  AccountCreateRequest,
} from '../../common/types';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';
import { CryptoService } from '../../services/crypto-service';
import { Wallet } from './wallet';

export class Account {
  private client: OpenAPIClient<paths, MediaType>;
  private cryptoService: CryptoService;
  protected wallet: Wallet;

  constructor(client: OpenAPIClient<paths, MediaType>) {
    this.client = client;
    this.cryptoService = new CryptoService();
    this.wallet = new Wallet(client);
  }

  /**
   * The `create` function in TypeScript asynchronously verifies a message, then sends a POST request to
   * create an account and returns the generated token.
   * @param {AccountCreateRequest}  - The `create` method takes in an `AccountCreateRequest` object with
   * the following parameters:
   * @returns The `create` function is returning a token from the `data` object after successfully
   * verifying the message signature and creating a new account with the provided information (message,
   * signature, username, wallet address).
   */
  async create({
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
   * This async function retrieves the account information for the currently authenticated user.
   * @returns The `getMe` function is returning a Promise that resolves to a `MyAccountResponse` object.
   * This object is obtained by making a GET request to the '/accounts/me' endpoint using
   * `this.client.GET('/accounts/me')`. If there is an error during the request, a `GTWError` is thrown
   * with the error and response details. Otherwise, the function returns the data obtained from
   */
  async getMe(): Promise<MyAccountResponse> {
    const { data, response, error } = await this.client.GET('/accounts/me');

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * This TypeScript function updates the profile picture and username of the current user's account
   * using a PATCH request.
   * @param {string} [profile_picture] - The `profile_picture` parameter in the `updateMe` function is
   * used to update the profile picture of the current user's account. It is an optional parameter,
   * meaning you can choose to provide a new profile picture URL or leave it empty to not update the
   * profile picture.
   * @param {string} [username] - The `username` parameter in the `updateMe` function is used to update
   * the username of the account. If a new `username` value is provided when calling this function, it
   * will be used to update the username associated with the account.
   * @returns The `updateMe` function is returning the `data` object after making a PATCH request to
   * update the user's profile picture and username.
   */
  async updateMe(profile_picture?: string, username?: string) {
    const { data, error, response } = await this.client.PATCH('/accounts/me', {
      body: { profile_picture, username },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }
}
