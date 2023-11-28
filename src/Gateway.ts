import { getMeshSDK, Sdk } from '../.mesh';
import { Auth } from './Auth';
import { DataModel } from './data-model/data-model';
import { PDA } from './pda/PDA';
import { Proof } from './proof/proof';
import { Request } from './request/request';
export class Gateway {
  private sdk: Sdk;
  dataModel: DataModel;
  auth: Auth;
  pda: PDA;
  proof: Proof;
  request: Request;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.auth = new Auth(this.sdk);
    this.pda = new PDA(this.sdk);
    this.dataModel = new DataModel(this.sdk);
    this.proof = new Proof(this.sdk);
    this.request = new Request(this.sdk);
  }
}
