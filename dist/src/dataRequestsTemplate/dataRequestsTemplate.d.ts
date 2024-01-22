import { FilterDataRequestTemplateInput, Sdk, TemplateSchemaInput, dataRequestTemplates_queryQueryVariables } from '../../.mesh';
export declare class DataRequestTemplate {
    sdk: Sdk;
    constructor(sdk: Sdk);
    /**
     * The function creates a data request template using the provided input.
     * @param {TemplateSchemaInput} templateInput - The `templateInput` parameter is an object that
     * contains the input data for creating a data request template. It should follow the
     * `TemplateSchemaInput` schema, which defines the structure and properties of the template input.
     * @returns the result of the `createDataRequestTemplate_mutation` method call, which is likely a
     * promise that resolves to the result of the mutation.
     */
    createDataRequestTemplate(templateInput: TemplateSchemaInput): Promise<import("../../.mesh").createDataRequestTemplate_mutationMutation>;
    /**
     * The function `getDataRequestTemplate` is an asynchronous function that queries a data request
     * template using an ID and returns the result.
     * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
     * data request template that you want to retrieve.
     * @returns the result of the `dataRequestTemplate_query` method call, which is a Promise.
     */
    getDataRequestTemplate(id: string): Promise<import("../../.mesh").dataRequestTemplate_queryQuery>;
    /**
     * The function `getDataRequestTemplates` retrieves data request templates based on the provided
     * filter, order, skip, and take parameters.
     * @param  - - `filter` is an optional parameter of type `FilterDataRequestTemplateInput` that allows
     * you to specify conditions to filter the data request templates.
     * @returns the result of the `dataRequestTemplates_query` method call, which is a Promise
     * that resolves to the data request templates.
     */
    getDataRequestTemplates(variables?: dataRequestTemplates_queryQueryVariables): Promise<import("../../.mesh").dataRequestTemplates_queryQuery>;
    /**
     * The function `getDataRequestsTemplateCount` is an asynchronous function that retrieves the count
     * of data request templates based on an optional filter.
     * @param {FilterDataRequestTemplateInput} [filter] - The `filter` parameter is an optional input
     * that allows you to specify criteria for filtering the data request templates. It is of type
     * `FilterDataRequestTemplateInput`.
     * @returns the count of data request templates.
     */
    getDataRequestsTemplateCount(filter?: FilterDataRequestTemplateInput): Promise<number>;
    /**
     * The function `getDataRequestsTemplatesMetadata` gets metadat of template
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @returns the result of the `dataRequestTemplatesMetadata_queryQuery` method call.
     */
    getDataRequestsTemplatesMetadata(): Promise<import("../../.mesh").dataRequestTemplatesMetadata_queryQuery>;
    /**
     * The function `getVerifiersByDataRequestTemplate` gets verifier for a data request template
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} id - The variables is a id of the template
     * @returns the result of the `verifiersByDataRequestTemplate_queryQuery` method call.
     */
    getVerifiersByDataRequestTemplate(id: string): Promise<import("../../.mesh").verifiersByDataRequestTemplate_queryQuery>;
    /**
     * The function `getVerifiersByDataRequestTemplateCount` gets count of recently made transactions
     * to the SDK and returns the result, or throws an error if something goes wrong.
     * @param {string} id - The variables is a id of the template
     * @returns the result of the `verifiersByDataRequestTemplateCount_queryQuery` method call.
     */
    getVerifiersByDataRequestTemplateCount(id: string): Promise<number>;
}
