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
exports.DataModel = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const validators_1 = require("../utils/validators");
class DataModel {
    constructor(sdk) {
        this.sdk = sdk;
    }
    /**
     * The function `createModelInput` is an asynchronous function that takes a `CreateDataModelInput`
     * object as input and returns a promise that resolves to a `createDataModel_mutationMutation` object.
     * @param {CreateDataModelInput} createModelInput - The `createModelInput` parameter is of type
     * `CreateDataModelInput`. It is an input object that contains the data needed to create a new data
     * model.
     * @returns a Promise that resolves to a value of type `createDataModel_mutationMutation`.
     */
    createDataModel(createModelInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.validateObjectProperties)(createModelInput);
                return this.sdk.createDataModel_mutation({
                    input: createModelInput,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataModel` retrieves a data model using its ID and returns a promise that resolves
     * to the queried data model.
     * @param {string} dataModelId - The dataModelId parameter is a string that represents the unique
     * identifier of a data model. It is used to query and retrieve a specific data model from the system.
     * @returns a Promise that resolves to a dataModel_queryQuery object.
     */
    getDataModel(dataModelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(dataModelId);
                return this.sdk.dataModel_query({ id: dataModelId });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataModels` is an asynchronous function that queries data models and returns the
     * result.
     * @param {dataModels_queryQueryVariables} dataModel - The `dataModel` parameter is an object that
     * contains variables for the `dataModels_query` query. It is of type `dataModels_queryQueryVariables`.
     * @returns The `getDataModels` function is returning the result of the `dataModels_query` function
     * call.
     */
    getDataModels(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = this.sdk.dataModels_query(variables);
                return data;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataModelsCount` is an asynchronous function that retrieves the count of data
     * models based on the provided filter variables.
     * @param variables - The `variables` parameter is of type `InputMaybe<FilterDataModelInput>`. It is an
     * optional input that can be used to filter the data models. The `FilterDataModelInput` is a type that
     * contains various filter options .
     * * The above type represents the input data model for filtering data, including consumption price,
     * organization identification, and user information.
     * @property {InputMaybe<FloatRangeDto> | undefined} consumptionPrice - It is an optional property of
     * type `InputMaybe<FloatRangeDto>`. This means that it can either be `undefined` or an object of type
     * `FloatRangeDto`.
     * @property {InputMaybe<OrganizationIdentificationInput> | undefined} organization - The
     * "organization" property is an optional input that represents the identification of an organization.
     * It can be of type "InputMaybe<OrganizationIdentificationInput>", which means it can either be a
     * valid organization identification input or undefined.
     * @property {InputMaybe} user - The "user" property is of type "InputMaybe" which means it can either
     * be a value of type "undefined" or a value of another type. The specific type of "user" is not
     * provided in the code snippet, so it is unclear what type it should be.
     * @returns The `getDataModelsCount` function is returning the result of the `dataModelsCount_query`
     * method call, which is a promise.
     */
    getDataModelsCount(filterVariables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.dataModelsCount_query({
                    filter: filterVariables,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataModelMetaData` is an asynchronous function that retrieves metadata for data
     * models and throws an error if there is any.
     * @returns The `getDataModelMetaData` function is returning the result of the
     * `dataModelsMetadata_query` method call.
     */
    getDataModelsMetaData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.sdk.dataModelsMetadata_query();
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getIssuersByDataModel` retrieves issuers based on a given data model ID using an SDK.
     * @param {string} id - A string representing the ID of the data model.
     * @returns the result of the `issuersByDataModel_query` method call.
     */
    getIssuersByDataModel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(id);
                return this.sdk.issuersByDataModel_query({ id: id });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getIssuersByDataModelCount` retrieves the count of issuers based on a given data model
     * ID.
     * @param {string} dataModelId - The dataModelId parameter is a string that represents the ID of a data
     * model.
     * @returns the result of the `issuersByDataModelCount_query` method call.
     */
    getIssuersByDataModelCount(dataModelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(dataModelId);
                return this.sdk.issuersByDataModelCount_query({ id: dataModelId });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getTotalofIssuersByDataModel` retrieves the total number of issuers based on a given
     * data model ID.
     * @param {string} dataModelId - The dataModelId parameter is a string that represents the identifier
     * of a data model. It is used to query the total number of issuers associated with that data model.
     * @returns the result of the `getTotalofIssuersByDataModel_query` method call.
     */
    getTotalofIssuersByDataModel(dataModelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(dataModelId);
                return this.sdk.getTotalofIssuersByDataModel_query({ dataModelId });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
}
exports.DataModel = DataModel;
