import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../gatewaySdk';
import { DataRequestTemplateMockService } from '../__mocks__/dataRequestTemplate.mock';
import { DataRequestTemplate } from '../src/dataRequestsTemplate/dataRequestsTemplate';
import {
  dataRequestTemplateCreateStub,
  dataRequestTemplateStub,
} from './stubs/dataRequestTemplate.stub';

let dataRequestTemplate: DataRequestTemplate;

beforeAll(() => {
  dataRequestTemplate = new DataRequestTemplate(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('DATA REQUESTS TEMPLATE TESTING', () => {
  it('create data request template', async () => {
    const { createDataRequestTemplateMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    const { createDataRequestTemplate } =
      await dataRequestTemplate.createDataRequestTemplate(
        dataRequestTemplateCreateStub(),
      );

    expect(createDataRequestTemplate.name).toEqual(
      dataRequestTemplateCreateStub().title,
    );
    expect(createDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('create data request template to throw error', async () => {
    const { createDataRequestTemplateMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    expect(
      async () =>
        await dataRequestTemplate.createDataRequestTemplate(
          dataRequestTemplateCreateStub({ title: '' }),
        ),
    ).rejects.toThrow('');

    expect(createDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('get data request template by id', async () => {
    const { getDataRequestTemplateMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    const res = await dataRequestTemplate.getDataRequestTemplate(
      dataRequestTemplateStub().id,
    );

    expect(res.dataRequestTemplate?.id).toEqual(dataRequestTemplateStub().id);
    expect(getDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('get data request template by id to throw error', async () => {
    const { getDataRequestTemplateMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    expect(
      async () =>
        await dataRequestTemplate.getDataRequestTemplate(
          dataRequestTemplateStub({ id: '' }).id,
        ),
    ).rejects.toThrow(' is not valid');

    expect(getDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('get data request templates', async () => {
    const { getDataRequestTemplatesMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    const { dataRequestTemplates } =
      await dataRequestTemplate.getDataRequestTemplates({
        skip: 0,
        take: 10,
      });

    expect(dataRequestTemplates?.length).toBeGreaterThan(0);
    expect(getDataRequestTemplatesMock).toHaveBeenCalled();
  });

  it('get data request templates count', async () => {
    const { getDataRequestsTemplateCountMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    const count = await dataRequestTemplate.getDataRequestsTemplateCount();

    expect(count).toBeGreaterThan(0);
    expect(getDataRequestsTemplateCountMock).toHaveBeenCalled();
  });

  it('get data request templates metadata', async () => {
    const { getDataRequestsTemplatesMetadataMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    const { dataRequestTemplatesMetadata } =
      await dataRequestTemplate.getDataRequestsTemplatesMetadata();

    expect(dataRequestTemplatesMetadata.tags.length).toBe(
      dataRequestTemplateStub().tags.length,
    );
    expect(getDataRequestsTemplatesMetadataMock).toHaveBeenCalled();
  });

  it('get verifiers by data request templates id', async () => {
    const { getVerifiersByDataRequestTemplateMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    const { verifiersByDataRequestTemplate } =
      await dataRequestTemplate.getVerifiersByDataRequestTemplate(
        dataRequestTemplateStub().id,
      );

    expect(verifiersByDataRequestTemplate).toBeDefined();
    expect(getVerifiersByDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('get verifiers by data request templates id to throw error', async () => {
    const { getVerifiersByDataRequestTemplateMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    expect(
      async () =>
        await dataRequestTemplate.getVerifiersByDataRequestTemplate(
          dataRequestTemplateStub({ id: '' }).id,
        ),
    ).rejects.toThrow(' is not valid');

    expect(getVerifiersByDataRequestTemplateMock).toHaveBeenCalled();
  });

  it('get verifiers count by data request templates', async () => {
    const { getVerifiersByDataRequestTemplateCountMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    const count =
      await dataRequestTemplate.getVerifiersByDataRequestTemplateCount(
        dataRequestTemplateStub().id,
      );

    expect(count).toBeGreaterThan(0);
    expect(getVerifiersByDataRequestTemplateCountMock).toHaveBeenCalled();
  });

  it('get verifiers count by data request templates to throw error', async () => {
    const { getVerifiersByDataRequestTemplateCountMock } =
      DataRequestTemplateMockService(dataRequestTemplate);

    expect(
      async () =>
        await dataRequestTemplate.getVerifiersByDataRequestTemplateCount(
          dataRequestTemplateStub({ id: '' }).id,
        ),
    ).rejects.toThrow(' is not valid');

    expect(getVerifiersByDataRequestTemplateCountMock).toHaveBeenCalled();
  });
});
