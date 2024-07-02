import { Activity } from '../../src/v3/activity/activity';

import { activityStub } from '../../test/stubs/v3/activity.stub';

export const ActivityMockService = (actitivity: Activity) => ({
  getActivityCountMock: jest
    .spyOn(actitivity.sdk, 'activitiesCount_query')
    .mockResolvedValue({
      activitiesCount: 10,
    }),

  getActivityMock: jest
    .spyOn(actitivity.sdk, 'activity_query')
    .mockResolvedValue({
      activity: activityStub(),
    }),

  getActivitysMock: jest
    .spyOn(actitivity.sdk, 'activities_query')
    .mockResolvedValue({
      activities: [activityStub()],
    }),
});
