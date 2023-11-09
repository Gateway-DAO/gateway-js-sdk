import { CreateOrganizationInput, Sdk, TransferMemberInput } from '../../.mesh';

export class Organization {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  async createOrganization(organizationInput: CreateOrganizationInput) {
    return await this.sdk.createOrganization_mutation({
      input: organizationInput,
    });
  }

  async removeMemberFromOrganization(memberInput: TransferMemberInput) {
    return await this.sdk.removeMemberFromOrganization_mutation({
      input: memberInput,
    });
  }

  
}
