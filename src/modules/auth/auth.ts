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

  public async generateSignMessage() {
    const { data, error, response } = await this.client.GET('/auth/message');

    if (error) {
      throw new GTWError(error, response);
    }

    return data.message;
  }

  public async generateRefreshToken() {
    const { data, error, response } = await this.client.GET(
      '/auth/refresh-token',
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data.token;
  }

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
