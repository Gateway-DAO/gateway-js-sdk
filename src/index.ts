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

class SDKFactory {
  static createSDK({
    environment,
    privateKey,
    logging = false,
    wallet,
  }: {
    environment: Environment;
    privateKey: string;
    logging?: boolean;
    wallet: WalletService;
  }) {
    const url = parameterChecker(environment);

    const client = createClient<paths>({
      baseUrl: url,
    });

    client.use(AuthMiddleware({ environment, privateKey, wallet, client }));

    return client;
  }
}

export class Gateway {
  private client: OpenAPIClient<paths, MediaType>;
  private config: Config;
  public wallet: WalletService;
  public dataAsset!: DataAsset;
  public auth!: Auth;
  public dataModel!: DataModel;
  public account!: Account;

  constructor(config: Config) {
    const validationService = new ValidationService();
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
}
