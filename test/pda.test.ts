import { Gateway } from '../src/Gateway';
import { PDAStatus, UserIdentifierType } from '../src/types';

const DEFAULT_TIMEOUT = 10000;

let api: Gateway;

beforeAll(() => {
  api = new Gateway({
    apiKey: 'm9Y5ntNcTlwQ2LbRpYr6K_VhxJXuZJ6Q',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90b2NvbF9pZCI6IjkwNzcwODA2LWFlMGMtNGExNS05MjYzLWU5MWJhYWY1ZDkzZiIsImF1dGgiOnsiaWQiOiJlMjJiOWZkNi05NjgzLTRjZDgtOGZlOS1lZWU0YzFmYTJjZjciLCJ0eXBlIjoiV0FMTEVUIn0sImNyeXB0byI6eyJwdWJsaWNQZW0iOiItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxyXG5NSUlDSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQWc4QU1JSUNDZ0tDQWdFQXpUdTJCWVVSS3VvM2V2MGx0MjUzXHJcblR3SDlGQkhUbU90dlRXYlQraTExSEF5WW5vUGx4UWV3M0cySnAvanNnS0cxbDN4WHBtdEEwVjlkUGxaUHhVS3BcclxueXM2cWNBdkhmaThpdm15dmk1WVhRYnQ4aE1rY3hKb1RzanZ4V092dTF1bjljVlVSUGkzOTJZTjVwV2lBOEdncVxyXG5zMjlvaGYzOVJDVnM4MkxGQlNCVkI0ZHRhRmJ1cnNlY0M1WStqZVB3UG9tLzJMUlpkTTJ3bFc3ZzhYVmNROUV4XHJcblVxSWpxS296YnVjYmpiT0Q2YXZnRm9JR3VpOVIxdzYrbWFLQmRPK1gxRU5tVGZURHhLclZNRFJtSHFOK0syY1ZcclxuK3NlTWEzcDBjT0VlTklOWjc2V2lhTlhwMjErZ0VSU3hIRkRNOVBjeEZYWGxGeVBEWE1oVkNVNm1xTDNXRmtjNFxyXG5uOTI0bC8zR09Sa1QzZmd4K1FqN2krNS9sU0ZQS2Q1R1U3bFN4VnVBb1hwYWQxUlFCWUxBZGo1dnJacjB5aUprXHJcbi94cjMzbVp6Q0NuN0ZhcW1JeDdSbU4vRk1Sc1JqRGdBd2FUb3RzZ05JZFVGZVZrRURCYm1EWnJtL0k5diswY0hcclxuczA0UCtxaG01b3JEaXFscGZoZVN0M3hqVit5a3Z3d0JIOElSeGdIQ0krZk1ZMThBbDBCSHlkckZhdldWbEVhY1xyXG4yRTFpbDFSdXU0OGxCVXliU0R4Y3Z5RXR5TU94N0ErY0dQcy93MGg5aUtZZy9OVnEvTFdwWjEzYmVzcS9QanpWXHJcbjR5ZnZaTkpyT3VxMXpkc29MdlVaUTVuMHJ1c21PekMyNlhMb3BpVlpUSWk3U1k4QzAvNFNlaVVvaU8vaVBFbnhcclxuOW5nL0RUMEsvQXlLbTBZQ1oxU2pwZ1VDQXdFQUFRPT1cclxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXHJcbiJ9LCJ0eXBlIjoiYXV0aF90b2tlbiIsImlhdCI6MTY5ODIxMTg0N30.zUxmPhnrQlIEZ5pMzHBMFkcqPvjsIfs0er9Dylw5olE',
  });
});

describe('PDA TESTING', () => {
  it(
    'create pda',
    async () => {
      let obj = {
        dataModelId: 'f4014d53-b30f-4490-9812-cea379a1b398',
        description: 'test',
        title: 'test',
        claim: {
          gatewayUse: 'test',
        },
        owner: {
          type: UserIdentifierType.EMAIL,
          value: 'sid',
        },
      };
      const { createPDA } = await api.pda.createPDA(obj);
      expect(createPDA.dataAsset?.title).toEqual('test');
    },
    DEFAULT_TIMEOUT,
  );

  // it(
  //   'change pda status',
  //   async () => {
  //     const { changePDAStatus } = await api.pda.changePDAStatus({
  //       id: '6bc1a11f-f91d-4361-9a22-5df8d1bf4dc8',
  //       status: PDAStatus.Valid,
  //     });
  //     expect(changePDAStatus.status).toEqual(PDAStatus.Valid);
  //   },
  //   DEFAULT_TIMEOUT,
  // );

  it(
    'get single pda',
    async () => {
      const { PDA } = await api.pda.getPDA(
        '6bc1a11f-f91d-4361-9a22-5df8d1bf4dc8',
      );
      expect(PDA?.dataAsset?.title).toEqual('test');
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'pda count',
    async () => {
      const count = await api.pda.getPDACount();
      expect(count).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'pdas',
    async () => {
      const { PDAs } = await api.pda.getPDAs({ skip: 0, take: 10 });
      expect(PDAs.length).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'issued pdas count',
    async () => {
      const count = await api.pda.getIssuedPDAsCount();
      expect(count).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );
});
