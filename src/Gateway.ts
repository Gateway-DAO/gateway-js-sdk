import { getMeshSDK, Sdk } from '../.mesh';

import { Auth } from './auth/auth';
import { PDA } from './pda/pda';


export class Gateway {
  public auth: Auth;
  private sdk: Sdk;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.auth = new Auth(this.sdk);
  }
}
