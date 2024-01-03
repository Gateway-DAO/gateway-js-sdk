import { getMeshSDK } from '../.mesh';
import { DataModel } from '../src/data-model/data-model';
import { dataModelCreateStub, dataModelStub } from './stubs/dataModel.stub';
import { DataModelMockService } from '../__mocks__/dataModel.mock';

let dataModel: DataModel;

beforeAll(() => {
  dataModel = new DataModel(getMeshSDK());
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

  it('get data model', async () => {
    const { getDataModelMock } = DataModelMockService(dataModel);

    const { dataModel: rdataModel } = await dataModel.getDataModel(
      dataModelStub().id,
    );
    expect(rdataModel).toEqual(dataModelStub());
    expect(getDataModelMock).toHaveBeenCalled();
  });
});
