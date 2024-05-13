import { User } from '../../src/v3/user/user';
import { activitiesStub, userStub } from '../../test/stubs/v3/user.stub';

export const UserMockService = (user: User) => ({
  meMock: jest.spyOn(user.sdk, 'me_query').mockResolvedValue({
    me: userStub(),
  }),
  getSingleUserMock: jest.spyOn(user.sdk, 'user_query').mockResolvedValue({
    user: userStub(),
  }),
  myPDACountMock: jest.spyOn(user.sdk, 'myPDACount_query').mockResolvedValue({
    myPDACount: 10,
  }),
  myPDAsMock: jest.spyOn(user.sdk, 'myPDAs_query').mockResolvedValue({
    myPDAs: userStub().issuedPDAs,
  }),
  myDataModelsCountMock: jest
    .spyOn(user.sdk, 'dataModelsCount_query')
    .mockResolvedValue({
      dataModelsCount: 10,
    }),
  myActivitiesCountMock: jest
    .spyOn(user.sdk, 'myActivitiesCount_query')
    .mockResolvedValue({ myActivitiesCount: 10 }),
  myActivitiesMock: jest
    .spyOn(user.sdk, 'myActivities_query')
    .mockResolvedValue({ myActivities: activitiesStub() }),
});
