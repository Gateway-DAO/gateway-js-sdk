import { MediaType } from 'openapi-typescript-helpers';
import {
  Config,
  ModelCreateDataAssetRequest,
  OpenAPIClient,
} from '../../common/types';
import { ValidationService } from '../../services/validator-service';
import { paths } from '../../api';
import { GTWError } from '../../helpers/custom-error';

export class DataAsset {
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

  public async createClaimBasedDataAsset(
    dataAsset: ModelCreateDataAssetRequest,
  ) {
    const { data, error, response } = await this.client.POST('/data-assets', {
      body: dataAsset,
    });

    if (error) {
      throw new GTWError(error, response);
    }

    return data!;
  }

  public async createFileBasedDataAsset() {}

  public async getDataAssetById(id: number) {
    const { data, error, response } = await this.client.GET(
      '/data-assets/{id}',
      {
        params: { path: { id } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data!;
  }

  public async updateDataAsset(id: number) {
    const { data, error, response } = await this.client.PUT(
      '/data-assets/{id}',
      {
        params: { path: { id: id.toString() } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data!;
  }

  public async deleteDataAsset(id: number) {
    const { data, error, response } = await this.client.DELETE(
      '/data-assets/{id}',
      {
        params: { path: { id: id.toString() } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data!;
  }

  public async downloadDataAsset(id: number) {
    const { data, error, response } = await this.client.GET(
      '/data-assets/{id}/download',
      {
        params: { path: { id } },
      },
    );

    if (error) {
      throw new GTWError(error, response);
    }

    return data!;
  }
}
