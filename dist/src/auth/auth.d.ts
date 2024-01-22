import { AddWalletConfirmationInput, Sdk } from '../../.mesh';
import { AuthType, Chain } from '../types';
export declare class Auth {
    sdk: Sdk;
    constructor(sdk: Sdk);
    /**
     * The function checks the availability of a username by making a async query to the SDK.
     * @param {string} username - The `username` parameter is a string that represents the username that
     * needs to be checked for availability.
     * @returns the result of the `checkUsernameAvailability` method, is a boolean
     */
    checkUsernameAvailability(username: string): Promise<boolean>;
    /**
     * The function `addEmail` is an asynchronous function that adds an email to a mutation using the
     * SDK.
     * @param {string} email - The `email` parameter is a string that represents the email address that
     * needs to be added.
     * @returns The addEmail function is returning the result code and email
     */
    addEmail(email: string): Promise<Pick<import("../../.mesh").CreateEmailNonceOutput, "code" | "email">>;
    /**
     * The function `addEmailConfirmation` takes an email and code as input, and calls a mutation to add
     * email confirmation.
     * @param {string} email: a string representing the email address to be confirmed
     * @param {number} code : a 6 digit code representing that was sent
     * @returns the result of the `addEmailConfirmation` method call, is the logged in user.
     */
    addEmailConfirmation(email: string, code: number): Promise<{
        user: Pick<import("../../.mesh").User, "id" | "email" | "status" | "displayName" | "gatewayId" | "hash" | "arweaveUrl" | "createdAt" | "updatedAt" | "walletId" | "profilePicture" | "roles" | "credentialsExtraCredits" | "dataModelsExtraCredits" | "deletedAt" | "gatewayIdLastupdate" | "gatewayIdUpdatedAt" | "isCompleted">;
    }>;
    /**
     * The function `addWallet` takes an wallet and optional chain as input.
     * @param {string} wallet: a string representing the wallet
     * @param {Chain} chain : a chain optional of type Chain
     * @returns the result of the `addWallet` method call, is a message which will be used to confirm wallet.
     */
    addWallet(wallet: string, chain: Chain): Promise<Pick<import("../../.mesh").CreateWalletNonceOutput, "message">>;
    /**
     * The function `addWalletConfirmation` takes an walletConfirmationInput input, and calls a mutation to add
     * wallet confirmation.
     * @param {AddWalletConfirmationInput} walletConfirmationInput: walletConfirmationInput of type AddWalletConfirmationInput
     * @returns the result of the `addWalletConfirmation` method call, is the logged in user.
     */
    addWalletConfirmation(walletConfirmationInput: AddWalletConfirmationInput): Promise<import("../../.mesh").addWalletConfirmation_mutationMutation>;
    /**
     * The function `createWalletNounce` takes an wallet and optional chain as input
     * @param {string} wallet: a string representing the wallet
     * @param {Chain} chain : a chain optional of type Chain
     * @returns the result of the `createWalletNounce` method call, is a message which will be used to confirm wallet.
     */
    createWalletNonce(wallet: string, chain: Chain): Promise<Pick<import("../../.mesh").CreateWalletNonceOutput, "message">>;
    /**
     * The function `deleteAccount` takes an id to soft delete the account
     * @param {string} id: a string representing the user id
     * @returns the result of the `deleteAccount` method call,returning the boolean | undefined if user not found
     */
    deleteAccount(id: string): Promise<import("../../.mesh").Maybe<boolean> | undefined>;
    /**
     * The function `loginEmail` takes an email and code as input verifies it and gives user details
     * @param {string} email: a string representing the email
     * @param {number} code: a number representing the verification code
     * @returns the result of the `loginEmail` method call,returning the user if code is correct
     */
    loginEmail(email: string, code: number): Promise<Pick<import("../../.mesh").LoginOutput, "protocol_id" | "refresh_token" | "token"> & {
        user: Pick<import("../../.mesh").User, "id" | "email" | "status" | "displayName" | "gatewayId" | "hash" | "arweaveUrl" | "createdAt" | "updatedAt" | "walletId" | "profilePicture" | "roles" | "credentialsExtraCredits" | "dataModelsExtraCredits" | "deletedAt" | "gatewayIdLastupdate" | "gatewayIdUpdatedAt" | "isCompleted">;
    }>;
    /**
     * The function `loginWallet` takes an wallet and signature as input verifies it and gives user details
     * @param {string} wallet: a string representing the email
     * @param {string} signature: a string representing the signature generated
     * @returns the result of the `loginWallet` method call,returning the user if signature is correct
     */
    loginWallet(wallet: string, chain: Chain, signature: string): Promise<Pick<import("../../.mesh").LoginOutput, "protocol_id" | "refresh_token" | "token"> & {
        user: Pick<import("../../.mesh").User, "id" | "email" | "status" | "displayName" | "gatewayId" | "hash" | "arweaveUrl" | "createdAt" | "updatedAt" | "walletId" | "profilePicture" | "roles" | "credentialsExtraCredits" | "dataModelsExtraCredits" | "deletedAt" | "gatewayIdLastupdate" | "gatewayIdUpdatedAt" | "isCompleted">;
    }>;
    /**
     * The function `refreshToken` takes an existing refresh token to create a new one
     * @param {string} existingRefreshToken: a string representing the existing refresh token
     * @returns the result of the `refreshToken` method call,returning the  new refresh token and user
     */
    refreshToken(existingRefreshToken: string): Promise<Pick<import("../../.mesh").LoginOutput, "protocol_id" | "refresh_token" | "token"> & {
        user: Pick<import("../../.mesh").User, "id" | "email" | "status" | "displayName" | "gatewayId" | "hash" | "arweaveUrl" | "createdAt" | "updatedAt" | "walletId" | "profilePicture" | "roles" | "credentialsExtraCredits" | "dataModelsExtraCredits" | "deletedAt" | "gatewayIdLastupdate" | "gatewayIdUpdatedAt" | "isCompleted">;
    }>;
    /**
     * The function unregisterAuthMethod is an asynchronous function that takes in a JSON object and an
     * AuthType, and attempts to unregister an authentication method using the SDK.
     * @param {string} data: a string representing either email or wallet
     * @param {AuthType} type: a AuthType representing the type like Wallet, Email and so on
     * @returns the result of the `this.sdk.unregisterAuthMethod_mutation` method, which is awaited.
     */
    unregisterAuthMethod(data: string, type: AuthType): Promise<import("../../.mesh").unregisterAuthMethod_mutationMutation>;
}
