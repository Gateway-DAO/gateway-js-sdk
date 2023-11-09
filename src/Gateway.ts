import { getMeshSDK, Sdk } from '../.mesh';

export class Gateway {
  private sdk: Sdk;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
  }
}
