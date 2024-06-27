import {
  Sdk,
  activitiesCount_queryQueryVariables,
  activities_queryQueryVariables,
} from '../../../gatewaySdk/sources/Gateway';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';

export class Activity {
  private sdk: Sdk;
  private validationService: ValidationService;

  constructor(sdk: Sdk, validationService: ValidationService) {
    this.sdk = sdk;
    this.validationService = validationService;
  }

  /**
   * @param {string} id - The `id` parameter is a string that is used to query an activity using the
   * `activity_query` method from the `sdk`.
   * @returns The `getActivity` function is returning the result of the `this.sdk.activity_query({ id: id
   * })` call after validating the `id` parameter using the `isStringValid` function. If an error occurs
   * during the process, it will be caught and rethrown with the error message handled by the
   * `errorHandler` function.
   */
  async getActivity(id: string) {
    try {
      this.validationService.validateString(id);
      return await this.sdk.activity_query({ id: id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async getActivities(variables?: activities_queryQueryVariables) {
    try {
      return await this.sdk.activities_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  async getActivityCount(variables?: activitiesCount_queryQueryVariables) {
    try {
      return await this.sdk.activitiesCount_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
