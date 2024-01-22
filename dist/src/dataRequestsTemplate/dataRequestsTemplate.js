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
exports.DataRequestTemplate = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const validators_1 = require("../utils/validators");
class DataRequestTemplate {
    constructor(sdk) {
        this.sdk = sdk;
    }
    /**
     * The function creates a data request template using the provided input.
     * @param {TemplateSchemaInput} templateInput - The `templateInput` parameter is an object that
     * contains the input data for creating a data request template. It should follow the
     * `TemplateSchemaInput` schema, which defines the structure and properties of the template input.
     * @returns the result of the `createDataRequestTemplate_mutation` method call, which is likely a
     * promise that resolves to the result of the mutation.
     */
    createDataRequestTemplate(templateInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.validateObjectProperties)(templateInput);
                return yield this.sdk.createDataRequestTemplate_mutation({
                    input: templateInput,
                });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataRequestTemplate` is an asynchronous function that queries a data request
     * template using an ID and returns the result.
     * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
     * data request template that you want to retrieve.
     * @returns the result of the `dataRequestTemplate_query` method call, which is a Promise.
     */
    getDataRequestTemplate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(id);
                return yield this.sdk.dataRequestTemplate_query({ id });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataRequestTemplates` retrieves data request templates based on the provided
     * filter, order, skip, and take parameters.
     * @param  - - `filter` is an optional parameter of type `FilterDataRequestTemplateInput` that allows
     * you to specify conditions to filter the data request templates.
     * @returns the result of the `dataRequestTemplates_query` method call, which is a Promise
     * that resolves to the data request templates.
     */
    getDataRequestTemplates(variables) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.dataRequestTemplates_query(variables);
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataRequestsTemplateCount` is an asynchronous function that retrieves the count
     * of data request templates based on an optional filter.
     * @param {FilterDataRequestTemplateInput} [filter] - The `filter` parameter is an optional input
     * that allows you to specify criteria for filtering the data request templates. It is of type
     * `FilterDataRequestTemplateInput`.
     * @returns the count of data request templates.
     */
    getDataRequestsTemplateCount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.sdk.dataRequestTemplatesCount_query({ filter }))
                    .dataRequestTemplatesCount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getDataRequestsTemplatesMetadata` gets metadat of template
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @returns the result of the `dataRequestTemplatesMetadata_queryQuery` method call.
     */
    getDataRequestsTemplatesMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.sdk.dataRequestTemplatesMetadata_query();
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getVerifiersByDataRequestTemplate` gets verifier for a data request template
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} id - The variables is a id of the template
     * @returns the result of the `verifiersByDataRequestTemplate_queryQuery` method call.
     */
    getVerifiersByDataRequestTemplate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(id);
                return yield this.sdk.verifiersByDataRequestTemplate_query({ id });
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
    /**
     * The function `getVerifiersByDataRequestTemplateCount` gets count of recently made transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} id - The variables is a id of the template
     * @returns the result of the `verifiersByDataRequestTemplateCount_queryQuery` method call.
     */
    getVerifiersByDataRequestTemplateCount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, validators_1.isUUIDValid)(id);
                return (yield this.sdk.verifiersByDataRequestTemplateCount_query({ id }))
                    .verifiersByDataRequestTemplateCount;
            }
            catch (error) {
                throw new Error((0, errorHandler_1.errorHandler)(error));
            }
        });
    }
}
exports.DataRequestTemplate = DataRequestTemplate;
