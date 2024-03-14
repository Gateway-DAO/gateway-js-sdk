import {
  CreatePDAInput,
  Sdk,
  FilterPDAInput,
  UpdatePDAInput,
  PDAs_queryQueryVariables,
  issuedPDAs_queryQueryVariables,
  PDACount_queryQueryVariables,
} from '../../gatewaySdk';
import { PDAStatus } from '../types';
import { errorHandler } from '../utils/errorHandler';
import { isUUIDValid, validateObjectProperties } from '../utils/validators';

export class PDA {
  public sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function `getPDA` is an asynchronous function that takes an `id` parameter and returns a
   * Promise that resolves to a `PDA_queryQuery` object.
   * @param {string} id - A string representing the ID of the PDA that you
   * want to query.
   * @returns The function `getPda` is returning a Promise that resolves to a `PDA_queryQuery` object.
   */
  async getPDA(id: string) {
    try {
      isUUIDValid(id);
      return await this.sdk.PDA_query({ id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getPDACount` is an asynchronous function that retrieves the count of PDAs
   *  based on an optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the PDAs  before counting them. It is
   * of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async getPDACount(filter?: PDACount_queryQueryVariables) {
    try {
      return (await this.sdk.PDACount_query(filter)).PDACount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getPDAs` retrieves PDAs based on the provided filter, order, skip, and take
   * parameters.
   * @param {PDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query.
   * @returns a Promise that resolves to a value of type PDAs_queryQuery.
   */
  async getPDAs(variables?: PDAs_queryQueryVariables) {
    try {
      return await this.sdk.PDAs_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuedPDAs` retrieves issued PDAs based on the provided filter, order, skip, and
   * take parameters.
   * @param {issuedPDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query. It is
   * used to specify conditions that the returned PDAs must meet.
   * @returns a Promise that resolves to an object of type `issuedPDAs_queryQuery`.
   */
  async getIssuedPDAs(variables?: issuedPDAs_queryQueryVariables) {
    try {
      return await this.sdk.issuedPDAs_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuedPDAsCount` is an asynchronous function that retrieves the count of issued
   * PDAs based on an optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the issued PDAs. It is of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async getIssuedPDAsCount(filter?: FilterPDAInput) {
    try {
      return (await this.sdk.issuedPDAsCount_query({ filter })).issuedPDAsCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `changePDAStatus` is an asynchronous function that takes an `id` and a `status` as
   * parameters and returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
   * @param  - - `id`: The ID of the PDA  whose status needs to be changed.
   * @returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
   */
  async changePDAStatus({ id, status }: { id: string; status: PDAStatus }) {
    try {
      isUUIDValid(id);
      return await this.sdk.changePDAStatus_mutation({ input: { id, status } });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function creates a PDA  using the provided input and returns the result.
   * @param {CreatePDAInput} pdaInput - The `pdaInput` parameter is an object that contains the input
   * data for creating a PDA . It is of type `CreatePDAInput`.
   * @returns the result of the `createPDA_mutation` method call, which is a Promise.
   */
  async createPDA(pdaInput: CreatePDAInput) {
    try {
      validateObjectProperties(pdaInput);
      return await this.sdk.createPDA_mutation({ input: pdaInput });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updatePDA` updates a PDA  using the provided input and returns
   * the result of the mutation.
   * @param {UpdatePDAInput} updatedPDA - The parameter `updatedPDA` is of type `UpdatePDAInput`. It is
   * an input object that contains the data to update a PDA. The specific
   * properties and their types within `UpdatePDAInput` would depend on the implementation of the
   * `updatePDA_m
   * @returns a Promise that resolves to an object of type `updatePDA_mutationMutation`.
   */
  async updatePDA(updatedPDA: UpdatePDAInput) {
    try {
      validateObjectProperties(updatedPDA);
      return await this.sdk.updatePDA_mutation({ input: updatedPDA });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
