import { Auth } from '../src/auth/auth';
import { getMeshSDK } from '../.mesh';
import { Chain } from '../src/types';
jest.mock('../src/auth/auth');

let auth: Auth;

beforeAll(() => {
  auth = new Auth(getMeshSDK());
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('auth test', () => {
  it('check username availability', async () => {
    const mockCheckUsernameAvailability = jest.fn().mockResolvedValue(false);
    (auth.checkUsernameAvailability as jest.Mock).mockImplementation(
      mockCheckUsernameAvailability,
    );

    const result = await auth.checkUsernameAvailability('test');

    expect(result).toEqual(false);
    // expect(mockCheckUsernameAvailability).toHaveBeenCalled();
    // expect(mockCheckUsernameAvailability).toHaveBeenCalledWith('test');
  });

  it('add email', async () => {
    const mockAddEmail = jest
      .fn()
      .mockResolvedValue({ email: '', code: '000000' });
    (auth.addEmail as jest.Mock).mockImplementation(mockAddEmail);

    const { email, code } = await auth.addEmail('');

    expect(email).toBe('');
    expect(code).toBe('000000');
    expect(mockAddEmail).toHaveBeenCalled();
    expect(mockAddEmail).toHaveBeenCalledWith('');
  });

  it('add wallet', async () => {
    const mockAddWallet = jest
      .fn()
      .mockResolvedValue({ message: 'wallet added' });
    (auth.addWallet as jest.Mock).mockImplementation(mockAddWallet);

    const { message } = await auth.addWallet('dummy wallet');

    expect(message).toBeDefined();
    expect(mockAddWallet).toHaveBeenCalled();
    expect(mockAddWallet).toHaveBeenCalledWith('dummy wallet');
  });

  it('create wallet nounce', async () => {
    const mockCreateWalletNonce = jest
      .fn()
      .mockResolvedValue({ message: 'nonce created' });

    (auth.createWalletNonce as jest.Mock).mockImplementation(
      mockCreateWalletNonce,
    );

    const { message } = await auth.createWalletNonce('dummy wallet');
    expect(message).toBeDefined();
    expect(mockCreateWalletNonce).toHaveBeenCalled();
  });
});
