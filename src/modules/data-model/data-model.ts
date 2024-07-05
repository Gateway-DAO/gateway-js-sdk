import {
  FilterDataModelInput,
  Sdk,
  DataModelBody,
  dataModelsQueryQueryVariables,
} from '../../../gatewaySdk/sources/Gateway';
import { Config } from '../../common/types';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';
import { WalletService } from '../../services/wallet-service';

export class DataModel {
  private sdk: Sdk;
  private validationService: ValidationService;
  private wallet: WalletService;
  private config: Config;

  constructor(
    sdk: Sdk,
    validationService: ValidationService,
    config: Config,
    wallet: WalletService,
  ) {
    this.sdk = sdk;
    this.validationService = validationService;
    this.wallet = wallet;
    this.config = config;
  }

  /**
   * The function `createDataModelBody` is an asynchronous function that takes a `CreateDataModelInput`
   * object as input and returns a promise that resolves to a `createDataModelMutation` object.
   * @param {CreateDataModelInput} createDataModelBody - The `createDataModelBody` parameter is of type
   * `DataModelBody`. It is an input object that contains the data needed to create a new data
   * model.
   * @returns a Promise that resolves to a value of type `createDataModelMutation`.
   */
  public async createDataModel(createDataModelBody: DataModelBody) {
    try {
      this.validationService.validateObjectProperties(createDataModelBody);
      const { signature, signingKey } =
        await this.wallet.signMessage(createDataModelBody);

      return await this.sdk.createDataModelMutation({
        input: {
          data: createDataModelBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataModel` asynchronously retrieves a data model using an ID after validating the
   * ID as a UUID.
   * @param {string} id - The `id` parameter is a string that represents the identifier of a data model.
   * @returns The `getDataModel` function is returning the result of querying the data model with the
   * provided `id` using the SDK.
   */
  public async getDataModel(id: string) {
    try {
      this.validationService.validateUUID(id);
      return await this.sdk.dataModelQuery({ id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataModels` is an asynchronous function that queries data models and returns the
   * result.
   * @param {dataModelsQueryQueryVariables} variables - The `dataModel` parameter is an object that
   * contains variables for the `dataModelsQuery` query. It is of type `dataModelsQueryQueryVariables`.
   * @returns The `getDataModels` function is returning the result of the `dataModelsQuery` function
   * call.
   */
  public async getDataModels(variables?: dataModelsQueryQueryVariables) {
    try {
      return await this.sdk.dataModelsQuery(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * This TypeScript function asynchronously retrieves the count of data models based on optional filter
   * variables.
   * @param {FilterDataModelInput} [filterVariables] - The `filterVariables` parameter is an optional
   * input of type `FilterDataModelInput` that can be passed to the `getDataModelsCount` function. This
   * parameter is used to filter the data models before counting them. If provided, it will be passed to
   * the `dataModelsCount_query` method
   * @returns The `getDataModelsCount` function is returning the result of the `dataModelsCount_query`
   * method call with the provided `filterVariables` as the filter parameter.
   */
  public async getDataModelsCount(filterVariables?: FilterDataModelInput) {
    try {
      return await this.sdk.dataModelsCountQuery({
        filter: filterVariables,
      });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getDataModelMetaData` is an asynchronous function that retrieves metadata for data
   * models and throws an error if there is any.
   * @returns The `getDataModelMetaData` function is returning the result of the
   * `dataModelsMetadata_query` method call.
   */
  public async getDataModelsMetaData() {
    try {
      return await this.sdk.dataModelsMetadataQuery();
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuersByDataModel` retrieves issuers based on a given data model ID using an SDK.
   * @param {string} id - A string representing the ID of the data model.
   * @returns the result of the `issuersByDataModelQuery` method call.
   */
  public async getIssuersByDataModel(id: string) {
    try {
      this.validationService.validateUUID(id);
      return await this.sdk.issuersByDataModelQuery({ id: id });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuersByDataModelCount` retrieves the count of issuers based on a given data model
   * ID.
   * @param {string} dataModelId - The dataModelId parameter is a string that represents the ID of a data
   * model.
   * @returns the result of the `issuersByDataModelCount_query` method call.
   */
  public async getIssuersByDataModelCount(dataModelId: string) {
    try {
      this.validationService.validateUUID(dataModelId);
      return await this.sdk.issuersByDataModelCountQuery({ id: dataModelId });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getTotalofIssuersByDataModel` retrieves the total number of issuers based on a given
   * data model ID.
   * @param {string} dataModelId - The dataModelId parameter is a string that represents the identifier
   * of a data model. It is used to query the total number of issuers associated with that data model.
   * @returns the result of the `getTotalofIssuersByDataModelQuery` method call.
   */
  public async getTotalofIssuersByDataModel(dataModelId: string) {
    try {
      this.validationService.validateUUID(dataModelId);
      return await this.sdk.getTotalofIssuersByDataModelQuery({ dataModelId });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }
}
