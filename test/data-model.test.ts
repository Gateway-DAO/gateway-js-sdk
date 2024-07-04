import { GraphQLClient } from 'graphql-request';
import { Sdk, getSdk } from '../gatewaySdk/sources/Gateway';

import { DataModel } from '../src/modules/data-model/data-model';
import {
  dataModelCreateStub,
  dataModelStub,
  dataModelMetaDataStub,
} from './stubs/data-model.stub';

import { DataModelMockService } from '../__mocks__/data-model.mock';
import { ValidationService } from '../src/services/validator-service';
import { WalletService } from '../src/services/wallet-service';
import { ethers } from 'ethers';

let sdk: Sdk;
let dataModel: DataModel;
let wallet: ethers.Wallet;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  wallet = ethers.Wallet.createRandom();
  dataModel = new DataModel(
    sdk,
    new ValidationService(),
    {
      apiKey: '',
      token: '',
      url: '',
      walletPrivateKey: wallet.privateKey,
    },
    new WalletService({
      walletPrivateKey: wallet.privateKey,
    }),
  );
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('DATA MODEL CLASS METHODS TESTING', () => {
  it('create data model ', async () => {
    const { createDataModelMock } = DataModelMockService(sdk);

    const { createDataModel } = await dataModel.createDataModel(
      dataModelCreateStub(),
    );

    expect(createDataModel.title).toEqual(dataModelCreateStub().title);
    expect(createDataModelMock).toHaveBeenCalled();
  });

  it('create data model -> throw error ', async () => {
    const { createDataModelMock } = DataModelMockService(sdk);

    expect(
      async () =>
        await dataModel.createDataModel({
          title: '',
          description: '',
          schema: undefined,
        }),
    ).rejects.toThrow(' should be atleast 2 length');
    expect(createDataModelMock).toHaveBeenCalled();
  });

  it('get data model', async () => {
    const { getDataModelMock } = DataModelMockService(sdk);

    const { dataModel: rdataModel } = await dataModel.getDataModel(
      dataModelStub().id,
    );
    expect(rdataModel).toEqual(dataModelStub());
    expect(getDataModelMock).toHaveBeenCalled();
  });

  it('get data model -> throw error', async () => {
    const { getDataModelMock } = DataModelMockService(sdk);

    expect(async () => await dataModel.getDataModel('wrong')).rejects.toThrow(
      'wrong is not valid',
    );
    expect(getDataModelMock).toHaveBeenCalled();
  });

  it('get data models', async () => {
    const { getDataModelsMock } = DataModelMockService(sdk);

    const { dataModels } = await dataModel.getDataModels();

    expect(dataModels.length).toBeGreaterThanOrEqual(0);
    expect(getDataModelsMock).toHaveBeenCalled();
  });

  it('get data models count', async () => {
    const { getDataModelsCountMock } = DataModelMockService(sdk);
    const { dataModelsCount } = await dataModel.getDataModelsCount();

    expect(dataModelsCount).toBeGreaterThanOrEqual(0);
    expect(getDataModelsCountMock).toHaveBeenCalled();
  });

  it('get meta data of data models', async () => {
    const { getDataModelsMetaDataMock } = DataModelMockService(sdk);
    const { dataModelsMetadata } = await dataModel.getDataModelsMetaData();

    expect(dataModelsMetadata).toEqual(dataModelMetaDataStub());
    expect(getDataModelsMetaDataMock).toHaveBeenCalled();
  });

  it('get issuers by data model', async () => {
    const { getIssuersByDataModelMock } = DataModelMockService(sdk);
    const { issuersByDataModel } = await dataModel.getIssuersByDataModel(
      dataModelStub().id,
    );

    expect(issuersByDataModel.length).toBeGreaterThanOrEqual(0);
    expect(getIssuersByDataModelMock).toHaveBeenCalled();
  });

  it('get issuers by data model -> throw error', async () => {
    const { getIssuersByDataModelMock } = DataModelMockService(sdk);
    expect(
      async () => await dataModel.getIssuersByDataModel('wrong'),
    ).rejects.toThrow('wrong is not valid');

    expect(getIssuersByDataModelMock).toHaveBeenCalled();
  });

  it('get isssuers by data model count', async () => {
    const { getIssuersDataModelCountMock } = DataModelMockService(sdk);
    const { issuersByDataModelCount } =
      await dataModel.getIssuersByDataModelCount(dataModelStub().id);

    expect(issuersByDataModelCount).toBeGreaterThanOrEqual(0);
    expect(getIssuersDataModelCountMock).toHaveBeenCalled();
  });

  it('get isssuers by data model count -> throw error', async () => {
    const { getIssuersDataModelCountMock } = DataModelMockService(sdk);
    expect(
      async () => await dataModel.getIssuersByDataModelCount('wrong'),
    ).rejects.toThrow('wrong is not valid');

    expect(getIssuersDataModelCountMock).toHaveBeenCalled();
  });

  it('get total issuers by data model ', async () => {
    const { getTotalofIssuersByDataModelMock } = DataModelMockService(sdk);
    const { getTotalofIssuersByDataModel } =
      await dataModel.getTotalofIssuersByDataModel(dataModelStub().id);

    expect(getTotalofIssuersByDataModel).toBeGreaterThanOrEqual(0);
    expect(getTotalofIssuersByDataModelMock).toHaveBeenCalled();
  });

  it('get total issuers by data model -> throw error ', async () => {
    const { getTotalofIssuersByDataModelMock } = DataModelMockService(sdk);

    expect(
      async () => await dataModel.getTotalofIssuersByDataModel('wrong'),
    ).rejects.toThrow('wrong is not valid');
    expect(getTotalofIssuersByDataModelMock).toHaveBeenCalled();
  });
});
