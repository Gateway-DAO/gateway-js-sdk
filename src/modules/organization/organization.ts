import {
  MemberInput,
  OrganizationBody,
  OrganizationIdentifierType,
  organizationsQueryQueryVariables,
  Sdk,
  TransferMemberInput,
  UpdateOrganizationBody,
} from '../../../gatewaySdk/sources/Gateway';
import { Config } from '../../common/types';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';
import { WalletService } from '../../services/wallet-service';

export class Organization {
  private sdk: Sdk;
  private validationService: ValidationService;
  private wallet: WalletService;
  private config: Config;

  constructor(
    sdk: Sdk,
    validationService: ValidationService,
    config: Config,
    wallet: WalletService,
  ) {
    this.sdk = sdk;
    this.validationService = validationService;
    this.wallet = wallet;
    this.config = config;
  }

  /**
   * The function creates an organization using the provided input and returns the result, or throws an
   * error if there is one.
   * @param {OrganizationBody} organizationBody - The `organizationBody` parameter is an
   * object that contains the input data for creating an organization. It likely includes properties
   * such as the organization's name, description, and any other relevant information needed to create
   * the organization.
   * @returns the result of the `createOrganization_mutation` method call, which is awaited using the
   * `await` keyword.
   */
  async createOrganization(organizationBody: OrganizationBody) {
    try {
      this.validationService.validateObjectProperties(organizationBody);
      const { signature, signingKey } =
        await this.wallet.signMessage(organizationBody);

      return await this.sdk.createOrganizationMutation({
        input: {
          data: organizationBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function adds a member to an organization using the provided input.
   * @param {MemberInput} memberInputBody - The `memberInputBody` parameter is an object that contains the
   * information needed to add a member to an organization. It likely includes properties such as the
   * member's name, email, role, and any other relevant details.
   * @returns the result of the `addMemberToOrganization_mutation` mutation call.
   */
  async addMemberToOrganization(memberInputBody: MemberInput) {
    try {
      const { signature, signingKey } =
        await this.wallet.signMessage(memberInputBody);

      return await this.sdk.addMemberToOrganizationMutation({
        input: {
          data: memberInputBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function "changeMemberRole" is an asynchronous function that takes a "memberInputBody" parameter
   * and calls a mutation function to change the role of a member, handling any errors that occur.
   * @param {MemberInput} memberInputBody - The `memberInputBody` parameter is an object that contains the
   * necessary information to change the role of a member. It likely includes properties such as the
   * member's ID and the new role they should be assigned to.
   * @returns the result of the `changeMemberRole_mutation` mutation, which is being awaited.
   */
  async changeMemberRole(memberInputBody: MemberInput) {
    try {
      const { signature, signingKey } =
        await this.wallet.signMessage(memberInputBody);

      return await this.sdk.changeMemberRoleMutation({
        input: {
          data: memberInputBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function removes a member from an organization using the provided input.
   * @param {TransferMemberInput} memberInputBody - The `memberInputBody` parameter is an object that contains
   * the necessary information to remove a member from an organization. It likely includes properties
   * such as the member's ID or username, and any additional data required to complete the removal
   * process.
   * @returns the result of the `removeMemberFromOrganization_mutation` mutation call.
   */
  async removeMemberFromOrganization(memberInputBody: TransferMemberInput) {
    try {
      const { signature, signingKey } =
        await this.wallet.signMessage(memberInputBody);

      return await this.sdk.removeMemberFromOrganizationMutation({
        input: {
          data: memberInputBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function allows the current owner to transfer its ownership to another member of organization using the provided input.
   * @param {TransferMemberInput} ownershipInputBody - The `ownershipInputBody` parameter is an object that contains
   * the necessary information to remove a member from an organization. It likely includes properties
   * such as the member's ID or username, and any additional data required to complete the removal
   * process.
   * @returns the result of the `transferOwnership_mutationMutation` mutation call.
   */
  async transferOwnership(ownershipInputBody: TransferMemberInput) {
    try {
      const { signature, signingKey } =
        await this.wallet.signMessage(ownershipInputBody);

      return await this.sdk.transferOwnershipMutation({
        input: {
          data: ownershipInputBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updateOrganization` updates an organization using the provided input and returns the
   * result of the update.
   * @param {UpdateOrganizationBody} updatedOrganizationBody - The `updatedOrganizationBody` parameter is an
   * object of type `UpdateOrganizationBody`. It contains the updated information for an organization.
   * @returns the result of the `updateOrganization_mutation` method call, which is likely a Promise
   * that resolves to the updated organization data.
   */
  async updateOrganization(updatedOrganizationBody: UpdateOrganizationBody) {
    try {
      this.validationService.validateObjectProperties(updatedOrganizationBody);
      const { signature, signingKey } = await this.wallet.signMessage(
        updatedOrganizationBody,
      );

      return await this.sdk.updateOrganizationMutation({
        input: {
          data: updatedOrganizationBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
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
