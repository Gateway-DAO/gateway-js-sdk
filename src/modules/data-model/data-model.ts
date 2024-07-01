import {
  FilterDataModelInput,
  Sdk,
  dataModels_queryQueryVariables,
  CreateDataModelInput,
} from '../../../gatewaySdk/sources/Gateway';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';

export class DataModel {
  private sdk: Sdk;
  private validationService: ValidationService;

  constructor(sdk: Sdk, validationService: ValidationService) {
    this.sdk = sdk;
    this.validationService = validationService;
  }

  /**
   * The function `createModelInput` is an asynchronous function that takes a `CreateDataModelInput`
   * object as input and returns a promise that resolves to a `createDataModel_mutationMutation` object.
   * @param {CreateDataModelInput} createModelInput - The `createModelInput` parameter is of type
   * `CreateDataModelInput`. It is an input object that contains the data needed to create a new data
   * model.
   * @returns a Promise that resolves to a value of type `createDataModel_mutationMutation`.
   */
  public async createDataModel(createModelInput: CreateDataModelInput) {
    try {
      this.validationService.validateObjectProperties(createModelInput.data);

      return await this.sdk.createDataModel_mutation({
        input: createModelInput,
      });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataModel` asynchronously retrieves a data model using an ID after validating the
   * ID as a UUID.
   * @param {string} id - The `id` parameter is a string that represents the identifier of a data model.
   * @returns The `getDataModel` function is returning the result of querying the data model with the
   * provided `id` using the SDK.
   */
  public async getDataModel(id: string) {
    try {
      this.validationService.validateUUID(id);
      return await this.sdk.dataModel_query({ id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataModels` is an asynchronous function that queries data models and returns the
   * result.
   * @param {dataModels_queryQueryVariables} dataModel - The `dataModel` parameter is an object that
   * contains variables for the `dataModels_query` query. It is of type `dataModels_queryQueryVariables`.
   * @returns The `getDataModels` function is returning the result of the `dataModels_query` function
   * call.
   */
  public async getDataModels(variables?: dataModels_queryQueryVariables) {
    try {
      return await this.sdk.dataModels_query(variables);
    } catch (error) {
      console.log(error);
      throw new Error(errorHandler(error));
    }
  }

  /**
   * This TypeScript function asynchronously retrieves the count of data models based on optional filter
   * variables.
   * @param {FilterDataModelInput} [filterVariables] - The `filterVariables` parameter is an optional
   * input of type `FilterDataModelInput` that can be passed to the `getDataModelsCount` function. This
   * parameter is used to filter the data models before counting them. If provided, it will be passed to
   * the `dataModelsCount_query` method
   * @returns The `getDataModelsCount` function is returning the result of the `dataModelsCount_query`
   * method call with the provided `filterVariables` as the filter parameter.
   */
  public async getDataModelsCount(filterVariables?: FilterDataModelInput) {
    try {
      return await this.sdk.dataModelsCount_query({
        filter: filterVariables,
      });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataModelMetaData` is an asynchronous function that retrieves metadata for data
   * models and throws an error if there is any.
   * @returns The `getDataModelMetaData` function is returning the result of the
   * `dataModelsMetadata_query` method call.
   */
  public async getDataModelsMetaData() {
    try {
      return await this.sdk.dataModelsMetadata_query();
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuersByDataModel` retrieves issuers based on a given data model ID using an SDK.
   * @param {string} id - A string representing the ID of the data model.
   * @returns the result of the `issuersByDataModel_query` method call.
   */
  public async getIssuersByDataModel(id: string) {
    try {
      this.validationService.validateUUID(id);
      return await this.sdk.issuersByDataModel_query({ id: id });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuersByDataModelCount` retrieves the count of issuers based on a given data model
   * ID.
   * @param {string} dataModelId - The dataModelId parameter is a string that represents the ID of a data
   * model.
   * @returns the result of the `issuersByDataModelCount_query` method call.
   */
  public async getIssuersByDataModelCount(dataModelId: string) {
    try {
      this.validationService.validateUUID(dataModelId);
      return await this.sdk.issuersByDataModelCount_query({ id: dataModelId });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getTotalofIssuersByDataModel` retrieves the total number of issuers based on a given
   * data model ID.
   * @param {string} dataModelId - The dataModelId parameter is a string that represents the identifier
   * of a data model. It is used to query the total number of issuers associated with that data model.
   * @returns the result of the `getTotalofIssuersByDataModel_query` method call.
   */
  public async getTotalofIssuersByDataModel(dataModelId: string) {
    try {
      this.validationService.validateUUID(dataModelId);
      return await this.sdk.getTotalofIssuersByDataModel_query({ dataModelId });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }
}
