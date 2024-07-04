import { Sdk } from '../gatewaySdk/sources/Gateway';
import { authStub } from '../test/stubs/auth.stub';

export const AuthMockService = (sdk: Sdk) => ({
  checkUsernameAvailabilityMock: jest
    .spyOn(sdk, 'checkUsernameAvailabilityQuery')
    .mockResolvedValue({
      checkUsernameAvailability: true,
    }),
  checkDIDAvailabilityMock: jest
    .spyOn(sdk, 'checkDIDAvailabilityQuery')
    .mockResolvedValue({ checkDIDAvailability: true }),
  createUserNonceMock: jest
    .spyOn(sdk, 'createUserNonceMutation')
    .mockResolvedValue({ createUserNonce: authStub().message }),
  createUserMock: jest
    .spyOn(sdk, 'createUserMutation')
    .mockResolvedValue({ createUser: authStub().jwt }),
  loginUserMock: jest
    .spyOn(sdk, 'loginUserMutation')
    .mockResolvedValue({ loginUser: authStub().jwt }),
});
