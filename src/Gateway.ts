import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from '../gatewaySdk/sources/GatewayV2';
import { Organization } from './v2/organization/organization';
import { Auth } from './v2/auth/auth';
import { PDA } from './v2/pda/pda';
import { DataRequestTemplate } from './v2/dataRequestsTemplate/dataRequestsTemplate';
import { Proof } from './v2/proof/proof';
import { Request } from './v2/request/request';
import { DataModel } from './v2/data-model/data-model';
import { User } from './v2/user/user';
import { Transaction } from './v2/transaction/transaction';
import {
  checkVersion,
  clientTimingWrapper,
  parameterChecker,
} from './utils/helper';

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
    parameterChecker(apiKey, token, url);

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
