import { Auth } from '../../src/v3/auth/auth';
import { authStub } from '../../test/stubs/v3/auth.stub';

export const AuthMockService = (auth: Auth) => ({
  checkUsernameAvailabilityMock: jest
    .spyOn(auth.sdk, 'checkUsernameAvailability_query')
    .mockResolvedValue({
      checkUsernameAvailability: true,
    }),
  checkDIDAvailabilityMock: jest
    .spyOn(auth.sdk, 'checkDIDAvailability_query')
    .mockResolvedValue({ checkDIDAvailability: true }),
  createUserNonceMock: jest
    .spyOn(auth.sdk, 'createUserNonce_mutation')
    .mockResolvedValue({ createUserNonce: authStub().message }),
  createUserMock: jest
    .spyOn(auth.sdk, 'createUser_mutation')
    .mockResolvedValue({ createUser: authStub().jwt }),
  generateNonceMock: jest
    .spyOn(auth.sdk, 'generateNonce_mutation')
    .mockResolvedValue({
      generateNonce: {
        cipher: authStub().cipher,
        issuedAt: authStub().lastUpdated,
        message: authStub().message,
        nonce: authStub().message,
        wallet: authStub().wallet,
      },
    }),
  refreshTokenMock: jest
    .spyOn(auth.sdk, 'refreshToken_mutation')
    .mockResolvedValue({ refreshToken: authStub().jwt }),
});
