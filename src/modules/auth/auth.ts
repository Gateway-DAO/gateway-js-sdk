import {
  CreateUserInput,
  Sdk,
  SignedWalletNonceInput,
} from '../../../gatewaySdk/sources/GatewayV3';
import { Chain, SignCipherEnum } from '../../common/enums';
import { errorHandler } from '../../helpers/error-handler';
import {
  isDIDValid,
  isStringValid,
  isWalletAddressValid,
  validateObjectProperties,
} from '../../common/validator-service';

export class Auth {
  public sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function checks the availability of a username by making a async query to the Gateway Protocol.
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
   * The function checks the availability of a did by making a async query to the Gateway Protocol.
   * @param {string} did - The `did` parameter is a string that represents the did that
   * needs to be checked for availability.
   * @returns the result of the `checkDIDAvailability` method, is a boolean
   */
  async checkDIDAvailability(did: string) {
    try {
      isDIDValid(did);
      return (await this.sdk.checkDIDAvailability_query({ did }))
        .checkDIDAvailability;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function generates a nonce  by making a async query to the Gateway Protocol.
   * @param {CreateUserInput} input - The input parameter is of type CreateUserInput
   * @returns the result of the `createUserNonce` method, is a string
   */
  async createUserNonce(input: CreateUserInput) {
    try {
      validateObjectProperties(input);
      return (await this.sdk.createUserNonce_mutation({ input }))
        .createUserNonce;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function generates a jwt by making a async query to the Gateway Protocol.
   * @param {string} signature - The input parameter is of type string
   * @param {string} signingKey - The input parameter is of type string
   * @param {SignCipherEnum?} signingCipher - The input parameter is of type SignCipherEnum and is optional
   * @returns the result of the `createUser` method, is a string which has jwt token
   */
  async createUser({
    signature,
    signingKey,
    signingCipher,
  }: {
    signature: string;
    signingKey: string;
    signingCipher?: SignCipherEnum;
  }) {
    try {
      let chain: Chain;
      if (signingCipher === undefined) {
        chain = Chain.EVM;
      } else if (signingCipher === SignCipherEnum.ED25519) {
        chain = Chain.SOL;
      } else chain = Chain.EVM;
      isWalletAddressValid(signingKey, chain);
      isStringValid(signature);
      return (
        await this.sdk.createUser_mutation({
          signature,
          signingKey,
          signingCipher,
        })
      ).createUser;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function generates a nonce and message by making a async query to the Gateway Protocol.
   * @param {string} wallet - The input parameter is of type string which represent wallet
   * @param {SignCipherEnum?} cipher - The input parameter is of type string which represent wallet
   * @returns the result of the `generateNonce` method, is a string which is a object of type generateNonce_mutationMutation
   */
  async generateNonce(wallet: string, cipher?: SignCipherEnum) {
    try {
      let chain: Chain;
      if (cipher === undefined) {
        chain = Chain.EVM;
      } else if (cipher === SignCipherEnum.ED25519) {
        chain = Chain.SOL;
      } else chain = Chain.EVM;
      isWalletAddressValid(wallet, chain);
      return await this.sdk.generateNonce_mutation({
        input: { wallet, cipher },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function generates a jwt by making a async query to the Gateway Protocol.
   * @param {SignedWalletNonceInput} input - The input parameter is of type SignedWalletNonceInput
   * @returns the result of the `refreshToken` method, is a string which has jwt
   */
  async refreshToken(input: SignedWalletNonceInput) {
    try {
      let chain: Chain;
      if (input.cipher === undefined) {
        chain = Chain.EVM;
      } else if (input.cipher === SignCipherEnum.ED25519) {
        chain = Chain.SOL;
      } else chain = Chain.EVM;
      isWalletAddressValid(input.signingKey, chain);
      isStringValid(input.signature);
      return (await this.sdk.refreshToken_mutation({ input })).refreshToken;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
