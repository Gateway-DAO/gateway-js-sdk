import {
  CreateOrganizationInput,
  MemberOrganizationInput,
  OrganizationIdentifierType,
  organizationsQueryQueryVariables,
  Sdk,
  TransferMemberOrganizationInput,
  UpdateOrganizationInput,
} from '../../../gatewaySdk/sources/Gateway';
import { Chain, SignCipherEnum } from '../../common/enums';
import { errorHandler, getChain } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';

export class Organization {
  private sdk: Sdk;
  private validationService: ValidationService;

  constructor(sdk: Sdk, validationService: ValidationService) {
    this.sdk = sdk;
    this.validationService = validationService;
  }

  /**
   * The function creates an organization using the provided input and returns the result, or throws an
   * error if there is one.
   * @param {CreateOrganizationInput} organizationInput - The `organizationInput` parameter is an
   * object that contains the input data for creating an organization. It likely includes properties
   * such as the organization's name, description, and any other relevant information needed to create
   * the organization.
   * @returns the result of the `createOrganization_mutation` method call, which is awaited using the
   * `await` keyword.
   */
  async createOrganization(organizationInput: CreateOrganizationInput) {
    try {
      const chain: Chain = getChain(
        organizationInput.signingCipher as SignCipherEnum,
      );
      this.validationService.validateWalletAddress(
        organizationInput.signingKey,
        chain,
      );
      this.validationService.validateString(organizationInput.signature);
      this.validationService.validateObjectProperties(organizationInput.data);
      return await this.sdk.createOrganizationMutation({
        input: organizationInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function adds a member to an organization using the provided input.
   * @param {MemberOrganizationInput} memberInput - The `memberInput` parameter is an object that contains the
   * information needed to add a member to an organization. It likely includes properties such as the
   * member's name, email, role, and any other relevant details.
   * @returns the result of the `addMemberToOrganization_mutation` mutation call.
   */
  async addMemberToOrganization(memberInput: MemberOrganizationInput) {
    try {
      return await this.sdk.addMemberToOrganizationMutation({
        input: memberInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function "changeMemberRole" is an asynchronous function that takes a "memberInput" parameter
   * and calls a mutation function to change the role of a member, handling any errors that occur.
   * @param {MemberOrganizationInput} memberInput - The `memberInput` parameter is an object that contains the
   * necessary information to change the role of a member. It likely includes properties such as the
   * member's ID and the new role they should be assigned to.
   * @returns the result of the `changeMemberRole_mutation` mutation, which is being awaited.
   */
  async changeMemberRole(memberInput: MemberOrganizationInput) {
    try {
      return await this.sdk.changeMemberRoleMutation({ input: memberInput });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function removes a member from an organization using the provided input.
   * @param {TransferMemberOrganizationInput} memberInput - The `memberInput` parameter is an object that contains
   * the necessary information to remove a member from an organization. It likely includes properties
   * such as the member's ID or username, and any additional data required to complete the removal
   * process.
   * @returns the result of the `removeMemberFromOrganization_mutation` mutation call.
   */
  async removeMemberFromOrganization(
    memberInput: TransferMemberOrganizationInput,
  ) {
    try {
      return await this.sdk.removeMemberFromOrganizationMutation({
        input: memberInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function allows the current owner to transfer its ownership to another member of organization using the provided input.
   * @param {TransferMemberOrganizationInput} ownershipInput - The `ownershipInput` parameter is an object that contains
   * the necessary information to remove a member from an organization. It likely includes properties
   * such as the member's ID or username, and any additional data required to complete the removal
   * process.
   * @returns the result of the `transferOwnership_mutationMutation` mutation call.
   */
  async transferOwnership(ownershipInput: TransferMemberOrganizationInput) {
    try {
      return await this.sdk.transferOwnershipMutation({
        input: ownershipInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updateOrganization` updates an organization using the provided input and returns the
   * result of the update.
   * @param {UpdateOrganizationInput} updatedOrganization - The `updatedOrganization` parameter is an
   * object of type `UpdateOrganizationInput`. It contains the updated information for an organization.
   * @returns the result of the `updateOrganization_mutation` method call, which is likely a Promise
   * that resolves to the updated organization data.
   */
  async updateOrganization(updatedOrganization: UpdateOrganizationInput) {
    try {
      const chain: Chain = getChain(
        updatedOrganization.signingCipher as SignCipherEnum,
      );
      this.validationService.validateWalletAddress(
        updatedOrganization.signingKey,
        chain,
      );
      this.validationService.validateString(updatedOrganization.signature);
      this.validationService.validateObjectProperties(updatedOrganization.data);

      return await this.sdk.updateOrganizationMutation({
        input: updatedOrganization,
      });
    } catch (error: any) {
      console.log(error.request.variables.input);
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getOrganization` retrieves an organization based on the specified identifier type
   * and value.
   * @param {OrganizationIdentifierType} type - The type of organization identifier. It could be a
   * value like "GATEWAY_ID", "ORG_ID", etc. This parameter is used to specify the type of identifier
   * you are providing in the value parameter.
   * @param {string} value - The value parameter is a string that represents the identifier value of
   * the organization. It could be an organization name, ID, or any other unique identifier depending
   * on the type of identifier specified.
   * @returns the result of the `organization_query` method call.
   */
  async getOrganization(type: OrganizationIdentifierType, value: string) {
    try {
      this.validationService.validateString(value);
      return await this.sdk.organizationQuery({ input: { type, value } });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getOrganizations` retrieves organizations based on optional filters, pagination
   * parameters, and error handling.
   * @param  - - `filter` is an optional input parameter of type `FilterOrganizationInput`. It is used
   * to filter the organizations based on certain criteria.
   * @returns the result of the `organizations_query` method call from the `sdk` object.
   */
  async getOrganizations(variables?: organizationsQueryQueryVariables) {
    try {
      return await this.sdk.organizationsQuery(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
