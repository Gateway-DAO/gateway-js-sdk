import { MediaType } from 'openapi-typescript-helpers';
import { OpenAPIClient } from '../../common/types';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';

export class Account {
  private client: OpenAPIClient<paths, MediaType>;

  constructor(client: OpenAPIClient<paths, MediaType>) {
    this.client = client;
  }

  async getAccountInfo() {
    const { data, response, error } = await this.client.GET('/accounts/me');

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }
}
