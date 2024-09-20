import { MediaType } from 'openapi-typescript-helpers';
import {
  Config,
  DataModelRequest,
  HelperPaginatedResponse,
  OpenAPIClient,
  DataModel as DataModelType,
} from '../../common/types';
import { ValidationService } from '../../services/validator-service';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';

export class DataModel {
  private client: OpenAPIClient<paths, MediaType>;
  private validationService: ValidationService;
  private config: Config;

  constructor(
    client: OpenAPIClient<paths, MediaType>,
    validationService: ValidationService,
    config: Config,
  ) {
    this.client = client;
    this.validationService = validationService;
    this.config = config;
  }

  /**
   * This TypeScript function asynchronously fetches data models from a server using GET request with
   * optional pagination parameters.
   * @param {number} [page=1] - The `page` parameter is used to specify the page number of the data
   * models to retrieve. By default, it is set to 1, meaning that the function will retrieve the data
   * models from the first page.
   * @param {number} [page_size=10] - The `page_size` parameter in the `getDataModels` function
   * specifies the number of data models to be retrieved per page. By default, it is set to 10, meaning
   * that when the function is called without providing a specific `page_size` value, it will retrieve
   * 10 data models per
   * @returns The `getDataModels` function is returning the data fetched from the API endpoint
   * `/data-models` with the specified pagination parameters `page` and `page_size`. If there is an
   * error during the API request, a `GTWError` is thrown with the error and response details. If there
   * is no error, the function returns the fetched data.
   */
  async getDataModels(page: number = 1, page_size: number = 10) {
    const { data, error, response } = await this.client.GET('/data-models', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data as HelperPaginatedResponse<DataModelType>;
  }

  /**
   * This TypeScript function creates a data model by sending a POST request to a specified endpoint.
   * @param {DataModelRequest} dataModelInput - The `dataModelInput` parameter in the `createDataModel`
   * function is of type `DataModelRequest`. It is the input data that will be used to create a new
   * data model. This input likely contains information such as the name, fields, and other properties
   * of the data model that will
   * @returns The `createDataModel` function is returning the `data` object after making a POST request
   * to create a data model.
   */
  async createDataModel(
    dataModelInput: DataModelRequest,
  ): Promise<DataModelType> {
    const { data, error, response } = await this.client.POST('/data-models', {
      body: dataModelInput,
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data;
  }

  /**
   * This TypeScript function updates a data model using a PUT request with error handling.
   * @param {number} dataModelId - The `dataModelId` parameter is the unique identifier of the data
   * model that you want to update. It is a number that specifies which data model in the system you
   * are targeting for the update operation.
   * @param {DataModelRequest} dataModelInput - The `dataModelInput` parameter in the `updateDataModel`
   * function is of type `DataModelRequest`. It is the data that will be used to update the data model
   * with the specified `dataModelId`.
   * @returns The `updateDataModel` function is returning the updated data model after making a PUT
   * request to the server with the provided `dataModelInput` for the specified `dataModelId`.
   */
  async updateDataModel(
    dataModelId: number,
    dataModelInput: DataModelRequest,
  ): Promise<DataModelType> {
    const { data, error, response } = await this.client.PUT(
      '/data-models/{id}',
      {
        body: dataModelInput,
        params: { path: { id: dataModelId } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * This TypeScript function asynchronously fetches a data model by its ID using a GET request.
   * @param {number} dataModelId - The `dataModelId` parameter is a number that represents the unique
   * identifier of a data model. This function `getDataModelById` is an asynchronous function that
   * retrieves a data model by its ID using an HTTP GET request to a specific endpoint. It uses the
   * `dataModelId` parameter to specify
   * @returns The `getDataModelById` function is returning the data fetched from the API endpoint for
   * the specified `dataModelId`. If there is an error during the API request, it will throw a
   * `GTWError` with the error and response details. If there is no error, it will return the retrieved
   * data.
   */
  async getDataModelById(dataModelId: number): Promise<DataModelType> {
    const { data, error, response } = await this.client.GET(
      '/data-models/{id}',
      {
        params: { path: { id: dataModelId } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }
    return data;
  }

  /**
   * This TypeScript function retrieves data models specific to the current user with optional
   * pagination parameters.
   * @param {number} [page=1] - The `page` parameter in the `getMyDataModels` function is used to
   * specify the page number of the data models to retrieve. By default, it is set to 1 if not
   * provided.
   * @param {number} [page_size=10] - The `page_size` parameter in the `getMyDataModels` function
   * specifies the number of data models to be retrieved per page. By default, it is set to 10, meaning
   * that the function will retrieve 10 data models per page unless specified otherwise.
   * @returns The `getMyDataModels` function returns the data fetched from the API endpoint
   * `/data-models/me` based on the provided `page` and `page_size` parameters. If there is an error
   * during the API request, a `GTWError` is thrown with the error and response details. If the request
   * is successful, the function returns the retrieved data.
   */
  async getMyDataModels(page: number = 1, page_size: number = 10) {
    const { data, response, error } = await this.client.GET('/data-models/me', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data as HelperPaginatedResponse<DataModelType>;
  }
}
