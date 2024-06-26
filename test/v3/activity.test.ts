import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../../gatewaySdk/sources/GatewayV3';
import { ActivityMockService } from '../../__mocks__/v3/activity.mock';
import { activityStub } from '../stubs/v3/activity.stub';
import { Activity } from '../../src/v3/activity/activity';

let activity: Activity;

beforeAll(() => {
  activity = new Activity(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('ACTIVITY SERVICE TESTING', () => {
  it('get Activity count', async () => {
    const { getActivityCountMock } = ActivityMockService(activity);
    const { activitiesCount } = await activity.getActivityCount();

    expect(activitiesCount).toBeGreaterThanOrEqual(10);
    expect(getActivityCountMock).toHaveBeenCalled();
  });

  it('get Activity by id', async () => {
    const { getActivityMock } = ActivityMockService(activity);
    const { activity: activityResult } = await activity.getActivity(
      activityStub().id,
    );
    expect(activityResult.id).toEqual(activityStub().id);
    expect(getActivityMock).toHaveBeenCalled();
  });

  it('get Activity by id => throw error', async () => {
    const { getActivityMock } = ActivityMockService(activity);
    expect(async () => await activity.getActivity('34')).rejects.toThrow(
      ' should be atleast 2 length',
    );
    expect(getActivityMock).toHaveBeenCalled();
  });

  it('get Activitys', async () => {
    const { getActivitysMock } = ActivityMockService(activity);
    const { activities } = await activity.getActivities();
    expect(activities.length).toBeGreaterThanOrEqual(0);
    expect(getActivitysMock).toHaveBeenCalled();
  });
});
