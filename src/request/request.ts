import {
  DataRequestSchemaInput,
  FilterDataRequestInput,
  Sdk,
  requestsReceived_queryQueryVariables,
  requestsSent_queryQueryVariables,
} from '../../.mesh';

export class Request {
  private sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function `createDataRequest` creates a data request using the provided input parameters.
   * @param {DataRequestSchemaInput}  - - `dataRequestTemplateId`: The ID of the data request template
   * that will be used to create the data request.
   * @returns the result of the `createDataRequest_mutation` method call.
   */
  async createDataRequest({
    dataRequestTemplateId,
    dataUse,
    organization,
    owner,
  }: DataRequestSchemaInput) {
    try {
      return this.sdk.createDataRequest_mutation({
        input: {
          dataRequestTemplateId,
          dataUse,
          organization,
          owner,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getDataRequest` is an asynchronous function that retrieves data using a request ID and
   * throws an error if there is any.
   * @param {string} requestId - The `requestId` parameter is a string that represents the unique
   * identifier of a data request. It is used to query the data request using the `dataRequest_query`
   * method of the `sdk` object.
   * @returns The `getDataRequest` function is returning the result of the `dataRequest_query` method
   * call.
   */
  async getDataRequest(requestId: string) {
    try {
      return await this.sdk.dataRequest_query({ requestId });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getDataRequestCount` is an asynchronous function that takes in a
   * `FilterDataRequestInput` object as a parameter and returns the result of a query using the
   * `sdk.dataRequestCount_query` method.
   * @param {FilterDataRequestInput}  - - `dataTemplateIds`: An array of data template IDs to filter the
   * data requests by.
   * @returns the result of the `dataRequestCount_query` method call.
   */
  async getDataRequestCount({
    dataTemplateIds,
    ids,
    owner,
    status,
    verifier,
    verifierOrganization,
  }: FilterDataRequestInput = {}) {
    try {
      return await this.sdk.dataRequestCount_query({
        filter: {
          dataTemplateIds,
          ids,
          owner,
          status,
          verifier,
          verifierOrganization,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getDataRequestStatus` is an asynchronous function that queries the status of a data
   * request using a provided request ID.
   * @param {string} requestId - The `requestId` parameter is a string that represents the unique
   * identifier of a data request.
   * @returns the result of the `dataRequestStatus_query` method call, which is a Promise.
   */
  async getDataRequestStatus(requestId: string) {
    try {
      return await this.sdk.dataRequestStatus_query({ requestId });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getDataRequests` is an asynchronous function that retrieves data requests based on
   * various filters.
   * @param {FilterDataRequestInput}  - - `dataTemplateIds`: An array of data template IDs to filter the
   * data requests by.
   * @returns the result of the `dataRequests_query` method call.
   */
  async getDataRequests({
    dataTemplateIds,
    ids,
    owner,
    status,
    verifier,
    verifierOrganization,
  }: FilterDataRequestInput = {}) {
    try {
      return await this.sdk.dataRequests_query({
        filter: {
          dataTemplateIds,
          ids,
          owner,
          status,
          verifier,
          verifierOrganization,
        },
      });
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  /**
   * The function `getRequestsReceived` is an asynchronous function that retrieves requests received
   * based on the provided variables.
   * @param {requestsReceived_queryQueryVariables}  - - `filter`: A filter object used to specify the
   * conditions for filtering the requests received. It can include properties such as `status`, `date`,
   * or any other relevant criteria.
   * @returns the result of the `requestsReceived_query` method call.
   */

  async getRequestsReceived({
    filter,
    order,
    skip,
    take,
  }: requestsReceived_queryQueryVariables = {}) {
    try {
      return await this.sdk.requestsReceived_query({
        filter,
        order,
        skip,
        take,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getRequestsReceivedCount` retrieves the count of requests received based on the
   * provided filter criteria.
   * @param {FilterDataRequestInput}  - - `dataTemplateIds`: An array of data template IDs to filter the
   * requests by.
   * @returns the result of the `requestsReceivedCount_query` method call.
   */
  async getRequestsReceivedCount({
    dataTemplateIds,
    ids,
    owner,
    status,
    verifier,
    verifierOrganization,
  }: FilterDataRequestInput = {}) {
    try {
      return await this.sdk.requestsReceivedCount_query({
        filter: {
          dataTemplateIds,
          ids,
          owner,
          status,
          verifier,
          verifierOrganization,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getRequestsSent` is an asynchronous function that retrieves requests sent based on the
   * provided filter, order, skip, and take parameters.
   * @param {requestsSent_queryQueryVariables}  - - `filter`: An object that specifies the filtering
   * criteria for the requests. It can include properties like `status`, `date`, etc.
   * @returns the result of the `requestsSent_query` method call.
   */
  async getRequestsSent({
    filter,
    order,
    skip,
    take,
  }: requestsSent_queryQueryVariables = {}) {
    try {
      return await this.sdk.requestsSent_query({ filter, order, skip, take });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   * The function `getRequestsSentCount` retrieves the count of requests sent based on the provided
   * filter criteria.
   * @param {FilterDataRequestInput}  - - `dataTemplateIds`: An array of data template IDs to filter the
   * requests by.
   * @returns the result of the `requestsSentCount_query` method call.
   */
  async getRequestsSentCount({
    dataTemplateIds,
    ids,
    owner,
    status,
    verifier,
    verifierOrganization,
  }: FilterDataRequestInput = {}) {
    try {
      return await this.sdk.requestsSentCount_query({
        filter: {
          dataTemplateIds,
          ids,
          owner,
          status,
          verifier,
          verifierOrganization,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
