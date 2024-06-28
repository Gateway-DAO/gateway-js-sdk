import { errorHandler } from '../../utils/errorHandler';
import { isStringValid } from '../../utils/validators';
import {
  Sdk,
  activitiesCount_queryQueryVariables,
  activities_queryQueryVariables,
} from '../../../gatewaySdk/sources/GatewayV3';

export class Activity {
  public sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
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
      isStringValid(id);
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
