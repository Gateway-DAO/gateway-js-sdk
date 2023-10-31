import {
  CreatePDAInput,
  Sdk,
  createPDA_mutationMutation,
  PDA_queryQuery,
  FilterPDAInput,
  PDAs_queryQuery,
  issuedPDAs_queryQuery,
  myPDAs_queryQuery,
} from "../../.mesh";
import { PDAFilter } from "../../types";

export class PDA {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   *
   * @param id string
   * @returns PDA
   */
  async pda(id: string): Promise<PDA_queryQuery> {
    try {
      return await this.sdk.PDA_query({ id });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async pdaCount(filter?: FilterPDAInput): Promise<number> {
    try {
      return (await this.sdk.PDACount_query({ filter })).PDACount;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async pdas({
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

  async issuedPDAs({
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

  async issuedPdasCount(filter?: FilterPDAInput): Promise<number> {
    try {
      return (await this.sdk.issuedPDAsCount_query({ filter })).issuedPDAsCount;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async myPdaCount(filter?: FilterPDAInput): Promise<number> {
    try {
      return (await this.sdk.myPDACount_query({ filter })).myPDACount;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async myPdas({
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

  async createPDA(
    pdaInput: CreatePDAInput
  ): Promise<createPDA_mutationMutation> {
    try {
      return await this.sdk.createPDA_mutation({ input: pdaInput });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
