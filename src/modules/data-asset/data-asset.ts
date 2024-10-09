import { MediaType } from 'openapi-typescript-helpers';
import {
  ACLRequest,
  CreateDataAssetRequest,
  HelperPaginatedResponse,
  OpenAPIClient,
  PublicACL,
  PublicDataAsset,
} from '../../common/types';
import { ValidationService } from '../../services/validator-service';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';
import { toRFC3339 } from '../../helpers/helper';
import { ACL } from './acl';

export class DataAsset {
  private client: OpenAPIClient<paths, MediaType>;
  private validationService: ValidationService;
  public acl: ACL;

  constructor(
    client: OpenAPIClient<paths, MediaType>,
    validationService: ValidationService,
  ) {
    this.client = client;
    this.acl = new ACL(client, validationService);
    this.validationService = validationService;
  }

  /**
   * The function creates a structured data asset by making a POST request to a specific endpoint and
   * returns the ID of the created asset.
   * @param {CreateDataAssetRequest} structuredDataAssetBody - The `structuredDataAssetBody` parameter
   * in the `createStructured` function is of type `CreateDataAssetRequest`. This parameter likely
   * contains the structured data asset information needed to create a new data asset.
   * @returns The `id` of the created data asset is being returned.
   */
  public async createStructured(
    structuredDataAssetBody: CreateDataAssetRequest,
  ) {
    const { data, error, response } = await this.client.POST('/data-assets', {
      body: structuredDataAssetBody,
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data.id;
  }

  /**
   * This TypeScript function creates a non-structured data asset with optional ACL and expiration date
   * parameters.
   * @param {string} fileName - The `fileName` parameter is a string that represents the name of the
   * file being uploaded.
   * @param {Buffer} fileBuffer - The `fileBuffer` parameter in the `createNonStructured` function is a
   * Buffer containing the data of the file to be uploaded. It is used to read and store the contents
   * of the file before sending it to the server.
   * @param {ACLRequest} [aclList] - The `aclList` parameter in the `createNonStructured` function is
   * an optional parameter that represents the Access Control List (ACL) for the file being created. It
   * is of type `ACLRequest`, which likely contains information about the permissions and access rights
   * associated with the file. If provided, the
   * @param {Date} [expiration_date] - The `expiration_date` parameter in the `createNonStructured`
   * function is an optional parameter that represents the date when the file should expire. If
   * provided, it is converted to the RFC3339 format using the `toRFC3339` function before appending it
   * to the form data. This allows you
   * @returns The function `createNonStructured` is returning the `id` of the data asset that was
   * created.
   */
  public async createNonStructured(
    fileName: string,
    fileBuffer: Buffer,
    aclList?: ACLRequest,
    expiration_date?: Date,
  ) {
    const formData = new FormData();
    const { extension } = this.validationService.validateFileName(fileName);

    formData.append(
      'data',
      new Blob([fileBuffer], { type: extension }),
      fileName,
    );

    if (aclList) {
      formData.append('acl', JSON.stringify(aclList));
    }
    if (expiration_date) {
      formData.append('expiration_date', toRFC3339(expiration_date));
    }

    const { data, error, response } = await this.client.POST('/data-assets', {
      body: {},
      bodySerializer() {
        return formData;
      },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data.id;
  }

  /**
   * This TypeScript function retrieves data assets created by the user with pagination support.
   * @param {number} [page=1] - The `page` parameter is used to specify the page number of the results
   * you want to retrieve. It defaults to 1 if not provided.
   * @param {number} [page_size=10] - The `page_size` parameter in the `getCreatedByMe` function
   * specifies the number of items to be displayed per page when fetching data assets that were created
   * by the user. By default, it is set to 10, meaning that the function will return a paginated list
   * of up to 10
   * @returns The `getCreatedByMe` function is returning a paginated response of public data assets
   * that were created by the user. The response includes data of type `HelperPaginatedResponse`
   * containing an array of `PublicDataAsset` objects.
   */
  public async getCreatedByMe(page: number = 1, page_size: number = 10) {
    const { data, response, error } = await this.client.GET(
      '/data-assets/created',
      {
        params: { query: { page, page_size } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data as HelperPaginatedResponse<PublicDataAsset[]>;
  }

  /**
   * This TypeScript function retrieves received data assets with pagination parameters.
   * @param {number} [page=1] - The `page` parameter is used to specify the page number of the
   * paginated data that you want to retrieve. It defaults to 1 if not provided.
   * @param {number} [page_size=10] - The `page_size` parameter in the `getReceivedByMe` function
   * specifies the number of items to be displayed per page when fetching received data assets. By
   * default, it is set to 10, meaning that the function will return a maximum of 10 data assets per
   * page unless specified otherwise.
   * @returns The `getReceivedByMe` function is returning a `HelperPaginatedResponse` object containing
   * an array of `PublicDataAsset` objects.
   */
  public async getReceivedByMe(page: number = 1, page_size: number = 10) {
    const { data, response, error } = await this.client.GET(
      '/data-assets/received',
      {
        params: { query: { page, page_size } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data as HelperPaginatedResponse<PublicDataAsset[]>;
  }

  /**
   * This TypeScript function retrieves detailed information about a public data asset using an API
   * call.
   * @param {number} id - The `id` parameter in the `get` function is a number that represents
   * the unique identifier of the data asset you want to retrieve details for.
   * @returns The `get` function is returning a Promise that resolves to a `PublicDataAsset`
   * object. The function makes an asynchronous GET request to fetch details of a data asset with the
   * specified `id`. If there is an error during the request, a `GTWError` is thrown with the error and
   * response details. Otherwise, the function returns the fetched data.
   */
  public async get(id: number): Promise<PublicDataAsset> {
    const { data, error, response } = await this.client.GET(
      '/data-assets/{id}',
      {
        params: { path: { id } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * This TypeScript function updates a structured data asset by making a PUT request to a specific
   * endpoint with the provided data.
   * @param {number} id - The `id` parameter is a number that represents the identifier of the
   * structured data asset that you want to update.
   * @param {CreateDataAssetRequest} structuredDataAssetBody - The `structuredDataAssetBody` parameter
   * in the `updateStructured` function is of type `CreateDataAssetRequest`. This parameter likely
   * contains the structured data that will be used to update a data asset with the specified `id`.
   * @returns The `updateStructured` function is returning a Promise that resolves to a
   * `PublicDataAsset` object.
   */
  public async updateStructured(
    id: number,
    structuredDataAssetBody: CreateDataAssetRequest,
  ): Promise<PublicDataAsset> {
    const { data, error, response } = await this.client.PUT(
      '/data-assets/{id}',
      {
        params: { path: { id } },
        body: structuredDataAssetBody,
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * This TypeScript function updates a non-structured data asset with optional ACL and expiration date
   * parameters.
   * @param {number} id - The `id` parameter in the `updateNonStructured` function is a number
   * representing the identifier of the data asset that you want to update.
   * @param {string} fileName - The `fileName` parameter in the `updateNonStructured` function is a
   * string that represents the name of the file being updated.
   * @param {Buffer} fileBuffer - The `fileBuffer` parameter in the `updateNonStructured` function is a
   * Buffer containing the data of the file to be updated. It is used to read and manipulate the
   * contents of the file before sending it to the server for updating.
   * @param {ACLRequest} [aclList] - The `aclList` parameter in the `updateNonStructured` function is
   * an optional parameter of type `ACLRequest`. It is used to specify the Access Control List (ACL)
   * settings for the file being updated. If provided, the function will include the ACL information in
   * the request payload when updating the
   * @param {Date} [expiration_date] - The `expiration_date` parameter in the `updateNonStructured`
   * function is an optional parameter that represents the date when the data asset will expire. If
   * provided, it will be appended to the form data before making the PUT request to update the data
   * asset. The `expiration_date` is expected to be
   * @returns The `updateNonStructured` method is returning the `data` object after making a PUT
   * request to update a non-structured data asset.
   */
  public async updateNonStructured(
    id: number,
    fileName: string,
    fileBuffer: Buffer,
    aclList?: ACLRequest,
    expiration_date?: Date,
  ) {
    const formData = new FormData();
    const { extension } = this.validationService.validateFileName(fileName);

    formData.append(
      'data',
      new Blob([fileBuffer], { type: extension }),
      fileName,
    );

    if (aclList) {
      formData.append('acl', JSON.stringify(aclList));
    }
    if (expiration_date) {
      formData.append('expiration_date', toRFC3339(expiration_date));
    }

    const { data, error, response } = await this.client.PUT(
      '/data-assets/{id}',
      {
        params: { path: { id } },
        body: {},
        bodySerializer() {
          return formData;
        },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * This TypeScript function deletes a data asset by its ID using an HTTP DELETE request.
   * @param {number} id - The `id` parameter in the `delete` function is a number that represents the
   * unique identifier of the data asset that you want to delete.
   * @returns The `delete` method is returning the message from the `data` object after making a DELETE
   * request to the specified endpoint.
   */
  public async delete(id: number) {
    const { data, error, response } = await this.client.DELETE(
      '/data-assets/{id}',
      {
        params: { path: { id } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data.message!;
  }

  // todo: check for structured and check if data asset not found
  /**
   * This TypeScript function downloads a file associated with a given ID and returns the file as a
   * Blob along with its filename.
   * @param {number} id - The `id` parameter is a number used to identify the specific data asset that
   * needs to be downloaded. It is passed to the `download` method to retrieve the file associated with
   * that particular ID.
   * @returns The `download` function returns a Promise that resolves to an object with two properties:
   * `file` which is a Blob containing the downloaded file data, and `fileName` which is a string
   * representing the name of the file.
   */
  public async download(id: number): Promise<{ file: Blob; fileName: string }> {
    const { name } = await this.get(id);

    const {
      data: file,
      error,
      response,
    } = await this.client.GET('/data-assets/{id}/download', {
      params: { path: { id } },
      parseAs: 'blob',
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return { file, fileName: name };
  }

  /**
   * The `share` function in TypeScript asynchronously shares a data asset with specified wallet
   * addresses and returns a Promise of PublicACL array.
   * @param {number} id - The `id` parameter is a number that represents the identifier of a data asset
   * that you want to share.
   * @param {string[]} walletAddressList - The `walletAddressList` parameter is an array of strings
   * representing the wallet addresses to which the data asset with the specified `id` will be shared.
   * @returns The `share` function is returning a Promise that resolves to an array of `PublicACL`
   * objects.
   */
  public async share(
    id: number,
    walletAddressList: string[],
  ): Promise<PublicACL[]> {
    const { data, error, response } = await this.client.POST(
      '/data-assets/{id}/share',
      {
        params: { path: { id } },
        body: { addresses: walletAddressList },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }
}
