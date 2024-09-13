import { MediaType } from 'openapi-typescript-helpers';
import { OpenAPIClient, MyAccountResponse } from '../../common/types';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';

export class Account {
  private client: OpenAPIClient<paths, MediaType>;

  constructor(client: OpenAPIClient<paths, MediaType>) {
    this.client = client;
  }

  /**
   * This async function retrieves account information by making a GET request to '/accounts/me' and
   * handles errors by throwing a custom GTWError if any occur.
   * @returns The `getAccountInfo` function is returning the `data` object fetched from the
   * `/accounts/me` endpoint. If there is an error during the API call, a `GTWError` is thrown with the
   * error and response details.
   */
  async getAccountInfo(): Promise<MyAccountResponse> {
    const { data, response, error } = await this.client.GET('/accounts/me');

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }
}
