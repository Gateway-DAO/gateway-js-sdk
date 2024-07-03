import {
  DataRequestSchemaInput,
  FilterDataRequestInput,
  requestsReceivedQueryQueryVariables,
  requestsSentQueryQueryVariables,
  Sdk,
  UpdateDataRequestData,
} from '../../../gatewaySdk/sources/Gateway';
import { Config } from '../../common/types';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';
import { WalletService } from '../../services/wallet-service';

export class Request {
  private sdk: Sdk;
  private validationService: ValidationService;
  private wallet: WalletService;
  private config: Config;

  constructor(
    sdk: Sdk,
    validationService: ValidationService,
    config: Config,
    wallet: WalletService,
  ) {
    this.sdk = sdk;
    this.validationService = validationService;
    this.wallet = wallet;
    this.config = config;
  }

  /**
   * The function `createDataRequest` asynchronously creates a data request using input schema after
   * validating object properties and handling any errors.
   * @param {DataRequestSchemaInput} dataRequestBody - The `dataRequestBody` parameter in the `createDataRequest`
   * function is an object that contains the data needed to create a data request. It is passed to the
   * function as an argument and is expected to adhere to a specific schema defined by the
   * `DataRequestSchemaInput` type. The function first
   * @returns The `createDataRequest` function is returning the result of the
   * `this.sdk.createDataRequest_mutation({ input: dataRequestBody })` call after validating the
   * `dataRequestBody` object properties.
   */
  async createDataRequest(dataRequestBody: DataRequestSchemaInput) {
    try {
      this.validationService.validateObjectProperties(dataRequestBody);
      const { signature, signingKey } =
        await this.wallet.signMessage(dataRequestBody);

      return await this.sdk.createDataRequestMutation({
        input: {
          data: dataRequestBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updateDataRequest` asynchronously updates data based on the input schema after
   * validating object properties and handling any errors.
   * @param {UpdateDataRequestData} updatedDataRequestBody - The `updateDataRequest` function takes an
   * `updatedDataRequestBody` parameter of type `UpdateDataRequestData`.
   * @returns The `updateDataRequest` function is returning the result of calling
   */
  async updateDataRequest(updatedDataRequestBody: UpdateDataRequestData) {
    try {
      this.validationService.validateObjectProperties(updatedDataRequestBody);
      const { signature, signingKey } = await this.wallet.signMessage(
        updatedDataRequestBody,
      );

      return await this.sdk.updateDataRequestMutation({
        input: {
          data: updatedDataRequestBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
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
      this.validationService.validateUUID(requestId);
      return await this.sdk.dataRequestQuery({ requestId });
    } catch (error) {
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
      return await this.sdk.dataRequestsQuery({ filter: filterVariables });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataRequestCount` is an asynchronous function that makes a data request count
   * query using the `dataRequestCount_query` method from the `sdk` object, and returns the result.
   * @param {FilterDataRequestInput} [filterVariables] - The `filterVariables` parameter is an
   * optional object that contains any filterVariables needed for the `dataRequestCount_query` query. These
   * filterVariables can be used to filter or customize the data request count query.
   * @returns the result of the `dataRequestCount_query` method call.
   */
  async getDataRequestCount(filterVariables?: FilterDataRequestInput) {
    try {
      return await this.sdk.dataRequestCountQuery({ filter: filterVariables });
    } catch (error) {
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
      this.validationService.validateUUID(requestId);
      return await this.sdk.dataRequestStatusQuery({ requestId });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsReceived` is an asynchronous function that retrieves requests received
   * using the `requestsReceived_query` method from the `sdk` object.
   * @param {requestsReceivedQueryQueryVariables} [variables] - The `variables` parameter is an
   * optional object that contains variables to be passed to the `requestsReceived_query` function.
   * These variables can be used to filter or customize the query results.
   * @returns the result of the `requestsReceived_query` method call.
   */
  async getRequestsReceived(variables?: requestsReceivedQueryQueryVariables) {
    try {
      return await this.sdk.requestsReceivedQuery(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsReceivedCount` is an asynchronous function that retrieves the count of
   * requests received, and it handles any errors that occur during the process.
   * @param {FilterDataRequestInput} [filterVariables] - The "filterVariables" parameter is an
   * optional parameter that allows you to pass any filterVariables needed for the
   * "requestsReceivedCount_query" query. It is of type "FilterDataRequestInput".
   * @returns the result of the `requestsReceivedCount_query` method call.
   */
  async getRequestsReceivedCount(filterVariables?: FilterDataRequestInput) {
    try {
      return await this.sdk.requestsReceivedCountQuery({
        filter: filterVariables,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsSent` is an asynchronous function that retrieves requests sent using the
   * `requestsSent_query` method from the `sdk` object.
   * @param {requestsSentQueryQueryVariables} [variables] - The `variables` parameter is an optional
   * object that contains any variables you want to pass to the `requestsSent_query` function. These
   * variables can be used to customize the query and retrieve specific data. If you don't need to pass
   * any variables, you can omit this parameter.
   * @returns the result of the `requestsSent_query` method call.
   */
  async getRequestsSent(variables?: requestsSentQueryQueryVariables) {
    try {
      return await this.sdk.requestsSentQuery(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getRequestsSentCount` is an asynchronous function that retrieves the count of
   * requests sent, and it handles any errors that occur during the process.
   * @param {FilterDataRequestInput} [filterVariables] - The "FilterDataRequestInput" parameter is an
   * optional object that contains any FilterDataRequestInput needed for the "requestsSentCount_query" query. These
   * FilterDataRequestInput can be used to filter or customize the query results.
   * @returns the result of the `requestsSentCount_query` method call.
   */
  async getRequestsSentCount(filterVariables?: FilterDataRequestInput) {
    try {
      return await this.sdk.requestsSentCountQuery({
        filter: filterVariables,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
