//user.ts

import {
  FilterActivityInput,
  FilterDataModelInput,
  Sdk,
  UpdateUserInput,
  UserIdentifierType,
  myPDACountQueryQueryVariables,
  myPDAsQueryQueryVariables,
} from '../../../gatewaySdk/sources/Gateway';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';

export class User {
  private sdk: Sdk;
  private validationService: ValidationService;

  constructor(sdk: Sdk, validationService: ValidationService) {
    this.sdk = sdk;
    this.validationService = validationService;
  }

  /**
   * The function `me` makes an asynchronous call to `me_query` and returns the result, or throws an
   * error if something goes wrong.
   * @returns a Promise that resolves to me.
   */
  async me() {
    try {
      return await this.sdk.meQuery();
    } catch (error) {
      console.log(error);
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
      this.validationService.validateString(value);
      return await this.sdk.userQuery({ input: { type, value } });
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
  async myPDACount(filter?: myPDACountQueryQueryVariables) {
    try {
      if (filter?.filter) {
        this.validationService.validatePDAFilter(filter.filter);
      }
      return (await this.sdk.myPDACountQuery(filter)).myPDACount;
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
  async myPDAs(filter?: myPDAsQueryQueryVariables) {
    try {
      if (filter?.filter) {
        this.validationService.validatePDAFilter(filter.filter);
      }
      return await this.sdk.myPDAsQuery(filter);
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
      return (await this.sdk.myDataModelsCountQuery({ filter }))
        .myDataModelsCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async myActivities(filter?: FilterActivityInput, markAsRead?: boolean) {
    try {
      return await this.sdk.myActivitiesQuery({ filter, markAsRead });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async myActivitiesCount(read?: boolean) {
    try {
      return (await this.sdk.myActivitiesCountQuery({ read }))
        .myActivitiesCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async updateMe(updatedBody: UpdateUserInput) {
    try {
      return await this.sdk.updateMyUserMutation({ input: updatedBody });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
