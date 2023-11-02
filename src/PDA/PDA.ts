import {
  CreatePDAInput,
  Sdk,
  createPDA_mutationMutation,
  PDA_queryQuery,
  FilterPDAInput,
  PDAs_queryQuery,
  issuedPDAs_queryQuery,
  myPDAs_queryQuery,
  changePDAStatus_mutationMutation,
  UpdatePDAInput,
  updatePDA_mutationMutation,
} from "../../.mesh";
import { PDAFilter, PDAStatus } from "../../types";

export class PDA {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function `getPDA` is an asynchronous function that takes an `id` parameter and returns a
   * Promise that resolves to a `PDA_queryQuery` object.
   * @param {string} id - A string representing the ID of the PDA (Personal Digital Assistant) that you
   * want to query.
   * @returns The function `getPda` is returning a Promise that resolves to a `PDA_queryQuery` object.
   */
  async getPDA(id: string): Promise<PDA_queryQuery> {
    try {
      return await this.sdk.PDA_query({ id });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getPDACount` is an asynchronous function that retrieves the count of PDAs (Public
   * Display Advertisements) based on an optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the PDAs (Personal Digital Assistants) before counting them. It is
   * of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async getPDACount(filter?: FilterPDAInput): Promise<number> {
    try {
      return (await this.sdk.PDACount_query({ filter })).PDACount;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getPDAs` retrieves PDAs based on the provided filter, order, skip, and take
   * parameters.
   * @param {PDAFilter}  - - `filter`: An object that contains filter criteria for the query.
   * @returns a Promise that resolves to a value of type PDAs_queryQuery.
   */
  async getPDAs({
    filter,
    order,
    skip,
    take,
  }: PDAFilter): Promise<PDAs_queryQuery> {
    try {
      return await this.sdk.PDAs_query({ filter, order, skip, take });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getIssuedPDAs` retrieves issued PDAs based on the provided filter, order, skip, and
   * take parameters.
   * @param {PDAFilter}  - - `filter`: An object that contains filter criteria for the query. It is
   * used to specify conditions that the returned PDAs must meet.
   * @returns a Promise that resolves to an object of type `issuedPDAs_queryQuery`.
   */
  async getIssuedPDAs({
    filter,
    order,
    skip,
    take,
  }: PDAFilter): Promise<issuedPDAs_queryQuery> {
    try {
      return await this.sdk.issuedPDAs_query({ filter, order, skip, take });
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   * The function `getIssuedPDAsCount` is an asynchronous function that retrieves the count of issued
   * PDAs based on an optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the issued PDAs. It is of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async getIssuedPDAsCount(filter?: FilterPDAInput): Promise<number> {
    try {
      return (await this.sdk.issuedPDAsCount_query({ filter })).issuedPDAsCount;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `myPDACount` is an asynchronous function that returns the count of myPDAs based on an
   * optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that can be used to
   * filter the results of the query. It is of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async myPDACount(filter?: FilterPDAInput): Promise<number> {
    try {
      return (await this.sdk.myPDACount_query({ filter })).myPDACount;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `myPDAs` is an asynchronous function that takes in a `PDAFilter` object and returns a
   * promise that resolves to a `myPDAs_queryQuery` object.
   * @param {PDAFilter}  - - `filter`: An object that contains filter criteria for the query.
   * @returns a Promise that resolves to a value of type `myPDAs_queryQuery`.
   */
  async myPDAs({
    filter,
    order,
    skip,
    take,
  }: PDAFilter): Promise<myPDAs_queryQuery> {
    try {
      return await this.sdk.myPDAs_query({ filter, order, skip, take });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `createPDA` is an asynchronous function that takes a `CreatePDAInput` object as input
   * and returns a promise that resolves to a `createPDA_mutationMutation` object.
   * @param {CreatePDAInput} pdaInput - The `pdaInput` parameter is an object that contains the input
   * data for creating a PDA . It is of type `CreatePDAInput`.
   * @returns a Promise that resolves to a value of type `createPDA_mutationMutation`.
   */
  async createPDA(
    pdaInput: CreatePDAInput
  ): Promise<createPDA_mutationMutation> {
    try {
      return await this.sdk.createPDA_mutation({ input: pdaInput });
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getPDA(id: string) {
    try {
      return await this.sdk.PDA_query({ id });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `changePDAStatus` is an asynchronous function that takes an `id` and a `status` as
   * parameters and returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
   * @param  - - `id`: The ID of the PDA  whose status needs to be changed.
   * @returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
   */
  async changePDAStatus({
    id,
    status,
  }: {
    id: string;
    status: PDAStatus;
  }): Promise<changePDAStatus_mutationMutation> {
    try {
      return await this.sdk.changePDAStatus_mutation({ input: { id, status } });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `updatePDA` updates a PDA (Pushdown Automaton) using the provided input and returns
   * the result of the mutation.
   * @param {UpdatePDAInput} updatedPDA - The parameter `updatedPDA` is of type `UpdatePDAInput`. It is
   * an input object that contains the data to update a PDA. The specific
   * properties and their types within `UpdatePDAInput` would depend on the implementation of the
   * `updatePDA_m
   * @returns a Promise that resolves to an object of type `updatePDA_mutationMutation`.
   */
  async updatePDA(
    updatedPDA: UpdatePDAInput
  ): Promise<updatePDA_mutationMutation> {
    try {
      return await this.sdk.updatePDA_mutation({ input: updatedPDA });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
