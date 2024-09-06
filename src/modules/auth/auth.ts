import { MediaType } from 'openapi-typescript-helpers';
import { paths } from '../../api';
import { Config, ModelAuthRequest, OpenAPIClient } from '../../common/types';
import { CryptoService } from '../../services/crypto-service';

export class Auth {
  private client: OpenAPIClient<paths, MediaType>;
  private cryptoService: CryptoService;
  private config: Config;

  constructor(client: OpenAPIClient<paths, MediaType>, config: Config) {
    this.client = client;
    this.config = config;
    this.cryptoService = new CryptoService();
  }

  public async generateSignMessage() {
    const { data, error } = await this.client.GET('/auth/message');

    if (error) {
      throw new Error(error);
    }

    return data!.message!;
  }

  public async generateRefreshToken() {
    const { data, error } = await this.client.GET('/auth/refresh-token');
    if (error) {
      // throw new Error(JSON.stringify(error));
    }

    return data!.token!;
  }

  public async login({ message, signature, wallet_address }: ModelAuthRequest) {
    await this.cryptoService.verifyMessage(signature, message, wallet_address);

    const { data, error } = await this.client.POST('/auth', {
      body: { message, signature, wallet_address },
    });

    if (error) {
      console.log(error);
      // throw new Error(Object.values(error));
    }

    return data!.token!;
  }
}
