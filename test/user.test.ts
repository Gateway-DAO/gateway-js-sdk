import { Gateway } from '../src/Gateway';

const DEFAULT_TIMEOUT = 10000;

let api: Gateway;

beforeAll(() => {
  api = new Gateway({
    apiKey: 'm9Y5ntNcTlwQ2LbRpYr6K_VhxJXuZJ6Q',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90b2NvbF9pZCI6IjkwNzcwODA2LWFlMGMtNGExNS05MjYzLWU5MWJhYWY1ZDkzZiIsImF1dGgiOnsiaWQiOiJlMjJiOWZkNi05NjgzLTRjZDgtOGZlOS1lZWU0YzFmYTJjZjciLCJ0eXBlIjoiV0FMTEVUIn0sImNyeXB0byI6eyJwdWJsaWNQZW0iOiItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxyXG5NSUlDSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQWc4QU1JSUNDZ0tDQWdFQXpUdTJCWVVSS3VvM2V2MGx0MjUzXHJcblR3SDlGQkhUbU90dlRXYlQraTExSEF5WW5vUGx4UWV3M0cySnAvanNnS0cxbDN4WHBtdEEwVjlkUGxaUHhVS3BcclxueXM2cWNBdkhmaThpdm15dmk1WVhRYnQ4aE1rY3hKb1RzanZ4V092dTF1bjljVlVSUGkzOTJZTjVwV2lBOEdncVxyXG5zMjlvaGYzOVJDVnM4MkxGQlNCVkI0ZHRhRmJ1cnNlY0M1WStqZVB3UG9tLzJMUlpkTTJ3bFc3ZzhYVmNROUV4XHJcblVxSWpxS296YnVjYmpiT0Q2YXZnRm9JR3VpOVIxdzYrbWFLQmRPK1gxRU5tVGZURHhLclZNRFJtSHFOK0syY1ZcclxuK3NlTWEzcDBjT0VlTklOWjc2V2lhTlhwMjErZ0VSU3hIRkRNOVBjeEZYWGxGeVBEWE1oVkNVNm1xTDNXRmtjNFxyXG5uOTI0bC8zR09Sa1QzZmd4K1FqN2krNS9sU0ZQS2Q1R1U3bFN4VnVBb1hwYWQxUlFCWUxBZGo1dnJacjB5aUprXHJcbi94cjMzbVp6Q0NuN0ZhcW1JeDdSbU4vRk1Sc1JqRGdBd2FUb3RzZ05JZFVGZVZrRURCYm1EWnJtL0k5diswY0hcclxuczA0UCtxaG01b3JEaXFscGZoZVN0M3hqVit5a3Z3d0JIOElSeGdIQ0krZk1ZMThBbDBCSHlkckZhdldWbEVhY1xyXG4yRTFpbDFSdXU0OGxCVXliU0R4Y3Z5RXR5TU94N0ErY0dQcy93MGg5aUtZZy9OVnEvTFdwWjEzYmVzcS9QanpWXHJcbjR5ZnZaTkpyT3VxMXpkc29MdlVaUTVuMHJ1c21PekMyNlhMb3BpVlpUSWk3U1k4QzAvNFNlaVVvaU8vaVBFbnhcclxuOW5nL0RUMEsvQXlLbTBZQ1oxU2pwZ1VDQXdFQUFRPT1cclxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXHJcbiJ9LCJ0eXBlIjoiYXV0aF90b2tlbiIsImlhdCI6MTY5ODIxMTg0N30.zUxmPhnrQlIEZ5pMzHBMFkcqPvjsIfs0er9Dylw5olE',
  });
});

describe('USER Testing', () => {
  it(
    'me',
    async () => {
      const { me } = await api.user.me();
      expect(me.gatewayId).toEqual('sid');
    },
    DEFAULT_TIMEOUT,
  );

  // it(
  //   "single user",
  //   async () => {
  //     const { user } = await api.user.getSingleUser({
  //       type: UserIdentifierType.GATEWAY_ID,
  //       value: "sid",
  //     });
  //     expect(user?.gatewayId).toEqual("sid");
  //   },
  //   DEFAULT_TIMEOUT
  // );

  it(
    'my pdas count',
    async () => {
      const count = await api.user.myPDACount({});
      expect(count).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'my pdas',
    async () => {
      const { myPDAs } = await api.user.myPDAs({
        skip: 0,
        take: 10,
      });
      expect(myPDAs.length).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'my data models count',
    async () => {
      const count = await api.user.myDataModelsCount();
      expect(count).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'my data requests template count',
    async () => {
      const count = await api.user.myDataRequestTemplatesCount();
      expect(count).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );

  //   it("update user", async () => {
  //     const { updateUser } = await api.user.updateUser({
  //       displayName: "siddharth9890",
  //     });
  //     expect(updateUser.displayName).toEqual("siddharth9890");
  //   });

  it('update display username', async () => {
    const { updateMyDisplayName } = await api.user.updateMyDisplayName('sid');
    expect(updateMyDisplayName).toEqual('sid');
  });

  //   it("update gateway id", async () => {
  //     const { updateMyGatewayId } = await api.user.updateMyGatewayId(
  //       "siddharth9890"
  //     );
  //     expect(updateMyGatewayId.gatewayId).toEqual("siddharth9890");
  //   });

  it('update profile picture', async () => {
    const { updateMyProfilePicture } =
      await api.user.updateMyProfilePicture('siddharth9890');
    expect(updateMyProfilePicture).toEqual('siddharth9890');
  });

  //   it("update notification email", async () => {
  //     const { user } = await api.user.updateNotificationEmail("test@gmail.com");
  //     console.log(user);
  //     expect(user.email).toEqual("test@gmail.com");
  //   });
});
