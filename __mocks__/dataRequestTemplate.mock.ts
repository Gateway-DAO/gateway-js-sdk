import { DataRequestTemplate } from '../src/dataRequestsTemplate/dataRequestsTemplate';
import { dataRequestTemplateStub } from '../test/stubs/dataRequestTemplate.stub';

export const dataRequestTemplateMockService = (dataRequestTemplate: DataRequestTemplate) => ({
  createDataRequestTemplateMock: jest
    .spyOn(dataRequestTemplate.sdk, 'createDataRequestTemplate_mutation')
    .mockResolvedValue({
      createDataRequestTemplate: dataRequestTemplateStub(),
    }),
  getDataRequestTemplateMock: jest
    .spyOn(dataRequestTemplate.sdk, 'dataRequestTemplate_query')
    .mockResolvedValue({
      dataRequestTemplate: dataRequestTemplateStub(),
    }),
  getDataRequestTemplatesMock: jest
    .spyOn(dataRequestTemplate.sdk, 'dataRequestTemplates_query')
    .mockResolvedValue({ dataRequestTemplates: [dataRequestTemplateStub()] }),
  getDataRequestsTemplateCount: jest
    .spyOn(dataRequestTemplate.sdk, 'dataRequestTemplatesCount_query')
    .mockResolvedValue({
      dataRequestTemplatesCount: 10,
    }),
});
