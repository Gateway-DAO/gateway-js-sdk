import dotenv from 'dotenv';
import { Gateway } from '../src/Gateway';

dotenv.config();
let api: Gateway;
const DEFAULT_TIMEOUT = 100000;

beforeAll(() => {
  api = new Gateway({
    apiKey: process.env.API_KEY!,
    token: process.env.BEARER_TOKEN!,
  });
});

describe('auth test', () => {
  it(
    'check username availability',
    async () => {
      const result = await api.auth.checkUsernameAvailability('sid');
      expect(result).toEqual(false);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'add email',
    async () => {
      const { email, code } = await api.auth.addEmail('sid@test.com');
      expect(email).toBe('sid@test.com');
      expect(code).toBeDefined();
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'add wallet',
    async () => {
      const { message } = await api.auth.addWallet(
        '0x3447F17f67c6c506e7d1af3504F531DE0be01C13',
      );
      expect(message.length).toBeDefined();
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'create wallet nounce',
    async () => {
      const { message } = await api.auth.createWalletNounce(
        '0xCf084430Fc2CfAd8E81716aEdeBBE4458866D239',
      );
      expect(message.length).toBeDefined();
    },
    DEFAULT_TIMEOUT,
  );
});
