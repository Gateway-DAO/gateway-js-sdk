import {
  CreateOrganizationInput,
  FilterOrganizationInput,
  MemberInput,
  Sdk,
  TransferMemberInput,
  UpdateOrganizationInput,
} from '../../.mesh';
import { OrganizationIdentifierType } from '../types';
import { errorHandler } from '../utils/errorHandler';

export class Organization {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  async createOrganization(organizationInput: CreateOrganizationInput) {
    try {
      return await this.sdk.createOrganization_mutation({
        input: organizationInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async addMemberToOrganization(memberInput: MemberInput) {
    try {
      return await this.sdk.addMemberToOrganization_mutation({
        input: memberInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async changeMemberRole(memberInput: MemberInput) {
    try {
      return await this.sdk.changeMemberRole_mutation({ input: memberInput });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async removeMemberFromOrganization(memberInput: TransferMemberInput) {
    try {
      return await this.sdk.removeMemberFromOrganization_mutation({
        input: memberInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async updateOrganization(updatedOrganization: UpdateOrganizationInput) {
    try {
      return await this.sdk.updateOrganization_mutation({
        input: updatedOrganization,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async getOrganization(type: OrganizationIdentifierType, value: string) {
    try {
      return await this.sdk.organization_query({ input: { type, value } });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async getOrganizations({
    filter,
    skip,
    take,
  }: {
    filter?: FilterOrganizationInput;
    skip?: number;
    take?: number;
  }) {
    try {
      return await this.sdk.organizations_query({ filter, skip, take });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
