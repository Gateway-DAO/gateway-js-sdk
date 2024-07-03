import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../gatewaySdk/sources/Gateway';
import { ActivityMockService } from '../__mocks__/activity.mock';
import { activityStub } from './stubs/activity.stub';
import { Activity } from '../src/modules/activity/activity';
import { ValidationService } from '../src/services/validator-service';
import { Sdk } from '../gatewaySdk/sources/Gateway';

let sdk: Sdk;

let activity: Activity;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  activity = new Activity(sdk, new ValidationService());
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('ACTIVITY SERVICE TESTING', () => {
  it('get Activity count', async () => {
    const { getActivityCountMock } = ActivityMockService(sdk);
    const { activitiesCount } = await activity.getActivityCount();

    expect(activitiesCount).toBeGreaterThanOrEqual(10);
    expect(getActivityCountMock).toHaveBeenCalled();
  });

  it('get Activity by id', async () => {
    const { getActivityMock } = ActivityMockService(sdk);
    const { activity: activityResult } = await activity.getActivity(
      activityStub().id,
    );
    expect(activityResult.id).toEqual(activityStub().id);
    expect(getActivityMock).toHaveBeenCalled();
  });

  it('get Activity by id => throw error', async () => {
    const { getActivityMock } = ActivityMockService(sdk);
    expect(async () => await activity.getActivity('34')).rejects.toThrow(
      ' should be atleast 2 length',
    );
    expect(getActivityMock).toHaveBeenCalled();
  });

  it('get Activitys', async () => {
    const { getActivitysMock } = ActivityMockService(sdk);
    const { activities } = await activity.getActivities();
    expect(activities.length).toBeGreaterThanOrEqual(0);
    expect(getActivitysMock).toHaveBeenCalled();
  });
});
