import { AddWalletConfirmationInput, Sdk } from '../../.mesh';
import { AuthType, Chain } from '../types';

export class Auth {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  async checkUsernameAvailability(username: string) {
    return (await this.sdk.checkUsernameAvailability_query({ username }))
      .checkUsernameAvailability;
  }

  async addEmail(email: string) {
    return (await this.sdk.addEmail_mutation({ input: { email } })).addEmail;
  }

  async addEmailConfirmation({ email, code }: { email: string; code: number }) {
    return (
      await this.sdk.addEmailConfirmation_mutation({
        input: { code, email },
      })
    ).addEmailConfirmation;
  }

  async addWallet({ wallet, chain }: { wallet: string; chain?: Chain }) {
    return (await this.sdk.addWallet_mutation({ input: { wallet, chain } }))
      .addWallet;
  }

  async addWalletConfirmation(
    walletConfirmationInput: AddWalletConfirmationInput,
  ) {
    return await this.sdk.addWalletConfirmation_mutation({
      input: walletConfirmationInput,
    });
  }

  async createWalletNounce({
    wallet,
    chain,
  }: {
    wallet: string;
    chain?: Chain;
  }) {
    return (
      await this.sdk.createWalletNonce_mutation({ input: { wallet, chain } })
    ).createWalletNonce;
  }

  async createEmailNounce(email: string) {
    return (await this.sdk.createEmailNonce_mutation({ input: { email } }))
      .createEmailNonce;
  }

  async deleteAccount(id: string) {
    return (await this.sdk.deleteAccount_mutation({ id })).deleteAccount;
  }

  async loginEmail({ email, code }: { email: string; code: number }) {
    return (await this.sdk.loginEmail_mutation({ input: { email, code } }))
      .loginEmail;
  }

  async loginWallet({
    wallet,
    signature,
  }: {
    wallet: string;
    signature: string;
  }) {
    return (
      await this.sdk.loginWallet_mutation({
        input: { wallet, signature },
      })
    ).loginWallet;
  }

  // TODO: need to write test for this dont know what to pass for test
  async migrateAuthMethod({
    authId,
    ownerJwt,
  }: {
    authId: string;
    ownerJwt: string;
  }) {
    return (
      await this.sdk.migrateAuthMethod_mutation({ input: { authId, ownerJwt } })
    ).migrateAuthMethod;
  }

  async refreshToken(existingRefreshToken: string) {
    return (
      await this.sdk.refreshToken_mutation({
        input: { refresh_token: existingRefreshToken },
      })
    ).refreshToken;
  }

  // TODO: need to write test for this dont know what to pass for test
  async unregisterAuthMethod({ data, type }: { data: JSON; type: AuthType }) {
    return await this.sdk.unregisterAuthMethod_mutation({
      input: { data, type },
    });
  }
}
