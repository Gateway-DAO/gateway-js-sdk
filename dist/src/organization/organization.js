"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const validators_1 = require("../utils/validators");
class Organization {
    constructor(sdk) {
        this.sdk = sdk;
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
    createOrganization(organizationInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.validateObjectProperties)(organizationInput);
                return yield this.sdk.createOrganization_mutation({
                    input: organizationInput,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function adds a member to an organization using the provided input.
     * @param {MemberInput} memberInput - The `memberInput` parameter is an object that contains the
     * information needed to add a member to an organization. It likely includes properties such as the
     * member's name, email, role, and any other relevant details.
     * @returns the result of the `addMemberToOrganization_mutation` mutation call.
     */
    addMemberToOrganization(memberInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.addMemberToOrganization_mutation({
                    input: memberInput,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function "changeMemberRole" is an asynchronous function that takes a "memberInput" parameter
     * and calls a mutation function to change the role of a member, handling any errors that occur.
     * @param {MemberInput} memberInput - The `memberInput` parameter is an object that contains the
     * necessary information to change the role of a member. It likely includes properties such as the
     * member's ID and the new role they should be assigned to.
     * @returns the result of the `changeMemberRole_mutation` mutation, which is being awaited.
     */
    changeMemberRole(memberInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.changeMemberRole_mutation({ input: memberInput });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function removes a member from an organization using the provided input.
     * @param {TransferMemberInput} memberInput - The `memberInput` parameter is an object that contains
     * the necessary information to remove a member from an organization. It likely includes properties
     * such as the member's ID or username, and any additional data required to complete the removal
     * process.
     * @returns the result of the `removeMemberFromOrganization_mutation` mutation call.
     */
    removeMemberFromOrganization(memberInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.removeMemberFromOrganization_mutation({
                    input: memberInput,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `updateOrganization` updates an organization using the provided input and returns the
     * result of the update.
     * @param {UpdateOrganizationInput} updatedOrganization - The `updatedOrganization` parameter is an
     * object of type `UpdateOrganizationInput`. It contains the updated information for an organization.
     * @returns the result of the `updateOrganization_mutation` method call, which is likely a Promise
     * that resolves to the updated organization data.
     */
    updateOrganization(updatedOrganization) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.validateObjectProperties)(updatedOrganization);
                return yield this.sdk.updateOrganization_mutation({
                    input: updatedOrganization,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
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
    getOrganization(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isStringValid)(value);
                return yield this.sdk.organization_query({ input: { type, value } });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getOrganizations` retrieves organizations based on optional filters, pagination
     * parameters, and error handling.
     * @param  - - `filter` is an optional input parameter of type `FilterOrganizationInput`. It is used
     * to filter the organizations based on certain criteria.
     * @returns the result of the `organizations_query` method call from the `sdk` object.
     */
    getOrganizations(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.organizations_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
}
exports.Organization = Organization;
