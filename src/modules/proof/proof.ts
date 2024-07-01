import {
  Sdk,
  CreateProofInput,
  proofs_queryQueryVariables,
  receivedProofs_queryQueryVariables,
  sentProofsCount_queryQueryVariables,
  sentProofs_queryQueryVariables,
  proofsByPDA_queryQueryVariables,
} from '../../../gatewaySdk/sources/Gateway';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';

export class Proof {
  private sdk: Sdk;
  private validationService: ValidationService;

  constructor(sdk: Sdk, validationService: ValidationService) {
    this.sdk = sdk;
    this.validationService = validationService;
  }

  /**
   * The function `getProof` is an asynchronous function that takes an `id` parameter and returns the
   * result of a query using the `sdk` object, or throws an error if there is any.
   * @param {string} id - The `id` parameter is a string that represents the identifier of the proof that
   * you want to retrieve.
   * @returns The `getProof` function is returning the result of the `proof_query` method call from the
   * `sdk` object.
   */
  async getProof(id: string) {
    try {
      this.validationService.validateUUID(id);
      return await this.sdk.proof_query({ id: id });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `createProof` asynchronously calls the `createProof_mutation` method with input
   * variables and handles any errors that occur.
   * @param {CreateProofInput} inputVariables - The `inputVariables` parameter in the `createProof`
   * function is of type `CreateProofInput`. This parameter likely contains the necessary data or
   * variables required to create a proof using the `sdk.createProof_mutation` method. The function is an
   * asynchronous function that awaits the result of the `sdk
   * @returns The `createProof` function is returning the result of the `this.sdk.createProof_mutation({
   * input: inputVariables })` call after awaiting its completion.
   */
  async createProof(inputVariables: CreateProofInput) {
    try {
      return await this.sdk.createProof_mutation({ input: inputVariables });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getProofs` is an asynchronous function that queries proofs and returns the result.
   * @param {proofs_queryQueryVariables} [variables] - The `variables` parameter is an optional object
   * that contains the variables needed for the `proofs_query` function. These variables can be used to
   * filter or customize the query results.
   * @returns the result of the `proofs_query` method call.
   */
  async getProofs(variables?: proofs_queryQueryVariables) {
    try {
      return await this.sdk.proofs_query(variables);
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getProofsByPDAIds` retrieves proofs by PDA IDs using a GraphQL query.
   * @param {proofsByPDA_queryQueryVariables} variables - The `variables` parameter is an object that
   * contains the necessary variables for the `proofsByPDAIds_query` query. These variables are used to
   * specify the criteria for retrieving proofs by PDA IDs. The specific properties and their types
   * depend on the GraphQL schema and the requirements of the `proof
   * @returns the result of the `proofsByPDAIds_query` method call.
   */
  async getProofsByPDA({
    pdaIds,
    skip,
    take,
  }: proofsByPDA_queryQueryVariables) {
    try {
      if (typeof pdaIds === 'string') {
        this.validationService.validateUUID(pdaIds);
      } else {
        for (const id in pdaIds) {
          this.validationService.validateUUID(pdaIds[id]);
        }
      }
      return await this.sdk.proofsByPDA_query({ pdaIds, skip, take });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getReceivedProofs` is an asynchronous function that retrieves received proofs using
   * the `receivedProofs_query` method from an SDK, and it handles any errors that occur during the
   * process.
   * @param {receivedProofs_queryQueryVariables} [variables] - The `variables` parameter is an optional
   * object that contains any variables needed for the `receivedProofs_query` function. These variables
   * can be used to filter or customize the query results.
   * @returns the result of the `receivedProofs_query` method call.
   */
  async getReceivedProofs(variables?: receivedProofs_queryQueryVariables) {
    try {
      if (variables && variables.organizationId) {
        this.validationService.validateUUID(variables.organizationId);
      }
      return await this.sdk.receivedProofs_query(variables);
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getReceivedProofsCount` is an asynchronous function that retrieves the count of
   * received proofs for a given organization ID using a query from an SDK.
   * @param {string} [organizationId] - The organizationId parameter is an optional string that
   * represents the ID of an organization. It is used to filter the received proofs count based on the
   * organization. If no organizationId is provided, the function will return the received proofs count
   * for all organizations.
   * @returns the result of the `receivedProofsCount_query` method call.
   */
  async getReceivedProofsCount(organizationId?: string) {
    try {
      if (organizationId) {
        this.validationService.validateUUID(organizationId);
      }
      return await this.sdk.receivedProofsCount_query({ organizationId });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getSentProofs` is an asynchronous function that retrieves sent proofs using the
   * `sentProofs_query` method from an SDK, and it handles any errors that occur.
   * @param {sentProofs_queryQueryVariables} [variables] - The `variables` parameter is an optional
   * object that contains any variables you want to pass to the `sentProofs_query` function. These
   * variables can be used to filter or customize the query results.
   * @returns the result of the `sentProofs_query` method call.
   */

  async getSentProofs(variables?: sentProofs_queryQueryVariables) {
    try {
      return await this.sdk.sentProofs_query(variables);
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getSentProofsCount` is an asynchronous function that retrieves the count of sent
   * proofs.
   * @param {sentProofsCount_queryQueryVariables} [variables] - The `variables` parameter is an optional
   * object that contains any variables needed for the `sentProofsCount_query` query. These variables
   * can be used to filter or customize the query results.
   * @returns the result of the `sentProofsCount_query` function call.
   */
  async getSentProofsCount(
    queryVariables?: sentProofsCount_queryQueryVariables,
  ) {
    try {
      return await this.sdk.sentProofsCount_query(queryVariables);
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }
}
