import { Auth } from '../src/auth/auth';
import { AuthMockService } from '../__mocks__/auth.mock';
import { authStub } from './stubs/auth.stub';
import { AuthType } from '../src/types';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../gatewaySdk';

let auth: Auth;

beforeAll(() => {
  auth = new Auth(getSdk(new GraphQLClient('')));
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

  it('check username availability to throw error', async () => {
    const { checkUsernameAvailabilityMock } = AuthMockService(auth);

    expect(async () => {
      await auth.checkUsernameAvailability(authStub({ username: '' }).username);
    }).rejects.toThrow(' should be atleast 2 length');
    expect(checkUsernameAvailabilityMock).toHaveBeenCalled();
  });

  it('add email', async () => {
    const { addEmailMock } = AuthMockService(auth);

    const { email, code } = await auth.addEmail(authStub().email);

    expect(email).toBe(authStub().email);
    expect(code).toBe(authStub().code);
    expect(addEmailMock).toHaveBeenCalled();
  });

  it('add email to throw error', async () => {
    const { addEmailMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.addEmail(authStub({ email: 'wrong-email.com' }).email),
    ).rejects.toThrow('wrong-email.com is not valid');

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

  it('add wallet to throw error', async () => {
    const { addWalletMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.addWallet(authStub({ wallet: '' }).wallet, authStub().chain),
    ).rejects.toThrow(' is invalid');

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

  it('create wallet nounce to throw error', async () => {
    const { createWalletNonceMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.createWalletNonce(
          authStub({ wallet: '' }).wallet,
          authStub().chain,
        ),
    ).rejects.toThrow(' is invalid');

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

  it('add email confirmation to throw error', async () => {
    const { addEmailConfirmationtMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.addEmailConfirmation(
          authStub({ email: 'wrong-email.com' }).email,
          authStub().code,
        ),
    ).rejects.toThrow('wrong-email.com is not valid');

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

  it('add wallet confirmation to throw error', async () => {
    const { addWalletConfirmationtMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.addWalletConfirmation({
          signature: authStub({ signature: '' }).signature,
          wallet: authStub().wallet,
        }),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(addWalletConfirmationtMock).toHaveBeenCalled();
  });

  it('delete account', async () => {
    const { deleteAccountMock } = AuthMockService(auth);

    const deleted = await auth.deleteAccount(authStub().id);

    expect(deleted).toBe(true);
    expect(deleteAccountMock).toHaveBeenCalled();
  });

  it('delete account to throw error', async () => {
    const { deleteAccountMock } = AuthMockService(auth);

    expect(
      async () => await auth.deleteAccount(authStub({ id: '' }).id),
    ).rejects.toThrow('');

    expect(deleteAccountMock).toHaveBeenCalled();
  });

  it('login email', async () => {
    const { loginEmailMock } = AuthMockService(auth);

    const { user } = await auth.loginEmail(authStub().email, authStub().code);

    expect(user.id).toBe(authStub().id);
    expect(loginEmailMock).toHaveBeenCalled();
  });

  it('login email to throw error', async () => {
    const { loginEmailMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.loginEmail(
          authStub({ email: 'wrong-email.com' }).email,
          authStub().code,
        ),
    ).rejects.toThrow('wrong-email.com is not valid');

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

  it('login wallet to throw error', async () => {
    const { loginWalletlMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.loginWallet(
          authStub().wallet,
          authStub().chain,
          authStub({ signature: '' }).signature,
        ),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(loginWalletlMock).toHaveBeenCalled();
  });

  it('refresh token', async () => {
    const { refreshTokenMock } = AuthMockService(auth);

    const { user } = await auth.refreshToken(authStub().existingRefreshToken);

    expect(user.id).toBe(authStub().id);
    expect(refreshTokenMock).toHaveBeenCalled();
  });

  it('refresh token to throw error', async () => {
    const { refreshTokenMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.refreshToken(
          authStub({ existingRefreshToken: '' }).existingRefreshToken,
        ),
    ).rejects.toThrow(' should be atleast 2 length');

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

  it('unregister auth method', async () => {
    const { unregisterAuthMethodMock } = AuthMockService(auth);

    expect(
      async () =>
        await auth.unregisterAuthMethod(
          authStub({ email: '' }).email,
          AuthType.EMAIL,
        ),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(unregisterAuthMethodMock).toHaveBeenCalled();
  });
});
