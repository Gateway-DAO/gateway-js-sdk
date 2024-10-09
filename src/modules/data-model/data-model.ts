import { MediaType } from 'openapi-typescript-helpers';
import {
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

  constructor(
    client: OpenAPIClient<paths, MediaType>,
    validationService: ValidationService,
  ) {
    this.client = client;
    this.validationService = validationService;
  }
  /**
   * This async function retrieves a paginated list of data models from a server using GET request.
   * @param {number} [page=1] - The `page` parameter in the `getAll` function is used to specify the page
   * number of the data to retrieve. By default, it is set to 1 if not provided when calling the
   * function.
   * @param {number} [page_size=10] - The `page_size` parameter in the `getAll` function specifies the
   * number of items to be displayed per page when fetching data from the `/data-models` endpoint. By
   * default, it is set to 10, meaning that the API will return a maximum of 10 data items per page
   * unless
   * @returns The `getAll` function is returning a `HelperPaginatedResponse` object containing data of
   * type `DataModelType`.
   */

  async getAll(page: number = 1, page_size: number = 10) {
    const { data, error, response } = await this.client.GET('/data-models', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data as HelperPaginatedResponse<DataModelType>;
  }

  /**
   * This TypeScript function creates a new data model by sending a POST request to a specified endpoint.
   * @param {DataModelRequest} dataModelInput - The `dataModelInput` parameter in the `create` function
   * is of type `DataModelRequest`. This parameter likely contains the data needed to create a new data
   * model, such as the attributes and properties of the data model.
   * @returns The `create` method is returning a Promise that resolves to a `DataModelType` object. The
   * method makes a POST request to the '/data-models' endpoint with the `dataModelInput` as the request
   * body. If there is an error during the POST request, a `GTWError` is thrown with the error and
   * response details. Otherwise, the method returns the `data`
   */
  async create(dataModelInput: DataModelRequest): Promise<DataModelType> {
    const { data, error, response } = await this.client.POST('/data-models', {
      body: dataModelInput,
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data!;
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
   * This function asynchronously retrieves a data model by its ID using a GET request.
   * @param {number} dataModelId - The `dataModelId` parameter is a number that represents the unique
   * identifier of a data model. This identifier is used to retrieve a specific data model from the
   * server.
   * @returns The `getById` function is returning a Promise that resolves to a `DataModelType` object.
   * The function makes an asynchronous GET request to retrieve a data model by its ID, and if
   * successful, it returns the data model. If there is an error during the request, it throws a
   * `GTWError` with the error and response details.
   */
  async getById(dataModelId: number): Promise<DataModelType> {
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
   * This TypeScript function asynchronously retrieves paginated data models specific to the current
   * user.
   * @param {number} [page=1] - The `page` parameter in the `getMy` function is used to specify the page
   * number of the data to retrieve. By default, it is set to 1 if not provided.
   * @param {number} [page_size=10] - The `page_size` parameter in the `getMy` function specifies the
   * number of items to be displayed per page when fetching data from the endpoint `/data-models/me`. By
   * default, if not provided, the `page_size` is set to 10. This means that the API will return
   * @returns The `getMy` function returns a `HelperPaginatedResponse` object containing data of type
   * `DataModelType`.
   */
  async getMy(page: number = 1, page_size: number = 10) {
    const { data, response, error } = await this.client.GET('/data-models/me', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data as HelperPaginatedResponse<DataModelType>;
  }
}
