import { FilterDataModelInput, FilterDataRequestTemplateInput, FilterPDAInput, Sdk, UpdateUserInput, myFinancialTransactionsCount_queryQueryVariables, myFinancialTransactions_queryQueryVariables, myPDAs_queryQueryVariables, myTransactions_queryQueryVariables } from '../../.mesh';
import { UserIdentifierType } from '../types';
export declare class User {
    sdk: Sdk;
    constructor(sdk: Sdk);
    /**
     * The function `me` makes an asynchronous call to `me_query` and returns the result, or throws an
     * error if something goes wrong.
     * @returns a Promise that resolves to me.
     */
    me(): Promise<import("../../.mesh").me_queryQuery>;
    /**
     * The function takes a user identifier type and value as input, queries the user using the SDK, and
     * returns the result.
     * @param  - - `type`: The type of user identifier. It can be one of the following values:
     * @returns The `user` function is returning the result of the `user_query` method call from the `sdk`
     * object.
     */
    getSingleUser({ type, value, }: {
        type: UserIdentifierType;
        value: string;
    }): Promise<import("../../.mesh").user_queryQuery>;
    /**
     * The function `myPDACount` is an asynchronous function that returns the count of a user's PDA
     *  based on an optional filter.
     * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
     * specify criteria for filtering the PDAs before counting them. It is
     * of type `FilterPDAInput`.
     * @returns a Promise that resolves to a number.
     */
    myPDACount(filter?: FilterPDAInput): Promise<number>;
    /**
     * The function `myPDAs` is an asynchronous function that takes in a `myPDAs_queryQueryVariables` object and returns a
     * promise that resolves to a `myPDAs_queryQuery` object.
     * @param {myPDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query.
     * @returns a Promise that resolves to a value of type `myPDAs_queryQuery`.
     */
    myPDAs(variables?: myPDAs_queryQueryVariables): Promise<import("../../.mesh").myPDAs_queryQuery>;
    /**
     * The function `myDataModelsCount` is an asynchronous function that retrieves the count of data
     * models based on an optional filter and returns the count.
     * @param {FilterDataModelInput} [filter] - The `filter` parameter is an optional input that allows
     * you to specify conditions to filter the data models. It is of type `FilterDataModelInput`. You can
     * use this parameter to define criteria such as filtering by a specific field value or applying
     * logical operators like AND and OR to combine multiple conditions.
     * @returns the count of data models that match the provided filter.
     */
    myDataModelsCount(filter?: FilterDataModelInput): Promise<number>;
    /**
     * The function `myDataRequestTemplatesCount` is an asynchronous function that retrieves the count of
     * data request templates based on an optional filter and returns the count.
     * @param {FilterDataRequestTemplateInput} [filter] - The `filter` parameter is an optional input
     * that allows you to specify criteria for filtering the data request templates. It is of type
     * `FilterDataRequestTemplateInput`. You can use this parameter to narrow down the results based on
     * specific conditions such as template name, creator, or any other relevant attributes.
     * @returns the count of myDataRequestTemplates that match the provided filter.
     */
    myDataRequestTemplatesCount(filter?: FilterDataRequestTemplateInput): Promise<number>;
    /**
     * The function `myFinancialTransactions` gets recently made financial transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {myFinancialTransactionsCount_queryQueryVariables} variables - The variables is a complex filter type
     * @returns the result of the `myFinancialTransactions_queryQuery` method call.
     */
    myFinancialTransactions(variables?: myFinancialTransactions_queryQueryVariables): Promise<import("../../.mesh").myFinancialTransactions_queryQuery>;
    /**
     * The function `myFinancialTransactionsCount` gets count of recently made transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {myFinancialTransactionsCount_queryQueryVariables} variables - The variables is a complex filter type
     * @returns the result of the `myFinancialTransactionsCount_queryQuery` method call.
     */
    myFinancialTransactionsCount(variables?: myFinancialTransactionsCount_queryQueryVariables): Promise<number>;
    /**
     * The function `myTransactions_query` gets recently made transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {myTransactions_queryQueryVariables} variables - The variables is a complex filter type
     * @returns the result of the `myTransactions_queryQuery` method call.
     */
    myTransactions(variables?: myTransactions_queryQueryVariables): Promise<import("../../.mesh").myTransactions_queryQuery>;
    /**
     * The function `myWallet` gets wallet summary by making a query request
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} organizationId - The organizationId parameter is a string that represents the org id
     * @returns the result of the `myWallet_queryQuery` method call.
     */
    myWallet(organizationId?: string): Promise<import("../../.mesh").myWallet_queryQuery>;
    /**
     * The function `updateUser` updates a user's information and returns the updated user.
     * @param {UpdateUserInput} updatedUser - The `updatedUser` parameter is an object of type
     * `UpdateUserInput`. It contains the data that will be used to update a user. The specific
     * properties and their types within the `UpdateUserInput` object will depend on the requirements of
     * your application.
     * @returns The updateUser function is returning the result of the updateUser_mutation API call.
     */
    updateUser(updatedUser: UpdateUserInput): Promise<import("../../.mesh").updateUser_mutationMutation>;
    /**
     * The function updates the display name of the user using a mutation and returns the result, or
     * throws an error if something goes wrong.
     * @param {string} displayName - The `displayName` parameter is a string that represents the new
     * display name that you want to update.
     * @returns the result of the `updateMyDisplayName_mutation` method call, which is likely a Promise
     * that resolves to the updated display name.
     */
    updateMyDisplayName(displayName: string): Promise<import("../../.mesh").updateMyDisplayName_mutationMutation>;
    /**
     * The function `updateMyGatewayId` updates the gateway ID using a mutation and returns the result,
     * or throws an error if something goes wrong.
     * @param {string} gatewayId - The `gatewayId` parameter is a string that represents the ID of a
     * gateway.
     * @returns the result of the `updateMyGatewayId_mutation` method call, which is awaited using the
     * `await` keyword.
     */
    updateMyGatewayId(gatewayId: string): Promise<import("../../.mesh").updateMyGatewayId_mutationMutation>;
    /**
     * The function updates the user's profile picture by making a mutation request to the SDK.
     * @param {string} profilePictureUrl - The `profilePictureUrl` parameter is a string that represents
     * the URL of the new profile picture that you want to update.
     * @returns the result of the `updateMyProfilePicture_mutation` mutation.
     */
    updateMyProfilePicture(profilePictureUrl: string): Promise<import("../../.mesh").updateMyProfilePicture_mutationMutation>;
    /**
     * The function `updateNotificationEmail` updates the notification email by making a mutation request
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} email - The email parameter is a string that represents the new notification email
     * that needs to be updated.
     * @returns the result of the `updateNotificationEmail_mutation` method call.
     */
    updateNotificationEmail(email: string): Promise<{
        user: Pick<import("../../.mesh").User, "id" | "email" | "status" | "displayName" | "gatewayId" | "hash" | "arweaveUrl" | "createdAt" | "updatedAt" | "walletId" | "profilePicture" | "roles" | "credentialsExtraCredits" | "dataModelsExtraCredits" | "deletedAt" | "gatewayIdLastupdate" | "gatewayIdUpdatedAt" | "isCompleted">;
    }>;
}
