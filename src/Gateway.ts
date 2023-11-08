import { getMeshSDK, Sdk } from '../.mesh';
import { PDA } from './pda/pda';
import { User } from './user/user';

export class Gateway {
  public pda: PDA;
  private sdk: Sdk;
  public user: User;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    // this.auth = new Auth();
    this.pda = new PDA(this.sdk);
    this.user = new User(this.sdk);
  }
}
