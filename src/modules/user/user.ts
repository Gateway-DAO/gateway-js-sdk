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
   * @param {myPDACountQueryQueryVariables} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the PDAs before counting them. It is
   * of type `myPDACountQueryQueryVariables`.
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
   * @param {myPDAs_queryQueryVariables}  [filter] `filter`: An object that contains filter criteria for the query.
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

  /**
   * This TypeScript function asynchronously retrieves activities based on optional filters and marks
   * them as read if specified.
   * @param {FilterActivityInput} [filter] - The `filter` parameter is an optional input that can be
   * used to specify criteria for filtering activities. It is of type `FilterActivityInput`, which
   * likely contains properties or fields that can be used to filter the activities based on certain
   * conditions or criteria.
   * @param {boolean} [markAsRead] - The `markAsRead` parameter is a boolean flag that indicates
   * whether the activities should be marked as read after retrieving them. If `markAsRead` is set to
   * `true`, the activities will be marked as read; otherwise, they will not be marked as read.
   * @returns The `myActivities` function is returning the result of the `myActivitiesQuery` method
   * from the SDK with the provided `filter` and `markAsRead` parameters.
   */
  async myActivities(filter?: FilterActivityInput, markAsRead?: boolean) {
    try {
      return await this.sdk.myActivitiesQuery({ filter, markAsRead });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * This TypeScript function asynchronously retrieves the count of a user's activities, with an
   * optional parameter to filter by read status.
   * @param {boolean} [read] - The `read` parameter is an optional boolean parameter that can be passed
   * to the `myActivitiesCount` function. It is used in the function to determine whether to include
   * only read activities in the count or not. If `read` is `true`, only read activities will be
   * counted, and if
   * @returns The `myActivitiesCount` value from the result of the `myActivitiesCountQuery` function is
   * being returned.
   */
  async myActivitiesCount(read?: boolean) {
    try {
      return (await this.sdk.myActivitiesCountQuery({ read }))
        .myActivitiesCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updateMe` asynchronously updates the user's information using the provided input and
   * handles any errors that occur.
   * @param {UpdateUserInput} updatedBody - UpdateUserInput
   * @returns The `updateMe` function is returning the result of the `updateMyUserMutation` function
   * call with the `updatedBody` input.
   */
  async updateMe(updatedBody: UpdateUserInput) {
    try {
      return await this.sdk.updateMyUserMutation({ input: updatedBody });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
