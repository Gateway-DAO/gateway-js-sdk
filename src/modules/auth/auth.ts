import {
  CreateUserInput,
  loginUserMutationMutationVariables,
  Sdk,
} from '../../../gatewaySdk/sources/Gateway';
import { Chain, SignCipherEnum } from '../../common/enums';
import { errorHandler, getChain } from '../../helpers/helper';
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
      return (await this.sdk.checkUsernameAvailabilityQuery({ username }))
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
      return (await this.sdk.checkDIDAvailabilityQuery({ did }))
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
      return (await this.sdk.createUserNonceMutation({ input }))
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
      const chain: Chain = getChain(signingCipher);
      this.validationService.validateWalletAddress(signingKey, chain);
      this.validationService.validateString(signature);
      return (
        await this.sdk.createUserMutation({
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
   * Use this method to generate a new auth token
   * This function logs in a user by validating input data and calling a login mutation.
   * @param {loginUserMutationMutationVariables} input - The `loginUser` function takes an input object
   * of type `loginUserMutationMutationVariables`. This input object likely contains the necessary data
   * for logging in a user, such as the signing cipher, signing key, and signature.
   * @returns The `loginUser` object is being returned from the `loginUserMutation` function call.
   */
  public async loginUser(input: loginUserMutationMutationVariables) {
    try {
      const chain: Chain = getChain(input.signingCipher as SignCipherEnum);
      this.validationService.validateWalletAddress(input.signingKey, chain);
      this.validationService.validateString(input.signature);
      return (await this.sdk.loginUserMutation(input)).loginUser;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
