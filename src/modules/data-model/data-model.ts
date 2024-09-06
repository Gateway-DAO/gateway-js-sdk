import { MediaType } from 'openapi-typescript-helpers';
import { Config, ModelDataModel, OpenAPIClient } from '../../common/types';
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

  async getDataModels(page: number = 1, page_size: number = 10) {
    const { data, error, response } = await this.client.GET('/data-models', {
      params: { query: { page, page_size } },
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data;
  }

  async createDataModel(dataModelInput: ModelDataModel) {
    const { data, error, response } = await this.client.POST('/data-models', {
      body: dataModelInput,
    });

    if (error) {
      throw new GTWError(error, response);
    }
    return data;
  }

  async updateDataModel(dataModelId: number, dataModelInput: ModelDataModel) {
    const { data, error, response } = await this.client.PUT(
      '/data-models/{id}',
      {
        body: dataModelInput,
        params: { path: { id: String(dataModelId) } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data;
  }

  async getDataModelById(dataModelId: number) {
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
}
