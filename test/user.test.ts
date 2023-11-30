import dotenv from 'dotenv';
import { Gateway } from '../src/Gateway';
import { UserIdentifierType } from '../src/types';
dotenv.config();

const DEFAULT_TIMEOUT = 10000;

let api: Gateway;

beforeAll(() => {
  api = new Gateway({
    apiKey: process.env.API_KEY!,
    token: process.env.BEARER_TOKEN!,
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

  it(
    'single user',
    async () => {
      const { user } = await api.user.getSingleUser({
        type: UserIdentifierType.GATEWAY_ID,
        value: 'sid',
      });
      expect(user?.gatewayId).toEqual('sid');
    },
    DEFAULT_TIMEOUT,
  );

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

  it('update user', async () => {
    const { updateUser } = await api.user.updateUser({
      displayName: 'siddharth9890',
    });
    expect(updateUser.displayName).toEqual('siddharth9890');
  });

  it('update profile picture', async () => {
    const { updateMyProfilePicture } = await api.user.updateMyProfilePicture(
      'https://www.tryodyssey.xyz/images/campaigns/lifi/odyssey_lifi.png',
    );
    expect(updateMyProfilePicture).toEqual(
      'https://www.tryodyssey.xyz/images/campaigns/lifi/odyssey_lifi.png',
    );
  });
});
