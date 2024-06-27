import {
  CreateUserInput,
  Sdk,
  SignedWalletNonceInput,
} from '../../../gatewaySdk/sources/Gateway';
import { Chain, SignCipherEnum } from '../../common/enums';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';

export class Auth {
  private sdk: Sdk;
  private validationService: ValidationService;

  constructor(sdk: Sdk, validationService: ValidationService) {
    this.sdk = sdk;
    this.validationService = validationService;
  }

  /**
   * The function checks the availability of a username by making a async query to the Gateway Protocol.
   * @param {string} username - The `username` parameter is a string that represents the username that
   * needs to be checked for availability.
   * @returns the result of the `checkUsernameAvailability` method, is a boolean
   */
  public async checkUsernameAvailability(username: string) {
    try {
      this.validationService.validateString(username);
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
  public async checkDIDAvailability(did: string) {
    try {
      this.validationService.validateDID(did);
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
  public async createUserNonce(input: CreateUserInput) {
    try {
      this.validationService.validateObjectProperties(input);
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
  public async createUser({
    signature,
    signingKey,
    signingCipher,
  }: {
    signature: string;
    signingKey: string;
    signingCipher?: SignCipherEnum;
  }) {
    try {
      const chain = this.getChain(signingCipher);
      this.validationService.validateWalletAddress(signingKey, chain);
      this.validationService.validateString(signature);
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
  public async generateNonce(wallet: string, cipher?: SignCipherEnum) {
    try {
      const chain = this.getChain(cipher);
      this.validationService.validateWalletAddress(wallet, chain);
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
  public async refreshToken(input: SignedWalletNonceInput) {
    try {
      const chain = this.getChain(input.cipher as SignCipherEnum);
      this.validationService.validateWalletAddress(input.signingKey, chain);
      this.validationService.validateString(input.signature);
      return (await this.sdk.refreshToken_mutation({ input })).refreshToken;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  private getChain(cipher?: SignCipherEnum): Chain {
    if (cipher === SignCipherEnum.ED25519) {
      return Chain.SOL;
    }
    return Chain.EVM;
  }
}
