import createClient from 'openapi-fetch';
import { MediaType } from 'openapi-typescript-helpers';
import { paths } from './api';

import { Config, Environment, OpenAPIClient } from './common/types';
import { AuthMiddleware, parameterChecker } from './helpers/helper';

import { ValidationService } from './services/validator-service';
import { WalletService } from './services/wallet-service';

import { DataAsset } from './modules/data-asset/data-asset';
import { Auth } from './modules/auth/auth';
import { DataModel } from './modules/data-model/data-model';
import { Account } from './modules/account/account';

export * from './common/types';
export { toRFC3339, checkJWTTokenExpiration } from './helpers/helper';
export { GTWError } from './helpers/custom-error';

class SDKFactory {
  static createSDK({
    environment,
    privateKey,
    jwt,
    logging = false,
    wallet,
  }: {
    environment: Environment;
    privateKey?: string;
    jwt?: string;
    logging?: boolean;
    wallet: WalletService;
  }) {
    const { url, mode, value } = parameterChecker(environment, jwt, privateKey);

    const client = createClient<paths>({
      baseUrl: url,
      headers:
        mode === 'jwt'
          ? {
              Authorization: `Bearer ${value}`,
            }
          : {},
    });

    if (logging) {
    }

    if (mode === 'privateKey')
      client.use(
        AuthMiddleware({ environment, privateKey: value, wallet, client }),
      );

    return client;
  }
}

export class Gateway {
  private client: OpenAPIClient<paths, MediaType>;
  private config: Config;
  public wallet!: WalletService;
  public dataAsset!: DataAsset;
  public auth!: Auth;
  public dataModel!: DataModel;
  public account!: Account;

  constructor(config: Config) {
    const validationService = new ValidationService();
    if (config.privateKey)
      this.wallet = new WalletService({
        walletPrivateKey: config.privateKey,
        walletType: config.walletType,
      });
    this.client = SDKFactory.createSDK({
      environment: config.environment,
      privateKey: config.privateKey,
      logging: config.logging,
      wallet: this.wallet,
    });
    this.config = config;

    this.initializeModules(validationService);
  }

  private initializeModules(validationService: ValidationService) {
    this.dataAsset = new DataAsset(this.client, validationService);
    this.auth = new Auth(this.client);
    this.dataModel = new DataModel(this.client, validationService);
    this.account = new Account(this.client);
  }

  public updateConfig(newConfig: Partial<Config>) {
    const validationService = new ValidationService();
    this.config = { ...this.config, ...newConfig };
    if (this.config.privateKey)
      this.wallet = new WalletService({
        walletPrivateKey: this.config.privateKey,
        walletType: this.config.walletType,
      });
    this.client = SDKFactory.createSDK({
      environment: this.config.environment,
      privateKey: this.config.privateKey,
      logging: this.config.logging,
      wallet: this.wallet,
    });
    this.initializeModules(validationService);
  }
}
