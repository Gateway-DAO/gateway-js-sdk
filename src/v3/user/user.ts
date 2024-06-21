import { UserIdentifierTypeV3 } from '../../types';
import { errorHandler } from '../../utils/errorHandler';
import { isStringValid, validatePDAFilter } from '../../utils/validators';
import {
  FilterDataModelInput,
  myActivities_queryQueryVariables,
  myActivitiesCount_queryQueryVariables,
  myPDACount_queryQueryVariables,
  myPDAs_queryQueryVariables,
  Sdk,
  UpdateUserInput,
} from '../../../gatewaySdk/sources/GatewayV3';

export class User {
  public sdk: Sdk;

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
    type: UserIdentifierTypeV3;
    value: string;
  }) {
    try {
      isStringValid(value);
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
  async myPDACount(filter?: myPDACount_queryQueryVariables) {
    try {
      if (filter?.filter) validatePDAFilter(filter.filter);
      return (await this.sdk.myPDACount_query(filter)).myPDACount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `myPDAs` is an asynchronous function that takes in a `myPDAs_queryQueryVariables` object and returns a
   * promise that resolves to a `myPDAs_queryQuery` object.
   * @param {myPDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query.
   * @returns a Promise that resolves to a value of type `myPDAs_queryQuery`.
   */
  async myPDAs(filter?: myPDAs_queryQueryVariables) {
    try {
      if (filter?.filter) validatePDAFilter(filter.filter);
      return await this.sdk.myPDAs_query(filter);
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

  async myActivities(filter?: myActivities_queryQueryVariables) {
    try {
      return await this.sdk.myActivities_query(filter);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async myActivitiesCount(filter?: myActivitiesCount_queryQueryVariables) {
    try {
      return (await this.sdk.myActivitiesCount_query(filter)).myActivitiesCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async updateMe(updatedBody: UpdateUserInput) {
    try {
      return await this.sdk.updateMyUser_mutation({ input: updatedBody });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
