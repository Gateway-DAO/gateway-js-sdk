import { DataModel } from '../src/data-model/data-model';
import { dataModelStub } from '../test/stubs/dataModel.stub';

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

  getDataModels: jest
    .spyOn(dataModel.sdk, 'dataModels_query')
    .mockResolvedValue({
      dataModels: [dataModelStub()],
    }),
});
