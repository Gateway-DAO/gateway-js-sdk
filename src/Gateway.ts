import { getMeshSDK, Sdk } from '../.mesh';
import { Organization } from './organization/organization';
import { Auth } from './auth/auth';
import { PDA } from './pda/pda';
import { DataRequestTemplate } from './dataRequestsTemplate/dataRequestsTemplate';
import { Proof } from './proof/proof';
import { Request } from './request/request';
import { DataModel } from './data-model/data-model';
import { User } from './user/user';
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

  constructor({
    apiKey,
    token,
    url,
  }: {
    apiKey: string;
    token: string;
    url: string;
  }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
      url,
    });
    this.pda = new PDA(this.sdk);
    this.dataRequestTemplate = new DataRequestTemplate(this.sdk);
    this.organization = new Organization(this.sdk);
    this.auth = new Auth(this.sdk);
    this.dataModel = new DataModel(this.sdk);
    this.proof = new Proof(this.sdk);
    this.request = new Request(this.sdk);
    this.user = new User(this.sdk);
  }
}
