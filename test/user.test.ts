import { getMeshSDK } from '../.mesh';
import { UserIdentifierType } from '../src/types';
import { User } from '../src/user/user';

let user: User;

beforeAll(() => {
  user = new User(getMeshSDK());
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('USER Testing', () => {
  it('me', async () => {
    const { me } = await user.me();
    expect(me.gatewayId).toEqual('sid');
  });

  it('single user', async () => {
    const res = await user.getSingleUser({
      type: UserIdentifierType.GATEWAY_ID,
      value: 'sid',
    });
    expect(res.user?.gatewayId).toEqual('sid');
  });

  it('my pdas count', async () => {
    const count = await user.myPDACount({});
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('my pdas', async () => {
    const { myPDAs } = await user.myPDAs({
      skip: 0,
      take: 10,
    });
    expect(myPDAs.length).toBeGreaterThanOrEqual(0);
  });

  it('my data models count', async () => {
    const count = await user.myDataModelsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('my data requests template count', async () => {
    const count = await user.myDataRequestTemplatesCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('update user', async () => {
    const { updateUser } = await user.updateUser({
      displayName: 'siddharth9890',
    });
    expect(updateUser.displayName).toEqual('siddharth9890');
  });

  it('update profile picture', async () => {
    const { updateMyProfilePicture } = await user.updateMyProfilePicture(
      'https://www.tryodyssey.xyz/images/campaigns/lifi/odyssey_lifi.png',
    );
    expect(updateMyProfilePicture).toEqual(
      'https://www.tryodyssey.xyz/images/campaigns/lifi/odyssey_lifi.png',
    );
  });
});
