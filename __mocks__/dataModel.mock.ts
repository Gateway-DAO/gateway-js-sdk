import { DataModel } from '../src/data-model/data-model';
import {
  dataModelStub,
  dataModelMetaDataStub,
  dataModelCreateStub,
} from '../test/stubs/dataModel.stub';

export const DataModelMockService = (dataModel: DataModel) => ({
  createDataModelMock: jest
    .spyOn(dataModel.sdk, 'createDataModel_mutation')
    .mockResolvedValue({
      createDataModel: dataModelStub(),
    }),

  getDataModelMock: jest
    .spyOn(dataModel.sdk, 'dataModel_query')
    .mockResolvedValue({
      dataModel: dataModelStub(),
    }),

  getDataModelsMock: jest
    .spyOn(dataModel.sdk, 'dataModels_query')
    .mockResolvedValue({
      dataModels: [dataModelStub()],
    }),

  getDataModelsCountMock: jest
    .spyOn(dataModel.sdk, 'dataModelsCount_query')
    .mockResolvedValue({
      dataModelsCount: 10,
    }),

  getDataModelsMetaDataMock: jest
    .spyOn(dataModel.sdk, 'dataModelsMetadata_query')
    .mockResolvedValue({
      dataModelsMetadata: dataModelMetaDataStub(),
    }),

  getIssuersByDataModelMock: jest
    .spyOn(dataModel.sdk, 'issuersByDataModel_query')
    .mockResolvedValue({
      issuersByDataModel: [{ count: 10 }],
    }),

  getIssuersDataModelCountMock: jest
    .spyOn(dataModel.sdk, 'issuersByDataModelCount_query')
    .mockResolvedValue({
      issuersByDataModelCount: 10,
    }),
  getTotalofIssuersByDataModelMock: jest
    .spyOn(dataModel.sdk, 'getTotalofIssuersByDataModel_query')
    .mockResolvedValue({
      getTotalofIssuersByDataModel: 10,
    }),
});
