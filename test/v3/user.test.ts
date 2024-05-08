import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../gatewaySdk/sources/GatewayV3';
import { User } from '../../src/v3/user/user';
import { invalidUUID, userStub } from '../stubs/v3/user.stub';
import { UserMockService } from '../../__mocks__/v3/user.mock';
import { UserIdentifierType, UserIdentifierTypeV3 } from '../../src/types';

let user: User;

beforeAll(() => {
  user = new User(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('USER SERVICE TESTING', () => {
  it('me', async () => {
    const { meMock } = UserMockService(user);

    const { me } = await user.me();

    expect(me.did).toEqual(userStub().did);

    expect(meMock).toHaveBeenCalled();
  });

  it('single user', async () => {
    const { getSingleUserMock } = UserMockService(user);

    const res = await user.getSingleUser({
      type: UserIdentifierTypeV3.USER_ID,
      value: userStub().id,
    });

    expect(res.user?.did).toEqual(userStub().did);

    expect(getSingleUserMock).toHaveBeenCalled();
  });

  it('single user to throw error', async () => {
    const { getSingleUserMock } = UserMockService(user);

    expect(
      async () =>
        await user.getSingleUser({
          type: UserIdentifierTypeV3.USER_DID,
          value: userStub({ did: '' }).did,
        }),
    ).rejects.toThrow('');

    expect(getSingleUserMock).toHaveBeenCalled();
  });

  it('my pdas count', async () => {
    const { myPDACountMock } = UserMockService(user);

    const count = await user.myPDACount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myPDACountMock).toHaveBeenCalled();
  });

  it('my pdas count to throw error', async () => {
    const { myPDACountMock } = UserMockService(user);

    expect(
      async () =>
        await user.myPDACount({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(myPDACountMock).toHaveBeenCalled();
  });

  it('my pdas', async () => {
    const { myPDAsMock } = UserMockService(user);

    const { myPDAs } = await user.myPDAs({
      skip: 0,
      take: 10,
    });

    expect(myPDAs.length).toBeGreaterThanOrEqual(0);
    expect(myPDAsMock).toHaveBeenCalled();
  });

  it('my pdas to throw error', async () => {
    const { myPDAsMock } = UserMockService(user);

    expect(
      async () =>
        await user.myPDAs({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(myPDAsMock).toHaveBeenCalled();
  });

  it('my data models count', async () => {
    const { myDataModelsCountMock } = UserMockService(user);

    const count = await user.myDataModelsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myDataModelsCountMock).toHaveBeenCalled();
  });

  it('my activities count', async () => {
    const { myActivitiesCountMock } = UserMockService(user);

    const count = await user.myActivitiesCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myActivitiesCountMock).toHaveBeenCalled();
  });

  it('my activities', async () => {
    const { myActivitiesMock } = UserMockService(user);

    const { myActivities } = await user.myActivities();

    expect(myActivities.length).toBeGreaterThanOrEqual(0);
    expect(myActivitiesMock).toHaveBeenCalled();
  });
});
