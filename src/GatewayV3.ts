import { GraphQLClient } from 'graphql-request';
import { Sdk, getSdk } from '../gatewaySdk/sources/GatewayV3';
import {
  checkVersion,
  clientTimingWrapper,
  parameterChecker,
} from './utils/helper';
import { PDA } from './v3/pda/pda';
import { Auth } from './v3/auth/auth';
import { DataModel } from './v3/data-model/data-model';
import { Organization } from './v3/organization/organization';
import { Proof } from './v3/proof/proof';
import { Request } from './v3/request/request';
import { User } from './v3/user/user';

export class GatewayV3 {
  private sdk: Sdk;
  public pda: PDA;
  public auth: Auth;
  public dataModel: DataModel;
  public organization: Organization;
  public proof: Proof;
  public request: Request;
  public user: User;

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
    this.auth = new Auth(this.sdk);
    this.dataModel = new DataModel(this.sdk);
    this.organization = new Organization(this.sdk);
    this.proof = new Proof(this.sdk);
    this.request = new Request(this.sdk);
    this.user = new User(this.sdk);
  }
}
