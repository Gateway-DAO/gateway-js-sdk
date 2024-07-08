import { Sdk } from '../gatewaySdk/sources/Gateway';
import { activitiesStub, userStub } from '../test/stubs/user.stub';

export const UserMockService = (sdk: Sdk) => ({
  meMock: jest.spyOn(sdk, 'meQuery').mockResolvedValue({
    me: userStub(),
  }),
  getSingleUserMock: jest.spyOn(sdk, 'userQuery').mockResolvedValue({
    user: userStub(),
  }),
  myPDACountMock: jest.spyOn(sdk, 'myPDACountQuery').mockResolvedValue({
    myPDACount: 10,
  }),
  myPDAsMock: jest.spyOn(sdk, 'myPDAsQuery').mockResolvedValue({
    myPDAs: userStub().issuedPDAs,
  }),
  myDataModelsCountMock: jest
    .spyOn(sdk, 'myDataModelsCountQuery')
    .mockResolvedValue({
      myDataModelsCount: 10,
    }),
  myActivitiesCountMock: jest
    .spyOn(sdk, 'myActivitiesCountQuery')
    .mockResolvedValue({ myActivitiesCount: 10 }),
  myActivitiesMock: jest
    .spyOn(sdk, 'myActivitiesQuery')
    .mockResolvedValue({ myActivities: activitiesStub() }),
  updateMeMock: jest
    .spyOn(sdk, 'updateMyUserMutation')
    .mockResolvedValue({ updateMyUser: userStub() }),
});
