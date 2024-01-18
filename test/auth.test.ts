import { Auth } from '../src/auth/auth';
import { getMeshSDK } from '../.mesh';
import { AuthMockService } from '../__mocks__/auth.mock';
import { authStub } from './stubs/auth.stub';
import { AuthType } from '../src/types';

let auth: Auth;

beforeAll(() => {
  auth = new Auth(getMeshSDK());
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('AUTH SERVICE TESTING', () => {
  it('check username availability', async () => {
    const { checkUsernameAvailabilityMock } = AuthMockService(auth);

    const result = await auth.checkUsernameAvailability(authStub().username);

    expect(result).toEqual(true);
    expect(checkUsernameAvailabilityMock).toHaveBeenCalled();
  });

  it('check username availability fail', async () => {
    jest
      .spyOn(auth.sdk, 'checkUsernameAvailability_query')
      .mockRejectedValue(new Error('Failed'));
    expect(async () => {
      await auth.checkUsernameAvailability(authStub().username);
    }).rejects.toThrow('Failed');
  });

  it('add email', async () => {
    const { addEmailMock } = AuthMockService(auth);

    const { email, code } = await auth.addEmail(authStub().email);

    expect(email).toBe(authStub().email);
    expect(code).toBe(authStub().code);
    expect(addEmailMock).toHaveBeenCalled();
  });

  it('add wallet', async () => {
    const { addWalletMock } = AuthMockService(auth);

    const { message } = await auth.addWallet(
      authStub().wallet,
      authStub().chain,
    );

    expect(message).toBe(authStub().message);
    expect(addWalletMock).toHaveBeenCalled();
  });

  it('create wallet nounce', async () => {
    const { createWalletNonceMock } = AuthMockService(auth);

    const { message } = await auth.createWalletNonce(
      authStub().wallet,
      authStub().chain,
    );

    expect(message).toBe(authStub().message);
    expect(createWalletNonceMock).toHaveBeenCalled();
  });

  it('add email confirmation', async () => {
    const { addEmailConfirmationtMock } = AuthMockService(auth);

    const { user } = await auth.addEmailConfirmation(
      authStub().email,
      authStub().code,
    );

    expect(user.id).toBe(authStub().id);
    expect(addEmailConfirmationtMock).toHaveBeenCalled();
  });

  it('add wallet confirmation', async () => {
    const { addWalletConfirmationtMock } = AuthMockService(auth);

    const { addWalletConfirmation } = await auth.addWalletConfirmation({
      signature: authStub().signature,
      wallet: authStub().wallet,
    });
    expect(addWalletConfirmation.id).toBe(authStub().id);
    expect(addWalletConfirmationtMock).toHaveBeenCalled();
  });

  it('delete account', async () => {
    const { deleteAccountMock } = AuthMockService(auth);

    const deleted = await auth.deleteAccount(authStub().id);
    expect(deleted).toBe(true);
    expect(deleteAccountMock).toHaveBeenCalled();
  });

  it('login email', async () => {
    const { loginEmailMock } = AuthMockService(auth);

    const { user } = await auth.loginEmail(authStub().email, authStub().code);
    expect(user.id).toBe(authStub().id);
    expect(loginEmailMock).toHaveBeenCalled();
  });

  it('login wallet', async () => {
    const { loginWalletlMock } = AuthMockService(auth);

    const { user } = await auth.loginWallet(
      authStub().wallet,
      authStub().chain,
      authStub().signature,
    );
    expect(user.id).toBe(authStub().id);
    expect(loginWalletlMock).toHaveBeenCalled();
  });

  it('refresh token', async () => {
    const { refreshTokenMock } = AuthMockService(auth);

    const { user } = await auth.refreshToken(authStub().existingRefreshToken);
    expect(user.id).toBe(authStub().id);
    expect(refreshTokenMock).toHaveBeenCalled();
  });

  it('unregister auth method', async () => {
    const { unregisterAuthMethodMock } = AuthMockService(auth);

    const { unregisterAuthMethod } = await auth.unregisterAuthMethod(
      authStub().email,
      AuthType.EMAIL,
    );
    expect(unregisterAuthMethod).toBe(true);
    expect(unregisterAuthMethodMock).toHaveBeenCalled();
  });
});
