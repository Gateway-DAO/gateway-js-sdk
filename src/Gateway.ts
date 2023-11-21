import { getMeshSDK, Sdk } from '../.mesh';

import { Auth } from './auth/auth';
import { PDA } from './pda/pda';

export class Gateway {
  private sdk: Sdk;
  public pda: PDA;
  public auth: Auth;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.pda = new PDA(this.sdk);
    this.auth = new Auth(this.sdk);
  }
}
