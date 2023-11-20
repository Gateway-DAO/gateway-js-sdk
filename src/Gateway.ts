import { getMeshSDK, Sdk } from '../.mesh';
import { User } from './user/user';

export class Gateway {
  private sdk: Sdk;
  public user: User;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.user = new User(this.sdk);
  }
}
