import { CreatePDAInput, createPDA_mutationMutation } from "../.mesh";

export class PDA {
  private sdk: any;

  constructor(sdk: any) {
    this.sdk = sdk;
  }
  async createPDA(
    pdaInput: CreatePDAInput
  ): Promise<createPDA_mutationMutation> {
    return await this.sdk.createPDA_mutation({ input: pdaInput });
  }
}
