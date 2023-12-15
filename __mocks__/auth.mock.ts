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
  getPDAMock: jest.spyOn(auth.sdk, 'PDA_query').mockResolvedValue({
    PDA: pdaStub(),
  }),
  createWalletNonceMock: jest
    .spyOn(auth.sdk, 'createWalletNonce_mutation')
    .mockResolvedValue({ createWalletNonce: authStub() }),
});
