"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const validators_1 = require("../utils/validators");
class Request {
    constructor(sdk) {
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
    createDataRequest(inputSchema) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.createDataRequest_mutation({ input: inputSchema });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
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
    getDataRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(requestId);
                return this.sdk.dataRequest_query({ requestId });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataRequestCount` is an asynchronous function that makes a data request count
     * query using the `dataRequestCount_query` method from the `sdk` object, and returns the result.
     * @param {dataRequestCount_queryQueryVariables} [variables] - The `variables` parameter is an
     * optional object that contains any variables needed for the `dataRequestCount_query` query. These
     * variables can be used to filter or customize the data request count query.
     * @returns the result of the `dataRequestCount_query` method call.
     */
    getDataRequestCount(filterVariables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.dataRequestCount_query({ filter: filterVariables });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataRequestStatus` is an asynchronous function that queries the status of a data
     * request using a provided request ID.
     * @param {string} requestId - The `requestId` parameter is a string that represents the unique
     * identifier of a data request.
     * @returns the result of the `dataRequestStatus_query` method call, which is a Promise.
     */
    getDataRequestStatus(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(requestId);
                return this.sdk.dataRequestStatus_query({ requestId });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
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
    getDataRequests(filterVariables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.dataRequests_query({ filter: filterVariables });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getRequestsReceived` is an asynchronous function that retrieves requests received
     * using the `requestsReceived_query` method from the `sdk` object.
     * @param {requestsReceived_queryQueryVariables} [variables] - The `variables` parameter is an
     * optional object that contains variables to be passed to the `requestsReceived_query` function.
     * These variables can be used to filter or customize the query results.
     * @returns the result of the `requestsReceived_query` method call.
     */
    getRequestsReceived(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.requestsReceived_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getRequestsReceivedCount` is an asynchronous function that retrieves the count of
     * requests received, and it handles any errors that occur during the process.
     * @param {requestsReceivedCount_queryQueryVariables} [variables] - The "variables" parameter is an
     * optional parameter that allows you to pass any variables needed for the
     * "requestsReceivedCount_query" query. It is of type "requestsReceivedCount_queryQueryVariables".
     * @returns the result of the `requestsReceivedCount_query` method call.
     */
    getRequestsReceivedCount(filterVariables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.requestsReceivedCount_query({
                    filter: filterVariables,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
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
    getRequestsSent(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.requestsSent_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getRequestsSentCount` is an asynchronous function that retrieves the count of
     * requests sent, and it handles any errors that occur during the process.
     * @param {requestsSentCount_queryQueryVariables} [variables] - The "variables" parameter is an
     * optional object that contains any variables needed for the "requestsSentCount_query" query. These
     * variables can be used to filter or customize the query results.
     * @returns the result of the `requestsSentCount_query` method call.
     */
    getRequestsSentCount(filterVariables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.requestsSentCount_query({
                    filter: filterVariables,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
}
exports.Request = Request;
