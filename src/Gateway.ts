import { getMeshSDK, Sdk } from '../.mesh';
import { DataRequestTemplate } from './dataRequestsTemplate/dataRequestsTemplate';
import { PDA } from './pda/pda';

export class Gateway {
  public pda: PDA;
  private sdk: Sdk;
  public dataRequestTemplate: DataRequestTemplate;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.pda = new PDA(this.sdk);
    this.dataRequestTemplate = new DataRequestTemplate(this.sdk);
  }
}
