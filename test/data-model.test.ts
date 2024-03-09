import { getSdk } from '../gatewaySdk';
import { DataModel } from '../src/data-model/data-model';
import {
  dataModelCreateStub,
  dataModelStub,
  dataModelMetaDataStub,
} from './stubs/dataModel.stub';
import { DataModelMockService } from '../__mocks__/dataModel.mock';
import { GraphQLClient } from 'graphql-request';

let dataModel: DataModel;

beforeAll(() => {
  dataModel = new DataModel(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('DATA MODEL CLASS METHODS TESTING', () => {
  it('create data model ', async () => {
    const { createDataModelMock } = DataModelMockService(dataModel);

    const { createDataModel } = await dataModel.createDataModel(
      dataModelCreateStub(),
    );

    expect(createDataModel.title).toEqual(dataModelCreateStub().title);
    expect(createDataModelMock).toHaveBeenCalled();
  });

  it('create data model -> throw error ', async () => {
    const { createDataModelMock } = DataModelMockService(dataModel);

    expect(
      async () =>
        await dataModel.createDataModel({
          ...dataModelCreateStub(),
          title: '',
        }),
    ).rejects.toThrow(' should be atleast 2 length');
    expect(createDataModelMock).toHaveBeenCalled();
  });

  it('get data model', async () => {
    const { getDataModelMock } = DataModelMockService(dataModel);

    const { dataModel: rdataModel } = await dataModel.getDataModel(
      dataModelStub().id,
    );
    expect(rdataModel).toEqual(dataModelStub());
    expect(getDataModelMock).toHaveBeenCalled();
  });

  it('get data model -> throw error', async () => {
    const { getDataModelMock } = DataModelMockService(dataModel);

    expect(async () => await dataModel.getDataModel('wrong')).rejects.toThrow(
      'wrong is not valid',
    );
    expect(getDataModelMock).toHaveBeenCalled();
  });

  it('get data models', async () => {
    const { getDataModelsMock } = DataModelMockService(dataModel);

    const { dataModels } = await dataModel.getDataModels();

    expect(dataModels.length).toBeGreaterThanOrEqual(0);
    expect(getDataModelsMock).toHaveBeenCalled();
  });

  it('get data models count', async () => {
    const { getDataModelsCountMock } = DataModelMockService(dataModel);
    const { dataModelsCount } = await dataModel.getDataModelsCount();
    expect(dataModelsCount).toBeGreaterThanOrEqual(0);
    expect(getDataModelsCountMock).toHaveBeenCalled();
  });

  it('get meta data of data models', async () => {
    const { getDataModelsMetaDataMock } = DataModelMockService(dataModel);
    const { dataModelsMetadata } = await dataModel.getDataModelsMetaData();
    expect(dataModelsMetadata).toEqual(dataModelMetaDataStub());
    expect(getDataModelsMetaDataMock).toHaveBeenCalled();
  });

  it('get issuers by data model', async () => {
    const { getIssuersByDataModelMock } = DataModelMockService(dataModel);
    const { issuersByDataModel } = await dataModel.getIssuersByDataModel(
      dataModelStub().id,
    );

    expect(issuersByDataModel.length).toBeGreaterThanOrEqual(0);
    expect(getIssuersByDataModelMock).toHaveBeenCalled();
  });

  it('get issuers by data model -> throw error', async () => {
    const { getIssuersByDataModelMock } = DataModelMockService(dataModel);
    expect(
      async () => await dataModel.getIssuersByDataModel('wrong'),
    ).rejects.toThrow('wrong is not valid');
    expect(getIssuersByDataModelMock).toHaveBeenCalled();
  });

  it('get isssuers by data model count', async () => {
    const { getIssuersDataModelCountMock } = DataModelMockService(dataModel);
    const { issuersByDataModelCount } =
      await dataModel.getIssuersByDataModelCount(dataModelStub().id);
    expect(issuersByDataModelCount).toBeGreaterThanOrEqual(0);
    expect(getIssuersDataModelCountMock).toHaveBeenCalled();
  });

  it('get isssuers by data model count -> throw error', async () => {
    const { getIssuersDataModelCountMock } = DataModelMockService(dataModel);
    expect(
      async () => await dataModel.getIssuersByDataModelCount('wrong'),
    ).rejects.toThrow('wrong is not valid');
    expect(getIssuersDataModelCountMock).toHaveBeenCalled();
  });

  it('get total issuers by data model ', async () => {
    const { getTotalofIssuersByDataModelMock } =
      DataModelMockService(dataModel);
    const { getTotalofIssuersByDataModel } =
      await dataModel.getTotalofIssuersByDataModel(dataModelStub().id);

    expect(getTotalofIssuersByDataModel).toBeGreaterThanOrEqual(0);
    expect(getTotalofIssuersByDataModelMock).toHaveBeenCalled();
  });

  it('get total issuers by data model -> throw error ', async () => {
    const { getTotalofIssuersByDataModelMock } =
      DataModelMockService(dataModel);

    expect(
      async () => await dataModel.getTotalofIssuersByDataModel('wrong'),
    ).rejects.toThrow('wrong is not valid');
    expect(getTotalofIssuersByDataModelMock).toHaveBeenCalled();
  });
});
