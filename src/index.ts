import { GraphQLClient } from 'graphql-request';
import { Sdk, getSdk } from '../gatewaySdk/sources/Gateway';
import { clientTimingWrapper, parameterChecker } from './helpers/helper';
import { PDA } from './modules/pda/pda';
import { Auth } from './modules/auth/auth';
import { DataModel } from './modules/data-model/data-model';
import { Organization } from './modules/organization/organization';
import { Proof } from './modules/proof/proof';
import { Request } from './modules/request/request';
import { User } from './modules/user/user';
import { Config } from './common/types';
import { ValidationService } from './services/validator-service';
import { Activity } from './modules/activity/activity';
import { WalletService } from './services/wallet-service';

class SDKFactory {
  static createSDK({ apiKey, token, url, logging = false }: Config): Sdk {
    // parameterChecker(apiKey, token, url);

    const client = new GraphQLClient(url, {
      headers: { Authorization: `Bearer ${token}`, 'x-api-key': apiKey },
    });

    return getSdk(client, logging ? clientTimingWrapper : undefined);
  }
}

export class Gateway {
  private sdk: Sdk;
  private config: Config;
  public wallet: WalletService;
  public activity!: Activity;
  public pda!: PDA;
  public auth!: Auth;
  public dataModel!: DataModel;
  public organization!: Organization;
  public proof!: Proof;
  public request!: Request;
  public user!: User;

  constructor(config: Config) {
    const validationService = new ValidationService();
    this.sdk = SDKFactory.createSDK(config);
    this.config = config;
    this.wallet = new WalletService({
      walletPrivateKey: this.config.walletPrivateKey,
      walletType: this.config.walletType,
    });
    this.initializeModules(validationService);
  }

  private initializeModules(validationService: ValidationService) {
    this.activity = new Activity(this.sdk, validationService);
    this.auth = new Auth(this.sdk, validationService);
    this.dataModel = new DataModel(
      this.sdk,
      validationService,
      this.config,
      this.wallet,
    );
    this.organization = new Organization(
      this.sdk,
      validationService,
      this.config,
      this.wallet,
    );
    this.pda = new PDA(this.sdk, validationService, this.config, this.wallet);
    this.proof = new Proof(
      this.sdk,
      validationService,
      this.config,
      this.wallet,
    );
    this.request = new Request(
      this.sdk,
      validationService,
      this.config,
      this.wallet,
    );
    this.user = new User(this.sdk, validationService);
  }
}
