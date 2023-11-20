import { getMeshSDK, Sdk } from '../.mesh';
import { PDA } from './pda/pda';

export class Gateway {
  public pda: PDA;
  private sdk: Sdk;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.pda = new PDA(this.sdk);
  }
}
