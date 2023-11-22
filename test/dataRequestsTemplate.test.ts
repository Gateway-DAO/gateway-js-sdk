import dotenv from 'dotenv';
import { Gateway } from '../src/Gateway';
dotenv.config();

let api: Gateway;
const DEFAULT_TIMEOUT = 10000;

beforeAll(() => {
  api = new Gateway({
    apiKey: process.env.API_KEY!,
    token: process.env.BEARER_TOKEN!,
  });
});

describe('Data Requests Template test', () => {
  it(
    'create data request template',
    async () => {
      const { createDataRequestTemplate } =
        await api.dataRequestTemplate.createDataRequestTemplate({
          title: 'Create Data Request Template Example',
          description: 'Lorem ipsum dolor sit amet.',
          dataModels: [
            {
              id: process.env.DATAMODEL_ID!,
              required: true,
              claimValidations: {
                type: 'object',
                properties: {
                  gatewayUse: {
                    type: 'string',
                  },
                },
                required: ['gatewayUse'],
              },
            },
          ],
        });
      expect(createDataRequestTemplate.name).toEqual(
        'Create Data Request Template Example',
      );
      const { dataRequestTemplate } =
        await api.dataRequestTemplate.getDataRequestTemplate(
          createDataRequestTemplate.id,
        );
      expect(dataRequestTemplate).toBeDefined();
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'get data request templates',
    async () => {
      const { dataRequestTemplates } =
        await api.dataRequestTemplate.getDataRequestTemplates({
          skip: 0,
          take: 10,
        });
      expect(dataRequestTemplates?.length).toBeGreaterThan(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'get data request templates count',
    async () => {
      const count =
        await api.dataRequestTemplate.getDataRequestsTemplateCount();
      expect(count).toBeGreaterThan(0);
    },
    DEFAULT_TIMEOUT,
  );
});
