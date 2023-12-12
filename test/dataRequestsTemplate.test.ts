import { getMeshSDK } from '../.mesh';
import { dataRequestTemplateMockService } from '../__mocks__/dataRequestTemplate.mock';
import { DataRequestTemplate } from '../src/dataRequestsTemplate/dataRequestsTemplate';
import {
  dataRequestTemplateCreateStub,
  dataRequestTemplateStub,
} from './stubs/dataRequestTemplate.stub';

let dataRequestTemplate: DataRequestTemplate;

beforeAll(() => {
  dataRequestTemplate = new DataRequestTemplate(getMeshSDK());
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Data Requests Template test', () => {
  it('create data request template', async () => {
    const { createDataRequestTemplateMock } =
      dataRequestTemplateMockService(dataRequestTemplate);

    const { createDataRequestTemplate } =
      await dataRequestTemplate.createDataRequestTemplate(
        dataRequestTemplateCreateStub(),
      );

    expect(createDataRequestTemplate.name).toEqual(
      dataRequestTemplateCreateStub().title,
    );
    expect(createDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('get data request template by id', async () => {
    const { getDataRequestTemplateMock } =
      dataRequestTemplateMockService(dataRequestTemplate);

    const res = await dataRequestTemplate.getDataRequestTemplate(
      dataRequestTemplateStub().id,
    );

    expect(res.dataRequestTemplate?.id).toEqual(dataRequestTemplateStub().id);
    expect(getDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('get data request templates', async () => {
    const { getDataRequestTemplatesMock } =
      dataRequestTemplateMockService(dataRequestTemplate);

    const { dataRequestTemplates } =
      await dataRequestTemplate.getDataRequestTemplates({
        skip: 0,
        take: 10,
      });

    expect(dataRequestTemplates?.length).toBeGreaterThan(0);
    expect(getDataRequestTemplatesMock).toHaveBeenCalled();
  });

  it('get data request templates count', async () => {
    const { getDataRequestsTemplateCount } =
      dataRequestTemplateMockService(dataRequestTemplate);

    const count = await dataRequestTemplate.getDataRequestsTemplateCount();

    expect(count).toBeGreaterThan(0);
    expect(getDataRequestsTemplateCount).toHaveBeenCalled();
  });
});
