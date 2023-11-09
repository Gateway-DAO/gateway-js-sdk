import { getMeshSDK, Sdk } from '../.mesh';
import { DataRequestTemplate } from './dataRequestsTemplate/dataRequestsTemplate';

export class Gateway {
  private sdk: Sdk;
  public dataRequestTemplate: DataRequestTemplate;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.dataRequestTemplate = new DataRequestTemplate(this.sdk);
  }
}
