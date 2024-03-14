import { AddWalletConfirmationInput, Sdk } from '../../gatewaySdk';
import { AuthType, Chain } from '../types';
import { errorHandler } from '../utils/errorHandler';
import {
  isEmailValid,
  isStringValid,
  isUUIDValid,
  isWalletAddressvalid,
} from '../utils/validators';

export class Auth {
  public sdk: Sdk;

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
    try {
      isStringValid(username);
      return (await this.sdk.checkUsernameAvailability_query({ username }))
        .checkUsernameAvailability;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `addEmail` is an asynchronous function that adds an email to a mutation using the
   * SDK.
   * @param {string} email - The `email` parameter is a string that represents the email address that
   * needs to be added.
   * @returns The addEmail function is returning the result code and email
   */
  async addEmail(email: string) {
    try {
      isEmailValid(email);
      return (await this.sdk.addEmail_mutation({ input: { email } })).addEmail;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `addEmailConfirmation` takes an email and code as input, and calls a mutation to add
   * email confirmation.
   * @param {string} email: a string representing the email address to be confirmed
   * @param {number} code : a 6 digit code representing that was sent
   * @returns the result of the `addEmailConfirmation` method call, is the logged in user.
   */
  async addEmailConfirmation(email: string, code: number) {
    try {
      isEmailValid(email);
      return (
        await this.sdk.addEmailConfirmation_mutation({
          input: { code, email },
        })
      ).addEmailConfirmation;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `addWallet` takes an wallet and optional chain as input.
   * @param {string} wallet: a string representing the wallet
   * @param {Chain} chain : a chain optional of type Chain
   * @returns the result of the `addWallet` method call, is a message which will be used to confirm wallet.
   */
  async addWallet(wallet: string, chain: Chain) {
    try {
      isWalletAddressvalid(wallet, chain);
      return (await this.sdk.addWallet_mutation({ input: { wallet, chain } }))
        .addWallet;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
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
    try {
      isStringValid(walletConfirmationInput.signature);
      return await this.sdk.addWalletConfirmation_mutation({
        input: walletConfirmationInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `createWalletNounce` takes an wallet and optional chain as input
   * @param {string} wallet: a string representing the wallet
   * @param {Chain} chain : a chain optional of type Chain
   * @returns the result of the `createWalletNounce` method call, is a message which will be used to confirm wallet.
   */
  async createWalletNonce(wallet: string, chain: Chain) {
    try {
      isWalletAddressvalid(wallet, chain);
      return (
        await this.sdk.createWalletNonce_mutation({ input: { wallet, chain } })
      ).createWalletNonce;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `deleteAccount` takes an id to soft delete the account
   * @param {string} id: a string representing the user id
   * @returns the result of the `deleteAccount` method call,returning the boolean | undefined if user not found
   */
  async deleteAccount(id: string) {
    try {
      isUUIDValid(id);
      return (await this.sdk.deleteAccount_mutation({ id })).deleteAccount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `loginEmail` takes an email and code as input verifies it and gives user details
   * @param {string} email: a string representing the email
   * @param {number} code: a number representing the verification code
   * @returns the result of the `loginEmail` method call,returning the user if code is correct
   */
  async loginEmail(email: string, code: number) {
    try {
      isEmailValid(email);
      return (await this.sdk.loginEmail_mutation({ input: { email, code } }))
        .loginEmail;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `loginWallet` takes an wallet and signature as input verifies it and gives user details
   * @param {string} wallet: a string representing the email
   * @param {string} signature: a string representing the signature generated
   * @returns the result of the `loginWallet` method call,returning the user if signature is correct
   */
  async loginWallet(wallet: string, chain: Chain, signature: string) {
    try {
      isWalletAddressvalid(wallet, chain);
      isStringValid(signature);
      return (
        await this.sdk.loginWallet_mutation({
          input: { wallet, signature },
        })
      ).loginWallet;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `refreshToken` takes an existing refresh token to create a new one
   * @param {string} existingRefreshToken: a string representing the existing refresh token
   * @returns the result of the `refreshToken` method call,returning the  new refresh token and user
   */
  async refreshToken(existingRefreshToken: string) {
    try {
      isStringValid(existingRefreshToken);
      return (
        await this.sdk.refreshToken_mutation({
          input: { refresh_token: existingRefreshToken },
        })
      ).refreshToken;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function unregisterAuthMethod is an asynchronous function that takes in a JSON object and an
   * AuthType, and attempts to unregister an authentication method using the SDK.
   * @param {string} data: a string representing either email or wallet
   * @param {AuthType} type: a AuthType representing the type like Wallet, Email and so on
   * @returns the result of the `this.sdk.unregisterAuthMethod_mutation` method, which is awaited.
   */
  async unregisterAuthMethod(data: string, type: AuthType) {
    try {
      isStringValid(data);
      return await this.sdk.unregisterAuthMethod_mutation({
        input: { data, type },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
