import {
  dataModelStub,
  dataModelMetaDataStub,
  dataModelCreateStub,
} from '../test/stubs/data-model.stub';

import { Sdk } from '../gatewaySdk/sources/Gateway';

export const DataModelMockService = (sdk: Sdk) => ({
  createDataModelMock: jest
    .spyOn(sdk, 'createDataModelMutation')
    .mockResolvedValue({
      createDataModel: dataModelStub(),
    }),

  getDataModelMock: jest.spyOn(sdk, 'dataModelQuery').mockResolvedValue({
    dataModel: dataModelStub(),
  }),

  getDataModelsMock: jest.spyOn(sdk, 'dataModelsQuery').mockResolvedValue({
    dataModels: [dataModelStub()],
  }),

  getDataModelsCountMock: jest
    .spyOn(sdk, 'dataModelsCountQuery')
    .mockResolvedValue({
      dataModelsCount: 10,
    }),

  getDataModelsMetaDataMock: jest
    .spyOn(sdk, 'dataModelsMetadataQuery')
    .mockResolvedValue({
      dataModelsMetadata: dataModelMetaDataStub(),
    }),

  getIssuersByDataModelMock: jest
    .spyOn(sdk, 'issuersByDataModelQuery')
    .mockResolvedValue({
      issuersByDataModel: [{ count: 10 }],
    }),

  getIssuersDataModelCountMock: jest
    .spyOn(sdk, 'issuersByDataModelCountQuery')
    .mockResolvedValue({
      issuersByDataModelCount: 10,
    }),
  getTotalofIssuersByDataModelMock: jest
    .spyOn(sdk, 'getTotalofIssuersByDataModelQuery')
    .mockResolvedValue({
      getTotalofIssuersByDataModel: 10,
    }),
});
