import { Gateway } from '../src/Gateway';
let api: Gateway;

beforeAll(() => {
  const apiKey = process.env.API_KEY;
  const token = process.env.BEARER_TOKEN;

  if (!apiKey || !token) {
    throw new Error(
      'APIKEY or TOKEN is not defined in the environment variables.',
    );
  }

  api = new Gateway({
    apiKey: apiKey,
    token: token,
  });
});

describe('data model function tests', () => {
  it('create data model', async () => {
    const { createDataModel } = await api.dataModel.createDataModel({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'User name' },
          age: { type: 'number', minimum: 18, title: 'User Age' },
        },
        required: ['name', 'age'],
        additionalProperties: false,
      },
      description: 'Test description',
      permissions: 'ALL',
      title: 'Test',
    });

    expect(createDataModel?.title).toEqual('Test');
  }, 40000);

  it('get the data model', async () => {
    const { createDataModel } = await api.dataModel.createDataModel({
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'User name' },
          age: { type: 'number', minimum: 18, title: 'User Age' },
        },
        required: ['name', 'age'],
        additionalProperties: false,
      },
      description: 'test for get data model query',
      permissions: 'ALL',
      title: '1212',
    });

    const { dataModel } = await api.dataModel.getDataModel(createDataModel?.id);

    expect(dataModel.id).toEqual(createDataModel.id);
  });

  it('gets data moldel', async () => {
    const { dataModels } = await api.dataModel.getDataModels();

    expect(dataModels.length).toBeGreaterThanOrEqual(0);
  }, 5000);

  it('models count', async () => {
    const { dataModelsCount } = await api.dataModel.getDataModelsCount();
    expect(dataModelsCount).toBeGreaterThanOrEqual(0);
  }, 2000);

  it('data model meta data', async () => {
    const { dataModelsMetadata } = await api.dataModel.getDataModelMetaData();
    expect(dataModelsMetadata.tags.length).toBeGreaterThanOrEqual(0);
  });

  it('find issuer by data model id', async () => {
    const { issuersByDataModel } = await api.dataModel.getIssuersByDataModel(
      process.env.DATAMODEL_ID as string,
    );

    console.log(issuersByDataModel);
  });

  it('get total issuers by data model', async () => {
    const { getTotalofIssuersByDataModel } =
      await api.dataModel.getTotalofIssuersByDataModel(
        process.env.DATAMODEL_ID as string,
      );

    console.log(getTotalofIssuersByDataModel);
  });

  it('get issuers by data model count', async () => {
    const { issuersByDataModelCount } =
      await api.dataModel.getIssuersByDataModelCount(
        process.env.DATAMODEL_ID as string,
      );
    console.log(issuersByDataModelCount);
  });
});
