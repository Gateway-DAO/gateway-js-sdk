import {
  FilterDataModelInput,
  FilterDataRequestTemplateInput,
  FilterPDAInput,
  Sdk,
  UpdateUserInput,
} from '../../.mesh';
import { PDAFilter, UserIdentifierType } from '../types';
import { errorHandler } from '../utils/errorHandler';

export class User {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function `me` makes an asynchronous call to `me_query` and returns the result, or throws an
   * error if something goes wrong.
   * @returns a Promise that resolves to me.
   */
  async me() {
    try {
      return await this.sdk.me_query();
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function takes a user identifier type and value as input, queries the user using the SDK, and
   * returns the result.
   * @param  - - `type`: The type of user identifier. It can be one of the following values:
   * @returns The `user` function is returning the result of the `user_query` method call from the `sdk`
   * object.
   */
  async getSingleUser({
    type,
    value,
  }: {
    type: UserIdentifierType;
    value: string;
  }) {
    try {
      return await this.sdk.user_query({ input: { type, value } });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `myPDACount` is an asynchronous function that returns the count of a user's PDA
   *  based on an optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the PDAs before counting them. It is
   * of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async myPDACount(filter?: FilterPDAInput) {
    try {
      return (await this.sdk.myPDACount_query({ filter })).myPDACount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `myPDAs` is an asynchronous function that takes in a `PDAFilter` object and returns a
   * promise that resolves to a `myPDAs_queryQuery` object.
   * @param {PDAFilter}  - - `filter`: An object that contains filter criteria for the query.
   * @returns a Promise that resolves to a value of type `myPDAs_queryQuery`.
   */
  async myPDAs({ filter, order, skip, take }: PDAFilter = {}) {
    try {
      return await this.sdk.myPDAs_query({ filter, order, skip, take });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
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
  async myDataModelsCount(filter?: FilterDataModelInput) {
    try {
      return (await this.sdk.dataModelsCount_query({ filter })).dataModelsCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
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
  async myDataRequestTemplatesCount(filter?: FilterDataRequestTemplateInput) {
    try {
      return (await this.sdk.myDataRequestTemplatesCount_query({ filter }))
        .myDataRequestTemplatesCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updateUser` updates a user's information and returns the updated user.
   * @param {UpdateUserInput} updatedUser - The `updatedUser` parameter is an object of type
   * `UpdateUserInput`. It contains the data that will be used to update a user. The specific
   * properties and their types within the `UpdateUserInput` object will depend on the requirements of
   * your application.
   * @returns The updateUser function is returning the result of the updateUser_mutation API call.
   */
  async updateUser(updatedUser: UpdateUserInput) {
    try {
      return await this.sdk.updateUser_mutation({ input: updatedUser });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function updates the display name of the user using a mutation and returns the result, or
   * throws an error if something goes wrong.
   * @param {string} displayName - The `displayName` parameter is a string that represents the new
   * display name that you want to update.
   * @returns the result of the `updateMyDisplayName_mutation` method call, which is likely a Promise
   * that resolves to the updated display name.
   */
  async updateMyDisplayName(displayName: string) {
    try {
      return await this.sdk.updateMyDisplayName_mutation({ displayName });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updateMyGatewayId` updates the gateway ID using a mutation and returns the result,
   * or throws an error if something goes wrong.
   * @param {string} gatewayId - The `gatewayId` parameter is a string that represents the ID of a
   * gateway.
   * @returns the result of the `updateMyGatewayId_mutation` method call, which is awaited using the
   * `await` keyword.
   */
  async updateMyGatewayId(gatewayId: string) {
    try {
      return await this.sdk.updateMyGatewayId_mutation({ gatewayId });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function updates the user's profile picture by making a mutation request to the SDK.
   * @param {string} profilePictureUrl - The `profilePictureUrl` parameter is a string that represents
   * the URL of the new profile picture that you want to update.
   * @returns the result of the `updateMyProfilePicture_mutation` mutation.
   */
  async updateMyProfilePicture(profilePictureUrl: string) {
    try {
      return await this.sdk.updateMyProfilePicture_mutation({
        profilePictureUrl,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updateNotificationEmail` updates the notification email by making a mutation request
   * to the SDK and returns the result, or throws an error if something goes wrong.
   * @param {string} email - The email parameter is a string that represents the new notification email
   * that needs to be updated.
   * @returns the result of the `updateNotificationEmail_mutation` method call.
   */
  async updateNotificationEmail(email: string) {
    try {
      return (await this.sdk.updateNotificationEmail_mutation({ email }))
        .updateNotificationEmail;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
