import { MediaType } from 'openapi-typescript-helpers';
import { paths } from '../../api';
import { OpenAPIClient, ACLRequest, PublicACL } from '../../common/types';
import { GTWError } from '../../helpers/custom-error';
import { ValidationService } from '../../services/validator-service';

export class ACL {
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
   * This TypeScript function updates the Access Control List (ACL) for a specific data asset
   * identified by its ID.
   * @param {number} id - The `id` parameter is a number that represents the identifier of a data asset
   * for which the Access Control List (ACL) is being updated.
   * @param {ACLRequest[]} aclList - The `aclList` parameter in the `update` function is an array of
   * `ACLRequest` objects. These objects likely contain information related to access control lists
   * (ACLs) for a specific data asset identified by the `id` parameter. The function sends a PATCH
   * request to update the ACLs
   * @returns The `update` method is returning a Promise that resolves to an array of `PublicACL`
   * objects.
   */
  public async update(id: number, aclList: ACLRequest[]): Promise<PublicACL[]> {
    const { data, error, response } = await this.client.PATCH(
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

  /**
   * Note:- this method overwrites ACL list for data asset so be sure before using it!
   * This TypeScript function adds ACL entries for a specific data asset identified by its ID.
   * @param {number} id - The `id` parameter is a number that represents the identifier of a data asset
   * to which the Access Control List (ACL) will be added.
   * @param {ACLRequest[]} aclList - The `aclList` parameter in the `add` method is an array of
   * `ACLRequest` objects. Each `ACLRequest` object likely contains information related to access
   * control for a specific data asset identified by the `id` parameter. The `add` method sends a POST
   * request to add the
   * @returns The `add` method is returning a Promise that resolves to an array of `PublicACL` objects.
   */
  public async add(id: number, aclList: ACLRequest[]): Promise<PublicACL[]> {
    const { data, error, response } = await this.client.POST(
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

  /**
   * This TypeScript function deletes ACL entries for a specific data asset using a PATCH request.
   * @param {number} id - The `id` parameter in the `delete` function is a number that represents the
   * identifier of the data asset that you want to delete the ACL (Access Control List) for.
   * @param {ACLRequest[]} aclList - The `aclList` parameter in the `delete` function is an array of
   * `ACLRequest` objects. Each `ACLRequest` object likely contains information about access control
   * permissions for a specific resource or data asset. The function uses this array to specify which
   * access control entries should be deleted for the data
   * @returns the message from the `data` object, which is accessed using `data.message`.
   */
  public async delete(id: number, aclList: ACLRequest[]) {
    const { data, error, response } = await this.client.PATCH(
      '/data-assets/{id}/acl/delete',
      {
        params: { path: { id } },
        body: aclList,
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data.message!;
  }
}
