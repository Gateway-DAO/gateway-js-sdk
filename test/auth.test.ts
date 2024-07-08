import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from '../gatewaySdk/sources/Gateway';
import { Auth } from '../src/modules/auth/auth';
import { authStub } from './stubs/auth.stub';

import { AuthMockService } from '../__mocks__/auth.mock';
import { ValidationService } from '../src/services/validator-service';
import { SignCipherEnum } from '../src/common/enums';

let sdk: Sdk;
let auth: Auth;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  auth = new Auth(sdk, new ValidationService());
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('AUTH SERVICE TESTING', () => {
  it('check username availability', async () => {
    const { checkUsernameAvailabilityMock } = AuthMockService(sdk);

    const result = await auth.checkUsernameAvailability(authStub().username);

    expect(result).toEqual(true);
    expect(checkUsernameAvailabilityMock).toHaveBeenCalled();
  });

  it('check username availability to throw error', async () => {
    const { checkUsernameAvailabilityMock } = AuthMockService(sdk);

    expect(async () => {
      await auth.checkUsernameAvailability(authStub({ username: '' }).username);
    }).rejects.toThrow(' should be atleast 2 length');
    expect(checkUsernameAvailabilityMock).toHaveBeenCalled();
  });

  it('check did availability', async () => {
    const { checkDIDAvailabilityMock } = AuthMockService(sdk);

    const result = await auth.checkDIDAvailability(authStub().did);

    expect(result).toEqual(true);
    expect(checkDIDAvailabilityMock).toHaveBeenCalled();
  });

  it('check did availability to throw error', async () => {
    const { checkDIDAvailabilityMock } = AuthMockService(sdk);

    expect(async () => {
      await auth.checkDIDAvailability(authStub({ did: '' }).did);
    }).rejects.toThrow(` is not valid did`);
    expect(checkDIDAvailabilityMock).toHaveBeenCalled();
  });

  it('create user nonce', async () => {
    const { createUserNonceMock } = AuthMockService(sdk);

    const nonce = await auth.createUserNonce({
      did: authStub().did,
      signingKey: authStub().wallet,
    });

    expect(nonce).toEqual(authStub().message);
    expect(createUserNonceMock).toHaveBeenCalled();
  });

  it('create user nonce to throw error', async () => {
    const { createUserNonceMock } = AuthMockService(sdk);

    expect(async () => {
      await auth.createUserNonce({
        did: authStub({ did: '' }).did,
        signingKey: authStub().wallet,
      });
    }).rejects.toThrow(` is not valid did`);
    expect(createUserNonceMock).toHaveBeenCalled();
  });

  it('create user', async () => {
    const { createUserMock } = AuthMockService(sdk);

    const result = await auth.createUser({
      signature: authStub().signature,
      signingKey: authStub().wallet,
    });

    expect(result).toEqual(authStub().jwt);
    expect(createUserMock).toHaveBeenCalled();
  });

  it('create user to throw error', async () => {
    const { createUserMock } = AuthMockService(sdk);

    expect(async () => {
      await auth.createUser({
        signature: authStub().signature,
        signingKey: authStub({ wallet: '' }).wallet,
      });
    }).rejects.toThrow(` is invalid`);
    expect(createUserMock).toHaveBeenCalled();
  });

  it('create user to throw wrong wallet error', async () => {
    const { createUserMock } = AuthMockService(sdk);

    expect(async () => {
      await auth.createUser({
        signature: authStub().signature,
        signingKey: authStub().wallet,
        signingCipher: SignCipherEnum.ED25519,
      });
    }).rejects.toThrow('');
    expect(createUserMock).toHaveBeenCalled();
  });

  it('login user', async () => {
    const { loginUserMock } = AuthMockService(sdk);

    const jwt = await auth.loginUser({
      signature: authStub().signature,
      signingKey: authStub().wallet,
      did: authStub().did,
    });

    expect(jwt).toEqual(authStub().jwt);
    expect(loginUserMock).toHaveBeenCalled();
  });

  it('login user to throw error', async () => {
    const { loginUserMock } = AuthMockService(sdk);

    expect(async () => {
      await auth.loginUser({
        signature: authStub({ signature: '' }).signature,
        signingKey: authStub().wallet,
        did: authStub().did,
      });
    }).rejects.toThrow(` should be atleast 2 length`);
    expect(loginUserMock).toHaveBeenCalled();
  });

  it('login user to throw wrong wallet error', async () => {
    const { loginUserMock } = AuthMockService(sdk);

    expect(async () => {
      await auth.loginUser({
        signature: authStub({ signature: '' }).signature,
        signingKey: authStub().wallet,
        did: authStub().did,
      });
    }).rejects.toThrow('');
    expect(loginUserMock).toHaveBeenCalled();
  });
});
