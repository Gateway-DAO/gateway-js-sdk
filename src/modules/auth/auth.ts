import { MediaType } from 'openapi-typescript-helpers';
import { paths } from '../../api';
import { AuthRequest, OpenAPIClient } from '../../common/types';
import { CryptoService } from '../../services/crypto-service';
import { GTWError } from '../../helpers/custom-error';

export class Auth {
  private client: OpenAPIClient<paths, MediaType>;
  private cryptoService: CryptoService;

  constructor(client: OpenAPIClient<paths, MediaType>) {
    this.client = client;
    this.cryptoService = new CryptoService();
  }

  /**
   * This TypeScript function asynchronously fetches a message from a specified endpoint and returns
   * the message data if successful, throwing an error if there is an issue.
   * @returns The `getMessage` function is returning the `message` property from the `data` object
   * fetched from the `/auth/message` endpoint.
   */
  public async getMessage() {
    const { data, error, response } = await this.client.GET('/auth/message');

    if (error) {
      throw new GTWError(error, response);
    }

    return data.message;
  }

  /**
   * This TypeScript function asynchronously retrieves a refresh token from a specified endpoint and
   * returns the token if successful.
   * @returns The `getRefreshToken` function is returning the `token` property from the `data` object.
   */
  public async getRefreshToken() {
    const { data, error, response } = await this.client.GET(
      '/auth/refresh-token',
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data.token;
  }

  /**
   * The login function verifies a message signature and wallet address, then sends a POST request to
   * authenticate and returns a token.
   * @param {AuthRequest}  - The `login` function takes an object as a parameter with the following
   * properties:
   * @returns The `login` function is returning the `token` from the `data` object after successfully
   * verifying the message signature and making a POST request to the `/auth` endpoint with the
   * provided message, signature, and wallet address.
   */
  public async login({ message, signature, wallet_address }: AuthRequest) {
    await this.cryptoService.verifyMessage(signature, message, wallet_address);

    const { data, error, response } = await this.client.POST('/auth', {
      body: { message, signature, wallet_address },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data.token;
  }
}
