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
exports.User = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const validators_1 = require("../utils/validators");
class User {
    constructor(sdk) {
        this.sdk = sdk;
    }
    /**
     * The function `me` makes an asynchronous call to `me_query` and returns the result, or throws an
     * error if something goes wrong.
     * @returns a Promise that resolves to me.
     */
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.me_query();
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function takes a user identifier type and value as input, queries the user using the SDK, and
     * returns the result.
     * @param  - - `type`: The type of user identifier. It can be one of the following values:
     * @returns The `user` function is returning the result of the `user_query` method call from the `sdk`
     * object.
     */
    getSingleUser({ type, value, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isStringValid)(value);
                return this.sdk.user_query({ input: { type, value } });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myPDACount` is an asynchronous function that returns the count of a user's PDA
     *  based on an optional filter.
     * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
     * specify criteria for filtering the PDAs before counting them. It is
     * of type `FilterPDAInput`.
     * @returns a Promise that resolves to a number.
     */
    myPDACount(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.sdk.myPDACount_query({ filter })).myPDACount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myPDAs` is an asynchronous function that takes in a `myPDAs_queryQueryVariables` object and returns a
     * promise that resolves to a `myPDAs_queryQuery` object.
     * @param {myPDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query.
     * @returns a Promise that resolves to a value of type `myPDAs_queryQuery`.
     */
    myPDAs(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.myPDAs_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myDataModelsCount` is an asynchronous function that retrieves the count of data
     * models based on an optional filter and returns the count.
     * @param {FilterDataModelInput} [filter] - The `filter` parameter is an optional input that allows
     * you to specify conditions to filter the data models. It is of type `FilterDataModelInput`. You can
     * use this parameter to define criteria such as filtering by a specific field value or applying
     * logical operators like AND and OR to combine multiple conditions.
     * @returns the count of data models that match the provided filter.
     */
    myDataModelsCount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.sdk.dataModelsCount_query({ filter })).dataModelsCount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myDataRequestTemplatesCount` is an asynchronous function that retrieves the count of
     * data request templates based on an optional filter and returns the count.
     * @param {FilterDataRequestTemplateInput} [filter] - The `filter` parameter is an optional input
     * that allows you to specify criteria for filtering the data request templates. It is of type
     * `FilterDataRequestTemplateInput`. You can use this parameter to narrow down the results based on
     * specific conditions such as template name, creator, or any other relevant attributes.
     * @returns the count of myDataRequestTemplates that match the provided filter.
     */
    myDataRequestTemplatesCount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.sdk.myDataRequestTemplatesCount_query({ filter }))
                    .myDataRequestTemplatesCount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myFinancialTransactions` gets recently made financial transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {myFinancialTransactionsCount_queryQueryVariables} variables - The variables is a complex filter type
     * @returns the result of the `myFinancialTransactions_queryQuery` method call.
     */
    myFinancialTransactions(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (variables === null || variables === void 0 ? void 0 : variables.organizationId)
                    (0, validators_1.isUUIDValid)(variables.organizationId);
                return yield this.sdk.myFinancialTransactions_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myFinancialTransactionsCount` gets count of recently made transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {myFinancialTransactionsCount_queryQueryVariables} variables - The variables is a complex filter type
     * @returns the result of the `myFinancialTransactionsCount_queryQuery` method call.
     */
    myFinancialTransactionsCount(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (variables === null || variables === void 0 ? void 0 : variables.organizationId)
                    (0, validators_1.isUUIDValid)(variables.organizationId);
                return (yield this.sdk.myFinancialTransactionsCount_query(variables))
                    .myFinancialTransactionsCount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myTransactions_query` gets recently made transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {myTransactions_queryQueryVariables} variables - The variables is a complex filter type
     * @returns the result of the `myTransactions_queryQuery` method call.
     */
    myTransactions(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.myTransactions_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `myWallet` gets wallet summary by making a query request
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} organizationId - The organizationId parameter is a string that represents the org id
     * @returns the result of the `myWallet_queryQuery` method call.
     */
    myWallet(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (organizationId)
                    (0, validators_1.isUUIDValid)(organizationId);
                return yield this.sdk.myWallet_query({ organizationId });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `updateUser` updates a user's information and returns the updated user.
     * @param {UpdateUserInput} updatedUser - The `updatedUser` parameter is an object of type
     * `UpdateUserInput`. It contains the data that will be used to update a user. The specific
     * properties and their types within the `UpdateUserInput` object will depend on the requirements of
     * your application.
     * @returns The updateUser function is returning the result of the updateUser_mutation API call.
     */
    updateUser(updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.validateObjectProperties)(updatedUser);
                return this.sdk.updateUser_mutation({ input: updatedUser });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function updates the display name of the user using a mutation and returns the result, or
     * throws an error if something goes wrong.
     * @param {string} displayName - The `displayName` parameter is a string that represents the new
     * display name that you want to update.
     * @returns the result of the `updateMyDisplayName_mutation` method call, which is likely a Promise
     * that resolves to the updated display name.
     */
    updateMyDisplayName(displayName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isStringValid)(displayName);
                return this.sdk.updateMyDisplayName_mutation({ displayName });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `updateMyGatewayId` updates the gateway ID using a mutation and returns the result,
     * or throws an error if something goes wrong.
     * @param {string} gatewayId - The `gatewayId` parameter is a string that represents the ID of a
     * gateway.
     * @returns the result of the `updateMyGatewayId_mutation` method call, which is awaited using the
     * `await` keyword.
     */
    updateMyGatewayId(gatewayId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isStringValid)(gatewayId);
                return this.sdk.updateMyGatewayId_mutation({ gatewayId });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function updates the user's profile picture by making a mutation request to the SDK.
     * @param {string} profilePictureUrl - The `profilePictureUrl` parameter is a string that represents
     * the URL of the new profile picture that you want to update.
     * @returns the result of the `updateMyProfilePicture_mutation` mutation.
     */
    updateMyProfilePicture(profilePictureUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isValidUrl)(profilePictureUrl);
                return this.sdk.updateMyProfilePicture_mutation({
                    profilePictureUrl,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `updateNotificationEmail` updates the notification email by making a mutation request
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} email - The email parameter is a string that represents the new notification email
     * that needs to be updated.
     * @returns the result of the `updateNotificationEmail_mutation` method call.
     */
    updateNotificationEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isEmailValid)(email);
                return (yield this.sdk.updateNotificationEmail_mutation({ email }))
                    .updateNotificationEmail;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
}
exports.User = User;
