import {
  Sdk,
  createProof_mutationMutationVariables,
  proofsByPDAIds_queryQueryVariables,
  proofs_queryQueryVariables,
  receivedProofs_queryQueryVariables,
  sentProofsCount_queryQueryVariables,
  sentProofs_queryQueryVariables,
} from '../../.mesh';

export class Proof {
  private sdk: Sdk;

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
      return await this.sdk.proof_query({ id: id });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `createProof` is an asynchronous function that takes in variables for claims,
   * requestId, signature, verifier, and wallet, and uses them to call the `createProof_mutation`
   * method of the `sdk` object.
   * @param {createProof_mutationMutationVariables}  - - `claims`: The claims that need to be included
   * in the proof.
   * @returns the result of the `createProof_mutation` method call.
   */
  async createProof({
    claims,
    requestId,
    signature,
    verifier,
    wallet,
  }: createProof_mutationMutationVariables = {}) {
    try {
      return await this.sdk.createProof_mutation({
        claims,
        requestId,
        signature,
        verifier,
        wallet,
      });
    } catch (error: any) {
      throw new Error(error);
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
      return await this.sdk.createProofMessage_mutation({
        requestId: requestId,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getProofs` is an asynchronous function that retrieves proofs based on the provided
   * filter, order, skip, and take parameters.
   * @param {proofs_queryQueryVariables}  - - `filter`: A filter object used to specify the conditions
   * for filtering the proofs. It can include properties such as `id`, `name`, `date`, etc.
   * @returns the result of the `proofs_query` method call from the `sdk` object.
   */
  async getProofs({
    filter,
    order,
    skip,
    take,
  }: proofs_queryQueryVariables = {}) {
    try {
      return await this.sdk.proofs_query({ filter, order, skip, take });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getProofsByPDAIds` retrieves proofs based on PDA IDs, with options for pagination.
   * @param {proofsByPDAIds_queryQueryVariables}  - - `pdaIds`: An array of PDA IDs.
   * @returns the result of the `proofsByPDAIds_query` method call.
   */
  async getProofsByPDAIds({
    pdaIds,
    skip,
    take,
  }: proofsByPDAIds_queryQueryVariables) {
    try {
      return await this.sdk.proofsByPDAIds_query({
        pdaIds,
        skip,
        take,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getReceivedProofs` is an asynchronous function that retrieves received proofs based on
   * the provided parameters.
   * @param {receivedProofs_queryQueryVariables}  - - `order`: Specifies the order in which the received
   * proofs should be returned.
   * @returns the result of the `receivedProofs_query` method call.
   */
  async getReceivedProofs({
    order,
    organizationId,
    skip,
    take,
  }: receivedProofs_queryQueryVariables = {}) {
    try {
      return await this.sdk.receivedProofs_query({
        order,
        organizationId,
        skip,
        take,
      });
    } catch (error: any) {
      throw new Error(error);
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
      return await this.sdk.receivedProofsCount_query({ organizationId });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getSentProofs` is an asynchronous function that retrieves sent proofs based on the
   * provided query variables.
   * @param {sentProofs_queryQueryVariables}  - - `order`: Specifies the order in which the sent proofs
   * should be returned. It could be ascending or descending order.
   * @returns the result of the `sentProofs_query` method call.
   */
  async getSentProofs({
    order,
    skip,
    take,
  }: sentProofs_queryQueryVariables = {}) {
    try {
      return await this.sdk.sentProofs_query({ order, skip, take });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getSentProofsCount` is an asynchronous function that retrieves the count of sent
   * proofs using the `sentProofsCount_query` method from the `sdk` object.
   * @param {sentProofsCount_queryQueryVariables} [variables] - The `variables` parameter is an optional
   * object that contains any variables needed for the query. It is used to pass dynamic values to the
   * query, such as filter criteria or pagination parameters. If no variables are needed, you can omit
   * this parameter or pass an empty object (`{}`).
   * @returns the result of the `sentProofsCount_query` method call.
   */
  async getSentProofsCount(variables?: sentProofsCount_queryQueryVariables) {
    try {
      return await this.sdk.sentProofsCount_query(variables);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
