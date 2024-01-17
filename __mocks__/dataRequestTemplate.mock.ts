import { DataRequestTemplate } from '../src/dataRequestsTemplate/dataRequestsTemplate';
import { dataRequestTemplateStub } from '../test/stubs/dataRequestTemplate.stub';

export const DataRequestTemplateMockService = (
  dataRequestTemplate: DataRequestTemplate,
) => ({
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
  getDataRequestsTemplateCountMock: jest
    .spyOn(dataRequestTemplate.sdk, 'dataRequestTemplatesCount_query')
    .mockResolvedValue({
      dataRequestTemplatesCount: 10,
    }),
  getDataRequestsTemplatesMetadataMock: jest
    .spyOn(dataRequestTemplate.sdk, 'dataRequestTemplatesMetadata_query')
    .mockResolvedValue({
      dataRequestTemplatesMetadata: {
        tags: [dataRequestTemplateStub().tags[0]],
      },
    }),
  getVerifiersByDataRequestTemplateMock: jest
    .spyOn(dataRequestTemplate.sdk, 'verifiersByDataRequestTemplate_query')
    .mockResolvedValue({
      verifiersByDataRequestTemplate: [],
    }),
  getVerifiersByDataRequestTemplateCountMock: jest
    .spyOn(dataRequestTemplate.sdk, 'verifiersByDataRequestTemplateCount_query')
    .mockResolvedValue({
      verifiersByDataRequestTemplateCount: 10,
    }),
});
