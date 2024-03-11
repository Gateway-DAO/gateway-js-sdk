import {
  DataRequestSchemaInput,
  FilterDataRequestInput,
  Sdk,
  requestsReceived_queryQueryVariables,
  requestsSent_queryQueryVariables,
} from '../../gatewaySdk';
import { errorHandler } from '../utils/errorHandler';
import { isUUIDValid, validateObjectProperties } from '../utils/validators';

export class Request {
  public sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function `createDataRequest` is an asynchronous function that takes an input of type
   * `DataRequestSchemaInput` and calls the `createDataRequest_mutation` method of the `sdk` object,
   * returning the result.
   * @param {DataRequestSchemaInput} input - The `input` parameter is an object of type
   * `DataRequestSchemaInput`. It is used to provide the necessary data for creating a data request. The
   * specific properties and their types within the `DataRequestSchemaInput` object would depend on the
   * requirements of the `createDataRequest_mutation` function
   * @returns the result of the `this.sdk.createDataRequest_mutation({ input })` method call.
   */
  async createDataRequest(inputSchema: DataRequestSchemaInput) {
    try {
      validateObjectProperties(inputSchema);
      return await this.sdk.createDataRequest_mutation({ input: inputSchema });
    } catch (error: any) {
      throw new Error(errorHandler(error));
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
      isUUIDValid(requestId);
      return await this.sdk.dataRequest_query({ requestId });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataRequestCount` is an asynchronous function that makes a data request count
   * query using the `dataRequestCount_query` method from the `sdk` object, and returns the result.
   * @param {dataRequestCount_queryQueryVariables} [variables] - The `variables` parameter is an
   * optional object that contains any variables needed for the `dataRequestCount_query` query. These
   * variables can be used to filter or customize the data request count query.
   * @returns the result of the `dataRequestCount_query` method call.
   */
  async getDataRequestCount(filterVariables?: FilterDataRequestInput) {
    try {
      return await this.sdk.dataRequestCount_query({ filter: filterVariables });
    } catch (error: any) {
      throw new Error(errorHandler(error));
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
      isUUIDValid(requestId);
      return await this.sdk.dataRequestStatus_query({ requestId });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataRequests` is an asynchronous function that makes a query to retrieve data
   * requests, and it handles any errors that occur during the query.
   * @param {dataRequests_queryQueryVariables} [variables] - The `variables` parameter is an optional
   * object that contains any variables needed for the `dataRequests_query` function. These variables can
   * be used to filter or customize the data requests that are being queried.
   * @returns The `getDataRequests` function is returning the result of the `dataRequests_query` function
   * call.
   */
  async getDataRequests(filterVariables?: FilterDataRequestInput) {
    try {
      return await this.sdk.dataRequests_query({ filter: filterVariables });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsReceived` is an asynchronous function that retrieves requests received
   * using the `requestsReceived_query` method from the `sdk` object.
   * @param {requestsReceived_queryQueryVariables} [variables] - The `variables` parameter is an
   * optional object that contains variables to be passed to the `requestsReceived_query` function.
   * These variables can be used to filter or customize the query results.
   * @returns the result of the `requestsReceived_query` method call.
   */
  async getRequestsReceived(variables?: requestsReceived_queryQueryVariables) {
    try {
      return await this.sdk.requestsReceived_query(variables);
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsReceivedCount` is an asynchronous function that retrieves the count of
   * requests received, and it handles any errors that occur during the process.
   * @param {requestsReceivedCount_queryQueryVariables} [variables] - The "variables" parameter is an
   * optional parameter that allows you to pass any variables needed for the
   * "requestsReceivedCount_query" query. It is of type "requestsReceivedCount_queryQueryVariables".
   * @returns the result of the `requestsReceivedCount_query` method call.
   */
  async getRequestsReceivedCount(filterVariables?: FilterDataRequestInput) {
    try {
      return await this.sdk.requestsReceivedCount_query({
        filter: filterVariables,
      });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsSent` is an asynchronous function that retrieves requests sent using the
   * `requestsSent_query` method from the `sdk` object.
   * @param {requestsSent_queryQueryVariables} [variables] - The `variables` parameter is an optional
   * object that contains any variables you want to pass to the `requestsSent_query` function. These
   * variables can be used to customize the query and retrieve specific data. If you don't need to pass
   * any variables, you can omit this parameter.
   * @returns the result of the `requestsSent_query` method call.
   */
  async getRequestsSent(variables?: requestsSent_queryQueryVariables) {
    try {
      return await this.sdk.requestsSent_query(variables);
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsSentCount` is an asynchronous function that retrieves the count of
   * requests sent, and it handles any errors that occur during the process.
   * @param {requestsSentCount_queryQueryVariables} [variables] - The "variables" parameter is an
   * optional object that contains any variables needed for the "requestsSentCount_query" query. These
   * variables can be used to filter or customize the query results.
   * @returns the result of the `requestsSentCount_query` method call.
   */
  async getRequestsSentCount(filterVariables?: FilterDataRequestInput) {
    try {
      return await this.sdk.requestsSentCount_query({
        filter: filterVariables,
      });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }
}
