import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from '../gatewaySdk/sources/GatewayV2';
import { Organization } from './organization/organization';
import { Auth } from './auth/auth';
import { PDA } from './pda/pda';
import { DataRequestTemplate } from './dataRequestsTemplate/dataRequestsTemplate';
import { Proof } from './proof/proof';
import { Request } from './request/request';
import { DataModel } from './data-model/data-model';
import { User } from './user/user';
import { Transaction } from './transaction/transaction';
import { checkVersion, clientTimingWrapper, urlsChecker } from './utils/helper';

export {
  AuthType,
  Chain,
  OrganizationIdentifierType,
  PDAStatus,
  UserIdentifierType,
  OrganizationRole,
} from './types';

export class Gateway {
  private sdk: Sdk;
  public dataModel: DataModel;
  public proof: Proof;
  public user: User;
  public request: Request;
  public pda: PDA;
  public dataRequestTemplate: DataRequestTemplate;
  public organization: Organization;
  public auth: Auth;
  public transaction: Transaction;

  constructor({
    apiKey,
    token,
    url,
    logging = false,
  }: {
    apiKey: string;
    token: string;
    url: string;
    logging?: boolean;
  }) {
    if (!apiKey) throw new Error('No apikey found!');
    if (!token) throw new Error('No token found!');
    if (!url) throw new Error('No url found!.Enter either testnet or prod');

    urlsChecker(url);

    checkVersion();

    const client = new GraphQLClient(url, {
      headers: { Authorization: `Bearer ${token}`, 'X-Api-Key': apiKey },
    });

    this.sdk = getSdk(client, logging ? clientTimingWrapper : undefined);
    this.pda = new PDA(this.sdk);
    this.dataRequestTemplate = new DataRequestTemplate(this.sdk);
    this.organization = new Organization(this.sdk);
    this.auth = new Auth(this.sdk);
    this.dataModel = new DataModel(this.sdk);
    this.proof = new Proof(this.sdk);
    this.request = new Request(this.sdk);
    this.user = new User(this.sdk);
    this.transaction = new Transaction(this.sdk);
  }
}
