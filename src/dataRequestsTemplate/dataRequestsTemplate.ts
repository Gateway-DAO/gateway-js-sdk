import {
  FilterDataRequestTemplateInput,
  Sdk,
  TemplateSchemaInput,
  dataRequestTemplates_queryQueryVariables,
} from '../../gatewaySdk';
import { errorHandler } from '../utils/errorHandler';
import { isUUIDValid, validateObjectProperties } from '../utils/validators';

export class DataRequestTemplate {
  public sdk: Sdk;

  constructor(sdk: Sdk) {
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
  async createDataRequestTemplate(templateInput: TemplateSchemaInput) {
    try {
      validateObjectProperties(templateInput);
      return await this.sdk.createDataRequestTemplate_mutation({
        input: templateInput,
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataRequestTemplate` is an asynchronous function that queries a data request
   * template using an ID and returns the result.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * data request template that you want to retrieve.
   * @returns the result of the `dataRequestTemplate_query` method call, which is a Promise.
   */
  async getDataRequestTemplate(id: string) {
    try {
      isUUIDValid(id);
      return await this.sdk.dataRequestTemplate_query({ id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataRequestTemplates` retrieves data request templates based on the provided
   * filter, order, skip, and take parameters.
   * @param  - - `filter` is an optional parameter of type `FilterDataRequestTemplateInput` that allows
   * you to specify conditions to filter the data request templates.
   * @returns the result of the `dataRequestTemplates_query` method call, which is a Promise
   * that resolves to the data request templates.
   */
  async getDataRequestTemplates(
    variables?: dataRequestTemplates_queryQueryVariables,
  ) {
    try {
      return await this.sdk.dataRequestTemplates_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataRequestsTemplateCount` is an asynchronous function that retrieves the count
   * of data request templates based on an optional filter.
   * @param {FilterDataRequestTemplateInput} [filter] - The `filter` parameter is an optional input
   * that allows you to specify criteria for filtering the data request templates. It is of type
   * `FilterDataRequestTemplateInput`.
   * @returns the count of data request templates.
   */
  async getDataRequestsTemplateCount(filter?: FilterDataRequestTemplateInput) {
    try {
      return (await this.sdk.dataRequestTemplatesCount_query({ filter }))
        .dataRequestTemplatesCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataRequestsTemplatesMetadata` gets metadat of template
   * to the SDK and returns the result, or throws an error if something goes wrong.
   * @returns the result of the `dataRequestTemplatesMetadata_queryQuery` method call.
   */
  async getDataRequestsTemplatesMetadata() {
    try {
      return await this.sdk.dataRequestTemplatesMetadata_query();
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getVerifiersByDataRequestTemplate` gets verifier for a data request template
   * to the SDK and returns the result, or throws an error if something goes wrong.
   * @param {string} id - The variables is a id of the template
   * @returns the result of the `verifiersByDataRequestTemplate_queryQuery` method call.
   */
  async getVerifiersByDataRequestTemplate(id: string) {
    try {
      isUUIDValid(id);
      return await this.sdk.verifiersByDataRequestTemplate_query({ id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getVerifiersByDataRequestTemplateCount` gets count of recently made transactions
   * to the SDK and returns the result, or throws an error if something goes wrong.
   * @param {string} id - The variables is a id of the template
   * @returns the result of the `verifiersByDataRequestTemplateCount_queryQuery` method call.
   */
  async getVerifiersByDataRequestTemplateCount(id: string) {
    try {
      isUUIDValid(id);
      return (await this.sdk.verifiersByDataRequestTemplateCount_query({ id }))
        .verifiersByDataRequestTemplateCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
