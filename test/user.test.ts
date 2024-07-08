import { GraphQLClient } from 'graphql-request';
import { Sdk, getSdk } from '../gatewaySdk/sources/Gateway';
import { invalidUUID, userStub } from './stubs/user.stub';
import { UserMockService } from '../__mocks__/user.mock';
import { UserIdentifierType } from '../src/common/enums';
import { User } from '../src/modules/user/user';
import { ValidationService } from '../src/services/validator-service';

let sdk: Sdk;
let user: User;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  user = new User(sdk, new ValidationService());
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('USER SERVICE TESTING', () => {
  it('me', async () => {
    const { meMock } = UserMockService(sdk);

    const { me } = await user.me();

    expect(me.did).toEqual(userStub().did);
    expect(meMock).toHaveBeenCalled();
  });

  it('update me', async () => {
    const { updateMeMock } = UserMockService(sdk);

    const { updateMyUser } = await user.updateMe({
      username: userStub().username,
    });

    expect(updateMyUser.did).toEqual(userStub().did);
    expect(updateMeMock).toHaveBeenCalled();
  });

  it('single user', async () => {
    const { getSingleUserMock } = UserMockService(sdk);

    const res = await user.getSingleUser({
      type: UserIdentifierType.USER_ID,
      value: userStub().id,
    });

    expect(res.user?.did).toEqual(userStub().did);
    expect(getSingleUserMock).toHaveBeenCalled();
  });

  it('single user to throw error', async () => {
    const { getSingleUserMock } = UserMockService(sdk);

    expect(
      async () =>
        await user.getSingleUser({
          type: UserIdentifierType.USER_ID,
          value: userStub({ did: '' }).did,
        }),
    ).rejects.toThrow('');

    expect(getSingleUserMock).toHaveBeenCalled();
  });

  it('my pdas count', async () => {
    const { myPDACountMock } = UserMockService(sdk);

    const count = await user.myPDACount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myPDACountMock).toHaveBeenCalled();
  });

  it('my pdas count to throw error', async () => {
    const { myPDACountMock } = UserMockService(sdk);

    expect(
      async () =>
        await user.myPDACount({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(myPDACountMock).toHaveBeenCalled();
  });

  it('my pdas', async () => {
    const { myPDAsMock } = UserMockService(sdk);

    const { myPDAs } = await user.myPDAs({
      skip: 0,
      take: 10,
    });

    expect(myPDAs.length).toBeGreaterThanOrEqual(0);
    expect(myPDAsMock).toHaveBeenCalled();
  });

  it('my pdas to throw error', async () => {
    const { myPDAsMock } = UserMockService(sdk);

    expect(
      async () =>
        await user.myPDAs({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(myPDAsMock).toHaveBeenCalled();
  });

  it('my data models count', async () => {
    const { myDataModelsCountMock } = UserMockService(sdk);

    const count = await user.myDataModelsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myDataModelsCountMock).toHaveBeenCalled();
  });

  it('my activities count', async () => {
    const { myActivitiesCountMock } = UserMockService(sdk);

    const count = await user.myActivitiesCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myActivitiesCountMock).toHaveBeenCalled();
  });

  it('my activities', async () => {
    const { myActivitiesMock } = UserMockService(sdk);

    const { myActivities } = await user.myActivities();

    expect(myActivities.length).toBeGreaterThanOrEqual(0);
    expect(myActivitiesMock).toHaveBeenCalled();
  });
});
