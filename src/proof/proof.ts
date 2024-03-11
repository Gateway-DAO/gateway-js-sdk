import {
  Sdk,
  createProof_mutationMutationVariables,
  proofsByPDAIds_queryQueryVariables,
  proofs_queryQueryVariables,
  receivedProofs_queryQueryVariables,
  sentProofsCount_queryQueryVariables,
  sentProofs_queryQueryVariables,
} from '../../gatewaySdk';
import { errorHandler } from '../utils/errorHandler';
import { isUUIDValid } from '../utils/validators';

export class Proof {
  public sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
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
      isUUIDValid(id);
      return await this.sdk.proof_query({ id: id });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }
  /**
   * The function "createProof" is an asynchronous function that calls the "createProof_mutation" method
   * from the "sdk" object, passing in the "variables" parameter, and returns the result. If an error
   * occurs, it throws an error.
   * @param {createProof_mutationMutationVariables} [variables] - The `variables` parameter is an
   * optional object that contains the variables needed for the `createProof_mutation` mutation. These
   * variables can include any data that is required for the mutation to execute successfully, such as
   * input values or authentication tokens.
   * @returns The `createProof` function is returning the result of the `createProof_mutation` function
   * call.
   */

  async createProof(inputVariables?: createProof_mutationMutationVariables) {
    try {
      if (inputVariables?.requestId) {
        isUUIDValid(inputVariables.requestId);
      }
      return await this.sdk.createProof_mutation(inputVariables);
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `createProofMessage` is an asynchronous function that takes a `requestId` as a
   * parameter and uses it to call the `createProofMessage_mutation` method from the `sdk`.
   * @param {string} requestId - The `requestId` parameter is a string that represents the unique
   * identifier of a request. It is used as input to the `createProofMessage_mutation` function to
   * create a proof message.
   * @returns the result of the `createProofMessage_mutation` method call.
   */
  async createProofMessage(requestId: string) {
    try {
      isUUIDValid(requestId);
      return await this.sdk.createProofMessage_mutation({
        requestId: requestId,
      });
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
   * @param {proofsByPDAIds_queryQueryVariables} variables - The `variables` parameter is an object that
   * contains the necessary variables for the `proofsByPDAIds_query` query. These variables are used to
   * specify the criteria for retrieving proofs by PDA IDs. The specific properties and their types
   * depend on the GraphQL schema and the requirements of the `proof
   * @returns the result of the `proofsByPDAIds_query` method call.
   */
  async getProofsByPDAIds({
    pdaIds,
    skip,
    take,
  }: proofsByPDAIds_queryQueryVariables) {
    try {
      if (typeof pdaIds === 'string') {
        isUUIDValid(pdaIds);
      } else {
        for (const id in pdaIds) isUUIDValid(pdaIds[id]);
      }
      return await this.sdk.proofsByPDAIds_query({ pdaIds, skip, take });
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
        isUUIDValid(variables.organizationId);
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
        isUUIDValid(organizationId);
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
