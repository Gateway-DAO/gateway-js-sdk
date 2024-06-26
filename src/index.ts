import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from '../gatewaySdk';
import { Organization } from './modules/organization/organization';
import { Auth } from './modules/auth/auth';
import { PDA } from './modules/pda/pda';
import { DataRequestTemplate } from './modules/dataRequestsTemplate/dataRequestsTemplate';
import { Proof } from './modules/proof/proof';
import { Request } from './modules/request/request';
import { DataModel } from './modules/data-model/data-model';
import { User } from './modules/user/user';
import { Transaction } from './modules/transaction/transaction';
import { Config } from './types/interfaces';
import { ValidationService } from './utils/validation-service';
export {
  AuthType,
  Chain,
  OrganizationIdentifierType,
  PDAStatus,
  UserIdentifierType,
  OrganizationRole,
} from './types/types';

class SDKFactory {
  static createSDK({ apiKey, token, url }: Config): Sdk {
    if (!apiKey) throw new Error('No API key found!');
    if (!token) throw new Error('No token found!');
    if (!url) throw new Error('No URL found! Enter either testnet or prod');

    const client = new GraphQLClient(url, {
      headers: { Authorization: `Bearer ${token}`, 'X-Api-Key': apiKey },
    });

    return getSdk(client);
  }
}

export class Gateway {
  private sdk: Sdk;
  public dataModel!: DataModel;
  public proof!: Proof;
  public user!: User;
  public request!: Request;
  public pda!: PDA;
  public dataRequestTemplate!: DataRequestTemplate;
  public organization!: Organization;
  public auth!: Auth;
  public transaction!: Transaction;

  constructor(config: Config) {
    const validationService = new ValidationService();
    this.sdk = SDKFactory.createSDK(config);
    this.initializeModules(validationService);
  }

  private initializeModules(validationService: ValidationService) {
    this.auth = new Auth(this.sdk, validationService);
    this.dataModel = new DataModel(this.sdk, validationService);
    this.dataRequestTemplate = new DataRequestTemplate(
      this.sdk,
      validationService,
    );
    this.organization = new Organization(this.sdk, validationService);
    this.pda = new PDA(this.sdk, validationService);
    this.proof = new Proof(this.sdk);
    this.request = new Request(this.sdk);
    this.user = new User(this.sdk);
    this.transaction = new Transaction(this.sdk);
  }
}
