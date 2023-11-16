import { Gateway } from '../src/Gateway';

let api: Gateway;
const DEFAULT_TIMEOUT = 10000;

beforeAll(() => {
  api = new Gateway({
    apiKey: 'm9Y5ntNcTlwQ2LbRpYr6K_VhxJXuZJ6Q',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90b2NvbF9pZCI6IjkwNzcwODA2LWFlMGMtNGExNS05MjYzLWU5MWJhYWY1ZDkzZiIsImF1dGgiOnsiaWQiOiJlMjJiOWZkNi05NjgzLTRjZDgtOGZlOS1lZWU0YzFmYTJjZjciLCJ0eXBlIjoiV0FMTEVUIn0sImNyeXB0byI6eyJwdWJsaWNQZW0iOiItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxyXG5NSUlDSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQWc4QU1JSUNDZ0tDQWdFQXpUdTJCWVVSS3VvM2V2MGx0MjUzXHJcblR3SDlGQkhUbU90dlRXYlQraTExSEF5WW5vUGx4UWV3M0cySnAvanNnS0cxbDN4WHBtdEEwVjlkUGxaUHhVS3BcclxueXM2cWNBdkhmaThpdm15dmk1WVhRYnQ4aE1rY3hKb1RzanZ4V092dTF1bjljVlVSUGkzOTJZTjVwV2lBOEdncVxyXG5zMjlvaGYzOVJDVnM4MkxGQlNCVkI0ZHRhRmJ1cnNlY0M1WStqZVB3UG9tLzJMUlpkTTJ3bFc3ZzhYVmNROUV4XHJcblVxSWpxS296YnVjYmpiT0Q2YXZnRm9JR3VpOVIxdzYrbWFLQmRPK1gxRU5tVGZURHhLclZNRFJtSHFOK0syY1ZcclxuK3NlTWEzcDBjT0VlTklOWjc2V2lhTlhwMjErZ0VSU3hIRkRNOVBjeEZYWGxGeVBEWE1oVkNVNm1xTDNXRmtjNFxyXG5uOTI0bC8zR09Sa1QzZmd4K1FqN2krNS9sU0ZQS2Q1R1U3bFN4VnVBb1hwYWQxUlFCWUxBZGo1dnJacjB5aUprXHJcbi94cjMzbVp6Q0NuN0ZhcW1JeDdSbU4vRk1Sc1JqRGdBd2FUb3RzZ05JZFVGZVZrRURCYm1EWnJtL0k5diswY0hcclxuczA0UCtxaG01b3JEaXFscGZoZVN0M3hqVit5a3Z3d0JIOElSeGdIQ0krZk1ZMThBbDBCSHlkckZhdldWbEVhY1xyXG4yRTFpbDFSdXU0OGxCVXliU0R4Y3Z5RXR5TU94N0ErY0dQcy93MGg5aUtZZy9OVnEvTFdwWjEzYmVzcS9QanpWXHJcbjR5ZnZaTkpyT3VxMXpkc29MdlVaUTVuMHJ1c21PekMyNlhMb3BpVlpUSWk3U1k4QzAvNFNlaVVvaU8vaVBFbnhcclxuOW5nL0RUMEsvQXlLbTBZQ1oxU2pwZ1VDQXdFQUFRPT1cclxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXHJcbiJ9LCJ0eXBlIjoiYXV0aF90b2tlbiIsImlhdCI6MTY5ODIxMTg0N30.zUxmPhnrQlIEZ5pMzHBMFkcqPvjsIfs0er9Dylw5olE',
  });
});

describe('Data Requests Template test', () => {
  // it(
  //   'create data request template',
  //   async () => {
  //     const { createDataRequestTemplate } =
  //       await api.dataRequestTemplate.createDataRequestTemplate({
  //         title: 'Create Data Request Template Example',
  //         description: 'Lorem ipsum dolor sit amet.',
  //         dataModels: [
  //           {
  //             id: 'f4014d53-b30f-4490-9812-cea379a1b398',
  //             required: true,
  //             claimValidations: {
  //               type: 'object',
  //               properties: {
  //                 gatewayUse: {
  //                   type: 'string',
  //                 },
  //               },
  //               required: ['gatewayUse'],
  //             },
  //           },
  //         ],
  //       });
  //     expect(createDataRequestTemplate.name).toEqual(
  //       'Create Data Request Template Example',
  //     );
  //   },
  //   DEFAULT_TIMEOUT,
  // );

  it(
    'get a single data request template',
    async () => {
      const { dataRequestTemplate } =
        await api.dataRequestTemplate.getDataRequestTemplate(
          'ffc48b78-5543-4f78-8cb4-ea4821aa46d2',
        );
      expect(dataRequestTemplate?.name).toEqual('Hello Gateway');
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
      console.log(dataRequestTemplates);
      expect(dataRequestTemplates?.length).toBeGreaterThan(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'get data request templates count',
    async () => {
      const count = await api.dataRequestTemplate.getDataRequestsTemplateCount();
      expect(count).toBeGreaterThan(0);
    },
    DEFAULT_TIMEOUT,
  );
});
