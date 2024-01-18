import { Auth } from '../src/auth/auth';
import { authStub } from '../test/stubs/auth.stub';
import { pdaStub } from '../test/stubs/pda.stub';

export const AuthMockService = (auth: Auth) => ({
  checkUsernameAvailabilityMock: jest
    .spyOn(auth.sdk, 'checkUsernameAvailability_query')
    .mockResolvedValue({
      checkUsernameAvailability: true,
    }),

  addEmailMock: jest.spyOn(auth.sdk, 'addEmail_mutation').mockResolvedValue({
    addEmail: authStub(),
  }),
  addWalletMock: jest
    .spyOn(auth.sdk, 'addWallet_mutation')
    .mockResolvedValue({ addWallet: authStub() }),
  addEmailConfirmationtMock: jest
    .spyOn(auth.sdk, 'addEmailConfirmation_mutation')
    .mockResolvedValue({ addEmailConfirmation: { user: authStub() } }),
  addWalletConfirmationtMock: jest
    .spyOn(auth.sdk, 'addWalletConfirmation_mutation')
    .mockResolvedValue({ addWalletConfirmation: authStub() }),
  loginEmailMock: jest
    .spyOn(auth.sdk, 'loginEmail_mutation')
    .mockResolvedValue({
      loginEmail: {
        user: authStub(),
        refresh_token: authStub().existingRefreshToken,
        protocol_id: authStub().id,
        token: authStub().token,
      },
    }),
  loginWalletlMock: jest
    .spyOn(auth.sdk, 'loginWallet_mutation')
    .mockResolvedValue({
      loginWallet: {
        user: authStub(),
        refresh_token: authStub().existingRefreshToken,
        protocol_id: authStub().id,
        token: authStub().token,
      },
    }),
  getPDAMock: jest.spyOn(auth.sdk, 'PDA_query').mockResolvedValue({
    PDA: pdaStub(),
  }),
  createWalletNonceMock: jest
    .spyOn(auth.sdk, 'createWalletNonce_mutation')
    .mockResolvedValue({ createWalletNonce: { message: authStub().message } }),
  deleteAccountMock: jest
    .spyOn(auth.sdk, 'deleteAccount_mutation')
    .mockResolvedValue({ deleteAccount: true }),
  refreshTokenMock: jest
    .spyOn(auth.sdk, 'refreshToken_mutation')
    .mockResolvedValue({
      refreshToken: {
        user: authStub(),
        refresh_token: authStub().existingRefreshToken,
        protocol_id: authStub().id,
        token: authStub().token,
      },
    }),
  unregisterAuthMethodMock: jest
    .spyOn(auth.sdk, 'unregisterAuthMethod_mutation')
    .mockResolvedValue({ unregisterAuthMethod: true }),
});
