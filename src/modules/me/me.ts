import { MediaType } from 'openapi-typescript-helpers';
import { Config, OpenAPIClient } from '../../common/types';
import { ValidationService } from '../../services/validator-service';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';

export class CurrentUser {
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

  async getAccountInfo() {
    const { data, response, error } = await this.client.GET('/accounts/me');

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  async getDataModel(page: number = 1, page_size: number = 10) {
    const { data, response, error } = await this.client.GET('/data-models/me', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  async getDataAssest(page: number = 1, page_size: number = 10) {
    const { data, response, error } = await this.client.GET('/data-assets/me', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data;
  }
}
