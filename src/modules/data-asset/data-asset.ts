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
   * The function `upload` asynchronously uploads data assets and returns the ID of the uploaded asset.
   * @param {CreateDataAssetRequest} uploadBody - The `uploadBody` parameter in the `upload` function is
   * of type `CreateDataAssetRequest`. It contains the data necessary to create a new data asset, such
   * as the asset's name, description, tags, and any other relevant information required for the
   * creation process.
   * @returns The `id` of the uploaded data asset is being returned.
   */
  public async upload(uploadBody: CreateDataAssetRequest) {
    const { data, error, response } = await this.client.POST('/data-assets', {
      body: uploadBody,
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data.id;
  }

  /**
   * The function `uploadFile` asynchronously uploads a file with optional ACL settings and expiration
   * date using FormData in TypeScript.
   * @param {string} fileName - The `fileName` parameter is a string that represents the name of the
   * file being uploaded.
   * @param {Buffer} fileBuffer - The `fileBuffer` parameter in the `uploadFile` function is a Buffer
   * containing the data of the file to be uploaded. It is the actual content of the file that will be
   * uploaded to the server.
   * @param {ACLRequest[]} [aclList] - The `aclList` parameter in the `uploadFile` function is an
   * optional parameter that accepts an array of ACLRequest objects. These objects define the access
   * control list for the uploaded file, specifying which users or groups have permission to access the
   * file and the level of access they have. If provided,
   * @param {Date} [expiration_date] - The `expiration_date` parameter in the `uploadFile` function is
   * an optional parameter that specifies the date when the uploaded file should expire. If provided,
   * the file will no longer be accessible after this expiration date.
   * @returns The `uploadFile` function is returning the `id` of the uploaded file.
   */
  public async uploadFile(
    fileName: string,
    fileBuffer: Buffer,
    aclList?: ACLRequest[],
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
   * This TypeScript function updates a data asset with the provided ID and body, returning the updated
   * asset.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * data asset that you want to update.
   * @param {CreateDataAssetRequest} updateAssetBody - The `updateAssetBody` parameter in the `update`
   * method is of type `CreateDataAssetRequest`. It likely contains the data necessary to update a data
   * asset, such as the new values for the asset properties.
   * @returns The `update` method returns a Promise that resolves to a `PublicDataAsset` object.
   */
  public async update(
    id: number,
    updateAssetBody: CreateDataAssetRequest,
  ): Promise<PublicDataAsset> {
    const { data, error, response } = await this.client.PUT(
      '/data-assets/{id}',
      {
        params: { path: { id } },
        body: updateAssetBody,
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * The function `updateFile` asynchronously updates a file with specified parameters like file name,
   * buffer, ACL list, and expiration date.
   * @param {number} id - The `id` parameter in the `updateFile` function is a number that represents
   * the identifier of the file that you want to update. It is used to specify which file should be
   * updated with the new data provided in the function.
   * @param {string} fileName - The `fileName` parameter in the `updateFile` function represents the
   * name of the file that you want to update. It is a string value that specifies the name of the
   * file.
   * @param {Buffer} fileBuffer - The `fileBuffer` parameter in the `updateFile` function is a Buffer
   * that contains the data of the file to be updated. It is a binary representation of the file
   * content, typically used for reading or writing binary data in Node.js. In this function, the
   * `fileBuffer` is used
   * @param {ACLRequest[]} [aclList] - The `aclList` parameter in the `updateFile` function is an
   * optional parameter that represents a list of Access Control List (ACL) requests. It is used to
   * specify the permissions or access rights for the file being updated. If provided, the function
   * will include this ACL information in the request to
   * @param {Date} [expiration_date] - The `expiration_date` parameter in the `updateFile` function is
   * an optional parameter that represents the date when the file should expire. If provided, the file
   * will be set to expire on the specified date. This parameter accepts a `Date` object as its value.
   * If this parameter is not provided
   * @returns The `updateFile` function is returning the `data` object after making a PUT request to
   * update a file.
   */
  public async updateFile(
    id: number,
    fileName: string,
    fileBuffer: Buffer,
    aclList?: ACLRequest[],
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
