import { DataRequestTemplate, TemplateSchemaInput } from '../../gatewaySdk';

export const dataRequestTemplateStub = (
  overrideDataRequestTemplate?: any,
): DataRequestTemplate => ({
  arweaveUrl: 'https://arweave.net/test',
  createdAt: new Date('2021-01-01T12:00:00Z'),
  dataModels: [
    {
      id: 'f47ac20b-58cc-4372-a567-0e02b2c3d479',
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
  dataRequestsCount: 10,
  description: 'test',
  name: 'test',
  revenueGenerated: 10,
  uniqueVerifiersCount: 10,
  schema: {},
  dataRequests: [],
  id: 'f47ac20b-58cc-4372-a567-0e02b2c3d478',
  tags: ['test'],
  user: {},
  ...overrideDataRequestTemplate,
});

export const dataRequestTemplateCreateStub = (
  overrideDataRequestTemplate?: any,
): TemplateSchemaInput => ({
  title: 'test',
  description: 'test',
  dataModels: [
    {
      id: 'f47ac20b-58cc-4372-a567-0e02b2c3d479',
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
  ...overrideDataRequestTemplate,
});
