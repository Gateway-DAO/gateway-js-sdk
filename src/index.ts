import createClient from 'openapi-fetch';
import { Config, OpenAPIClient } from './common/types';
import {
  networkInterceptorMiddleware,
  parameterChecker,
} from './helpers/helper';
import { ValidationService } from './services/validator-service';
import { DataAsset } from './modules/data-asset/data-asset';
import { MediaType } from 'openapi-typescript-helpers';
import { paths } from './api';
import { Auth } from './modules/auth/auth';

class SDKFactory {
  static createSDK({ token, url, logging = false }: Config) {
    parameterChecker(token, url);

    const client = createClient<paths>({
      baseUrl: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (logging) {
      client.use(networkInterceptorMiddleware);
    }
    // client.use(authMiddleware);

    return client;
  }
}

export class Gateway {
  private client: OpenAPIClient<paths, MediaType>;
  private config: Config;
  public dataAsset!: DataAsset;
  public auth!: Auth;

  constructor(config: Config) {
    const validationService = new ValidationService();
    this.client = SDKFactory.createSDK(config);
    this.config = config;
    this.initializeModules(validationService);
  }

  private initializeModules(validationService: ValidationService) {
    this.dataAsset = new DataAsset(this.client, validationService, this.config);
    this.auth = new Auth(this.client, this.config);
  }
}
