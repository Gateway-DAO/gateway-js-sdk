import { AddWalletConfirmationInput, Sdk } from '../../.mesh';
import { AuthType, Chain } from '../types';

export class Auth {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function checks the availability of a username by making a async query to the SDK.
   * @param {string} username - The `username` parameter is a string that represents the username that
   * needs to be checked for availability.
   * @returns the result of the `checkUsernameAvailability` method, is a boolean
   */
  async checkUsernameAvailability(username: string) {
    return (await this.sdk.checkUsernameAvailability_query({ username }))
      .checkUsernameAvailability;
  }

  /**
   * The function `addEmail` is an asynchronous function that adds an email to a mutation using the
   * SDK.
   * @param {string} email - The `email` parameter is a string that represents the email address that
   * needs to be added.
   * @returns The addEmail function is returning the result code and email
   */
  async addEmail(email: string) {
    return (await this.sdk.addEmail_mutation({ input: { email } })).addEmail;
  }

  /**
   * The function `addEmailConfirmation` takes an email and code as input, and calls a mutation to add
   * email confirmation.
   * @param {string} email: a string representing the email address to be confirmed
   * @param {number} code : a 6 digit code representing that was sent
   * @returns the result of the `addEmailConfirmation` method call, is the logged in user.
   */
  async addEmailConfirmation({ email, code }: { email: string; code: number }) {
    return (
      await this.sdk.addEmailConfirmation_mutation({
        input: { code, email },
      })
    ).addEmailConfirmation;
  }

  /**
   * The function `addWallet` takes an wallet and optional chain as input.
   * @param {string} wallet: a string representing the wallet
   * @param {Chain} chain : a chain optional of type Chain
   * @returns the result of the `addWallet` method call, is a message which will be used to confirm wallet.
   */
  async addWallet({ wallet, chain }: { wallet: string; chain?: Chain }) {
    return (await this.sdk.addWallet_mutation({ input: { wallet, chain } }))
      .addWallet;
  }

  /**
   * The function `addWalletConfirmation` takes an walletConfirmationInput input, and calls a mutation to add
   * wallet confirmation.
   * @param {AddWalletConfirmationInput} walletConfirmationInput: walletConfirmationInput of type AddWalletConfirmationInput
   * @returns the result of the `addWalletConfirmation` method call, is the logged in user.
   */
  async addWalletConfirmation(
    walletConfirmationInput: AddWalletConfirmationInput,
  ) {
    return await this.sdk.addWalletConfirmation_mutation({
      input: walletConfirmationInput,
    });
  }

  /**
   * The function `createWalletNounce` takes an wallet and optional chain as input
   * @param {string} wallet: a string representing the wallet
   * @param {Chain} chain : a chain optional of type Chain
   * @returns the result of the `createWalletNounce` method call, is a message which will be used to confirm wallet.
   */
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

  /**
   * The function `createEmailNounce` takes an email to create a nounce
   * @param {string} email: a string representing the email
   * @returns the result of the `createEmailNounce` method call,returning the  code and email
   */
  async createEmailNounce(email: string) {
    return (await this.sdk.createEmailNonce_mutation({ input: { email } }))
      .createEmailNonce;
  }

  /**
   * The function `deleteAccount` takes an id to soft delete the account
   * @param {string} id: a string representing the user id
   * @returns the result of the `deleteAccount` method call,returning the boolean | undefined if user not found
   */
  async deleteAccount(id: string) {
    return (await this.sdk.deleteAccount_mutation({ id })).deleteAccount;
  }

  /**
   * The function `loginEmail` takes an email and code as input verifies it and gives user details
   * @param {string} email: a string representing the email
   * @param {number} code: a number representing the verification code
   * @returns the result of the `loginEmail` method call,returning the user if code is correct
   */
  async loginEmail({ email, code }: { email: string; code: number }) {
    return (await this.sdk.loginEmail_mutation({ input: { email, code } }))
      .loginEmail;
  }

  /**
   * The function `loginWallet` takes an wallet and signature as input verifies it and gives user details
   * @param {string} wallet: a string representing the email
   * @param {string} signature: a string representing the signature generated
   * @returns the result of the `loginWallet` method call,returning the user if signature is correct
   */
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

  /**
   * The function `refreshToken` takes an existing refresh token to create a new one
   * @param {string} existingRefreshToken: a string representing the existing refresh token
   * @returns the result of the `refreshToken` method call,returning the  new refresh token and user
   */
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
