import { getMeshSDK, Sdk } from '../.mesh';
import { Organization } from './organization/organization';
import { PDA } from './pda/pda';

export class Gateway {
  public pda: PDA;
  private sdk: Sdk;
  public organization: Organization;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error('No token found');
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    this.pda = new PDA(this.sdk);
    this.organization = new Organization(this.sdk);
  }
}
