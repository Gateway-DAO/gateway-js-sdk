import { Gateway } from '../src/Gateway';

let api: Gateway;
const DEFAULT_TIMEOUT = 10000;

beforeAll(() => {
  api = new Gateway({
    apiKey: 'local',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90b2NvbF9pZCI6ImI4NDNlYWVlLWJjODUtNDA3NS04YjA1LThmZDVjMGFiOTkwYSIsImF1dGgiOnsiaWQiOiJlNjNjOTI5Ny1hNjllLTRmOTItOWM2Mi01ZDdkNDU0M2M2NGEiLCJ0eXBlIjoiV0FMTEVUIn0sImNyeXB0byI6eyJwdWJsaWNQZW0iOiItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxyXG5NSUlDSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQWc4QU1JSUNDZ0tDQWdFQTF0Q3VYWDR2WWJ6NmJHZHFrSk0vXHJcbjNoUFFScnNWUEhmZ2JQK0hmcmNsNUsyeWlNMHhhR01wbVd4cUdqV0p3SDhFWmdySU9jMVFFcHpXOGNLVzNyaGxcclxuTEpwME9McEVPNW4rTms3ZjA1bTAyNEdZOW5ETmhhZzdiUTIySVBkenhVVDZiT2JlZWhXRUZGYXh2STZweCsxcVxyXG5qSk5xNDRJSWV0UmpIUllOMHVXcmtBVlIwVnUzR01tdHRnVlU0Rk5OSUdsYmpCUWs5V0FrbTZ4ODE1MjgxZStKXHJcbjZGZU5WYXJod1VhWHdya2hXNmQ2TkNTTnhvRjJ3cnNocFQxcVFqTm4rMlFXRlRmWTA0dFFaRlYzUENBMFptZUlcclxuVGVEbjBXdEZYbnNYNGpwZHlzS2Rybi9aWjN1UzV4VUJNbC92SXQwOEdzemNaQTREb1VtLzgxSXZiVXkrL2ZBWVxyXG5BNEdSVW44MFhNbVdMaVJvQXhsblVuSktnU0N6LzJVZ2gwSitveXlmTm9jTVB5WHRSa2NETmdZbTc0d0U3NU90XHJcbjlwekRuM0VyZGFnNEUzM1dCOHBnODlpOEVxRXRsMVA2MkJkcnVROGxzSlpRbHdBVmVsRFc3cjZHelhiYlFGSFZcclxuVHF2VE5TNHJhOUV5dzVQWnVXZDlheTJESis3NWJreGpQYlBNN3l5YzdXS1U1VndaSkZGUkxOalhObnUzMU9odVxyXG5KT3RWL05ISFJKWVh3ait5b3lZeDloSCswSjB3bmJBT1p1aXFycStjTHoyWE41Y0VPOEZRMUJXNVdzMEFZMnJoXHJcbjNjMldrdDBOemVGa1dCWk4wMW5UcFJPRUxDWmYweThBVjRrNlV2NTFaeGVMSkpqN3dMOGs5SWNOaUFVSGJScVhcclxubDlqMTdRSWNNY0xGMTFHY09sWlVubGtDQXdFQUFRPT1cclxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXHJcbiJ9LCJ0eXBlIjoiYXV0aF90b2tlbiIsImlhdCI6MTcwMDEyMzQ2Mn0.CrDQxTMfxbxw9nmHN0ARk135IoLtQydrt4Z498pRE40',
  });
});

describe('Data Requests Template test', () => {
  it(
    'create data request template',
    async () => {
      // id: 'f4014d53-b30f-4490-9812-cea379a1b398',
      const { createDataRequestTemplate } =
        await api.dataRequestTemplate.createDataRequestTemplate({
          title: 'Create Data Request Template Example',
          description: 'Lorem ipsum dolor sit amet.',
          dataModels: [
            {
              id: '28b67204-d98b-4d40-9644-fae3b6c9c921',
              required: true,
              claimValidations: {
                type: 'object',
                properties: {
                  wallet: {
                    type: 'string',
                  },
                },
                required: ['wallet'],
              },
            },
          ],
        });
      expect(createDataRequestTemplate.name).toEqual(
        'Create Data Request Template Example',
      );
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'get a single data request template',
    async () => {
      const { dataRequestTemplate } =
        await api.dataRequestTemplate.getDataRequestTemplate(
          '8aa545e4-d35b-477e-85b3-bcaf331db378',
        );
      expect(dataRequestTemplate?.name).toEqual(
        'Create Data Request Template Example',
      );
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
