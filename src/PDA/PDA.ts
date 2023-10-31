import { CreatePDAInput, Sdk, createPDA_mutationMutation } from "../../.mesh";

export class PDA {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
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
