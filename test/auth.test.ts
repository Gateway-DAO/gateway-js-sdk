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
        '0xD73e46DeBD3958F2706903A6D3644C570285EC1F',
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
