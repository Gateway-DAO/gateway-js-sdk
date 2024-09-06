import { MediaType } from 'openapi-typescript-helpers';
import {
  Config,
  ModelCreateDataAssetRequest,
  OpenAPIClient,
} from '../../common/types';
import { ValidationService } from '../../services/validator-service';
import { paths } from '../../api';

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
    const { data } = await this.client.POST('/data-assets', {
      body: dataAsset,
    });

    return data!;
  }

  public async createFileBasedDataAsset() {}

  public async getDataAssetById(id: number) {
    const { data } = await this.client.GET('/data-assets/{id}', {
      params: { path: { id } },
    });

    return data!;
  }

  public async updateDataAsset(id: number) {
    const { data } = await this.client.PUT('/data-assets/{id}', {
      params: { path: { id: id.toString() } },
    });

    return data!;
  }

  public async deleteDataAsset(id: number) {
    const { data } = await this.client.DELETE('/data-assets/{id}', {
      params: { path: { id: id.toString() } },
    });

    return data!;
  }

  public async downloadDataAsset(id: number) {
    const { data } = await this.client.GET('/data-assets/{id}/download', {
      params: { path: { id } },
    });

    return data!;
  }
}
