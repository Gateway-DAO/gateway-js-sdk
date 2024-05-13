import {
  DataModel,
  CreateDataModelInput,
  DataModelsMetadata,
} from '../../../gatewaySdk/sources/GatewayV3';

export const dataModelStub = (
  overrideDataModel?: Partial<DataModel>,
): DataModel => ({
  PDAs: [],
  allowedOrganizations: [],
  allowedUsers: [],
  createdAt: '2023-11-29T18:00:55.650Z',
  description:
    'Net promoter score (NPS) is a market research metric that is based on a single survey question asking respondents to rate the likelihood that they would recommend a company, product, or a service to a friend or colleague. The NPS is a proprietary instrument developed by Fred Reichheld, who owns the registered NPS trademark in conjunction with Bain & Company and Satmetrix. Its popularity and broad use have been attributed to its simplicity and transparent methodology.',
  featured: false,
  group: {
    id: 'd4339c71-f414-4dfd-9213-003317e06862',
    createdAt: '2023-11-29T18:00:55.650Z',
    dataModels: [],
    official: false,
  },
  verified: false,
  uniqueIssuersCount: 1,
  title: 'Net promoter score ',
  tags: ['Research', 'Testing'],
  schema: {
    type: 'object',
    default: {},
    title: 'Root Schema',
    required: ['score'],
    properties: {
      score: {
        type: 'integer',
        default: 10,
        title: 'Score',
        examples: ['Fill from 0 up to 10'],
      },
      testimony: {
        type: 'string',
        title: 'Testimony',
        examples: ['Tell us what your experience was like'],
      },
      recommendation: {
        type: 'boolean',
        title: 'Would you recommend this?',
      },
      keywords: {
        type: 'array',
        title: 'Keywords about your experience',
      },
    },
  },

  id: 'c22d65f0-b7b1-48a9-8c13-a01e32df1f1f',
  organization: null,
  pdas: [],
  pdasIssuedCount: 2,
  ...overrideDataModel,
});

export const dataModelCreateStub = (
  overrideDataModelCreateStub?: CreateDataModelInput,
): CreateDataModelInput => ({
  data: {
    description:
      'Net promoter score (NPS) is a market research metric that is based on a single survey question asking respondents to rate the likelihood that they would recommend a company, product, or a service to a friend or colleague. The NPS is a proprietary instrument developed by Fred Reichheld, who owns the registered NPS trademark in conjunction with Bain & Company and Satmetrix. Its popularity and broad use have been attributed to its simplicity and transparent methodology.',

    title: 'Net promoter score ',
    schema: {
      type: 'object',
      default: {},
      title: 'Root Schema',
      required: ['score'],
      properties: {
        score: {
          type: 'integer',
          default: 10,
          title: 'Score',
          examples: ['Fill from 0 up to 10'],
        },
        testimony: {
          type: 'string',
          title: 'Testimony',
          examples: ['Tell us what your experience was like'],
        },
        recommendation: {
          type: 'boolean',
          title: 'Would you recommend this?',
        },
        keywords: {
          type: 'array',
          title: 'Keywords about your experience',
        },
      },
    },
  },

  signature: '0xd2FEB1aCf86d28cdc21dd733066d158737DaCa8d',
  signingKey: 'test',
  signingCipher: 'ED25519',
  ...overrideDataModelCreateStub,
});

export const dataModelMetaDataStub = (
  overideDataModelMetaData?: DataModelsMetadata,
): DataModelsMetadata => ({
  tags: [
    'Research',
    'Testing',
    'Developers',
    'Education',
    'Music',
    'Listening',
    'Consumer',
    'Finance',
    'Banking',
    'Credit Card',
    'Social',
    'Score',
    'Earn',
    'Marketing',
    'Infrastructure',
    'Tests',
  ],
  issuedCount: {
    min: 0,
    max: 14,
  },
  ...overideDataModelMetaData,
});
