import { createWalletNonce_mutationMutation } from "../.mesh";

export class Auth {
  private sdk: any;

  constructor(sdk: any) {
    this.sdk = sdk;
  }

  async createWalletNounce(
    wallet: string
  ): Promise<createWalletNonce_mutationMutation> {
    return await this.sdk.createWalletNonce_mutation({ input: { wallet } });
  }
}
