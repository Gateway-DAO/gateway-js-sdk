import { MediaType } from 'openapi-typescript-helpers';
import {
  ACLRequest,
  OpenAPIClient,
  PublicACL,
  PublicDataAsset,
} from '../../common/types';
import { ValidationService } from '../../services/validator-service';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';

export class DataAsset {
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
   * This function creates a data asset based on a provided request using a POST request.
   * @param {CreateDataAssetRequest} dataAsset - The `dataAsset` parameter in the
   * `createClaimBasedDataAsset` function is of type `CreateDataAssetRequest`. This parameter likely
   * contains the necessary information needed to create a new data asset, such as metadata,
   * permissions, and other relevant details.
   * @returns The `data` variable is being returned from the `createClaimBasedDataAsset` function.
   */
  public async createClaimBasedDataAsset() {
    const { data, error, response } = await this.client.POST('/data-assets', {
      body: { data: '' },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  public async createFileBasedDataAsset() {}

  /**
   * This TypeScript function retrieves a public data asset by its ID asynchronously.
   * @param {number} id - The `id` parameter in the `getDataAssetById` function is a number that
   * represents the unique identifier of the data asset you want to retrieve. This function is designed
   * to fetch a specific data asset by its ID from the server.
   * @returns The `getDataAssetById` function is returning a Promise that resolves to a
   * `PublicDataAsset` object. The function makes an asynchronous GET request to fetch data for a
   * specific data asset identified by the `id` parameter. If there is an error during the request, a
   * `GTWError` is thrown with the error and response details. Otherwise, the function returns the
   * fetched data.
   */
  public async getDataAssetById(id: number): Promise<PublicDataAsset> {
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
   * This TypeScript function asynchronously retrieves data assets belonging to the current user with
   * optional pagination parameters.
   * @param {number} [page=1] - The `page` parameter is used to specify the page number of the data
   * assets you want to retrieve. By default, it is set to 1, meaning that the function will retrieve
   * data assets from the first page.
   * @param {number} [page_size=10] - The `page_size` parameter in the `getMyDataAssets` function
   * specifies the number of data assets to be retrieved per page. In this case, the default value for
   * `page_size` is set to 10, meaning that by default, the function will retrieve 10 data assets per
   * page
   * @returns The `getMyDataAssets` function returns the data fetched from the API endpoint
   * `/data-assets/me` for the authenticated user. If there is an error during the API request, a
   * `GTWError` is thrown with the error and response details. If the request is successful, the
   * function returns the fetched data.
   */
  async getMyDataAssets(page: number = 1, page_size: number = 10) {
    const { data, response, error } = await this.client.GET('/data-assets/me', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data;
  }

  public async updateDataAsset(id: number): Promise<PublicDataAsset> {
    const { data, error, response } = await this.client.PUT(
      '/data-assets/{id}',
      {
        params: { path: { id } },
        body: {},
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  /**
   * This function deletes a data asset by its ID using an HTTP DELETE request.
   * @param {number} id - The `id` parameter in the `deleteDataAsset` function is a number that
   * represents the unique identifier of the data asset that you want to delete.
   * @returns The `deleteDataAsset` function is returning the message from the `data` object, which is
   * accessed using `data.message`.
   */
  public async deleteDataAsset(id: number) {
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

  /**
   * This function updates the Access Control List (ACL) for a specific data asset identified by its
   * ID.
   * @param {number} id - The `id` parameter is a number that represents the identifier of the data
   * asset for which the Access Control List (ACL) is being updated.
   * @param {ACLRequest[]} aclList - The `aclList` parameter in the `updateACL` function is an array of
   * `ACLRequest` objects. Each `ACLRequest` object typically contains information about access control
   * settings for a specific resource or data asset. These settings may include permissions, roles,
   * users, or groups that are allowed or
   * @returns the message from the `data` object, which is accessed using `data.message!`.
   */
  public async updateACL(
    id: number,
    aclList: ACLRequest[],
  ): Promise<PublicACL[]> {
    const { data, error, response } = await this.client.PUT(
      '/data-assets/{id}/acl',
      {
        params: { path: { id } },
        body: aclList,
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  // todo: check for structured
  /**
   * This function downloads a data asset file by its ID and returns the file as a Blob along with its
   * filename.
   * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
   * data asset that you want to download.
   * @returns The `downloadDataAsset` function returns a Promise that resolves to an object with two
   * properties: `file` which is a Blob containing the downloaded data asset file, and `fileName` which
   * is a string representing the name of the data asset file.
   */
  public async downloadDataAsset(
    id: number,
  ): Promise<{ file: Blob; fileName: string }> {
    const { name } = await this.getDataAssetById(id);

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

    return { file, fileName: name! };
  }
}
