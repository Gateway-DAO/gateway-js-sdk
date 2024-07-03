import { activityStub } from '../test/stubs/activity.stub';
import { Sdk } from '../gatewaySdk/sources/Gateway';

export const ActivityMockService = (sdk: Sdk) => ({
  getActivityCountMock: jest
    .spyOn(sdk, 'activitiesCountQuery')
    .mockResolvedValue({
      activitiesCount: 10,
    }),

  getActivityMock: jest.spyOn(sdk, 'activityQuery').mockResolvedValue({
    activity: activityStub(),
  }),

  getActivitysMock: jest.spyOn(sdk, 'activitiesQuery').mockResolvedValue({
    activities: [activityStub()],
  }),
});
