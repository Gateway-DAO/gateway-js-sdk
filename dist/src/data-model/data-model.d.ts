import { CreateDataModelInput, Sdk, dataModels_queryQueryVariables, FilterDataModelInput } from '../../.mesh';
export declare class DataModel {
    sdk: Sdk;
    constructor(sdk: Sdk);
    /**
     * The function `createModelInput` is an asynchronous function that takes a `CreateDataModelInput`
     * object as input and returns a promise that resolves to a `createDataModel_mutationMutation` object.
     * @param {CreateDataModelInput} createModelInput - The `createModelInput` parameter is of type
     * `CreateDataModelInput`. It is an input object that contains the data needed to create a new data
     * model.
     * @returns a Promise that resolves to a value of type `createDataModel_mutationMutation`.
     */
    createDataModel(createModelInput: CreateDataModelInput): Promise<import("../../.mesh").createDataModel_mutationMutation>;
    /**
     * The function `getDataModel` retrieves a data model using its ID and returns a promise that resolves
     * to the queried data model.
     * @param {string} dataModelId - The dataModelId parameter is a string that represents the unique
     * identifier of a data model. It is used to query and retrieve a specific data model from the system.
     * @returns a Promise that resolves to a dataModel_queryQuery object.
     */
    getDataModel(dataModelId: string): Promise<import("../../.mesh").dataModel_queryQuery>;
    /**
     * The function `getDataModels` is an asynchronous function that queries data models and returns the
     * result.
     * @param {dataModels_queryQueryVariables} dataModel - The `dataModel` parameter is an object that
     * contains variables for the `dataModels_query` query. It is of type `dataModels_queryQueryVariables`.
     * @returns The `getDataModels` function is returning the result of the `dataModels_query` function
     * call.
     */
    getDataModels(variables?: dataModels_queryQueryVariables): Promise<import("../../.mesh").dataModels_queryQuery>;
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
    getDataModelsCount(filterVariables?: FilterDataModelInput): Promise<import("../../.mesh").dataModelsCount_queryQuery>;
    /**
     * The function `getDataModelMetaData` is an asynchronous function that retrieves metadata for data
     * models and throws an error if there is any.
     * @returns The `getDataModelMetaData` function is returning the result of the
     * `dataModelsMetadata_query` method call.
     */
    getDataModelsMetaData(): Promise<import("../../.mesh").dataModelsMetadata_queryQuery>;
    /**
     * The function `getIssuersByDataModel` retrieves issuers based on a given data model ID using an SDK.
     * @param {string} id - A string representing the ID of the data model.
     * @returns the result of the `issuersByDataModel_query` method call.
     */
    getIssuersByDataModel(id: string): Promise<import("../../.mesh").issuersByDataModel_queryQuery>;
    /**
     * The function `getIssuersByDataModelCount` retrieves the count of issuers based on a given data model
     * ID.
     * @param {string} dataModelId - The dataModelId parameter is a string that represents the ID of a data
     * model.
     * @returns the result of the `issuersByDataModelCount_query` method call.
     */
    getIssuersByDataModelCount(dataModelId: string): Promise<import("../../.mesh").issuersByDataModelCount_queryQuery>;
    /**
     * The function `getTotalofIssuersByDataModel` retrieves the total number of issuers based on a given
     * data model ID.
     * @param {string} dataModelId - The dataModelId parameter is a string that represents the identifier
     * of a data model. It is used to query the total number of issuers associated with that data model.
     * @returns the result of the `getTotalofIssuersByDataModel_query` method call.
     */
    getTotalofIssuersByDataModel(dataModelId: string): Promise<import("../../.mesh").getTotalofIssuersByDataModel_queryQuery>;
}
