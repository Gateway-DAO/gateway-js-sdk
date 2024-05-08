import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../../gatewaySdk/sources/GatewayV3';
import { AuthMockService } from '../../__mocks__/v3/auth.mock';
import { authStub } from '../stubs/v3/auth.stub';
import { Auth } from '../../src/v3/auth/auth';
import { SignCipherEnum } from '../../src/types';

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

  it('check did availability', async () => {
    const { checkDIDAvailabilityMock } = AuthMockService(auth);

    const result = await auth.checkDIDAvailability(authStub().did);

    expect(result).toEqual(true);
    expect(checkDIDAvailabilityMock).toHaveBeenCalled();
  });

  it('check did availability to throw error', async () => {
    const { checkDIDAvailabilityMock } = AuthMockService(auth);

    expect(async () => {
      await auth.checkDIDAvailability(authStub({ did: '' }).did);
    }).rejects.toThrow(` is not valid did`);
    expect(checkDIDAvailabilityMock).toHaveBeenCalled();
  });

  it('create user nonce', async () => {
    const { createUserNonceMock } = AuthMockService(auth);

    const nonce = await auth.createUserNonce({
      did: authStub().did,
      signingKey: authStub().wallet,
    });

    expect(nonce).toEqual(authStub().message);
    expect(createUserNonceMock).toHaveBeenCalled();
  });

  it('create user nonce to throw error', async () => {
    const { createUserNonceMock } = AuthMockService(auth);

    expect(async () => {
      await auth.createUserNonce({
        did: authStub({ did: '' }).did,
        signingKey: authStub().wallet,
      });
    }).rejects.toThrow(` is not valid did`);
    expect(createUserNonceMock).toHaveBeenCalled();
  });

  it('create user', async () => {
    const { createUserMock } = AuthMockService(auth);

    const result = await auth.createUser({
      signature: authStub().signature,
      signingKey: authStub().wallet,
    });

    expect(result).toEqual(authStub().jwt);
    expect(createUserMock).toHaveBeenCalled();
  });

  it('create user to throw error', async () => {
    const { createUserMock } = AuthMockService(auth);

    expect(async () => {
      await auth.createUser({
        signature: authStub().signature,
        signingKey: authStub({ wallet: '' }).wallet,
      });
    }).rejects.toThrow(` is invalid`);
    expect(createUserMock).toHaveBeenCalled();
  });

  it('create user to throw wrong wallet error', async () => {
    const { createUserMock } = AuthMockService(auth);

    expect(async () => {
      await auth.createUser({
        signature: authStub().signature,
        signingKey: authStub().wallet,
        signingCipher: SignCipherEnum.ED25519,
      });
    }).rejects.toThrow('');
    expect(createUserMock).toHaveBeenCalled();
  });

  it('generate nonce', async () => {
    const { generateNonceMock } = AuthMockService(auth);

    const { generateNonce } = await auth.generateNonce(authStub().wallet);

    expect(generateNonce.message).toEqual(authStub().message);
    expect(generateNonceMock).toHaveBeenCalled();
  });

  it('generate nonce to throw error', async () => {
    const { generateNonceMock } = AuthMockService(auth);

    expect(async () => {
      await auth.generateNonce(authStub({ wallet: '' }).wallet);
    }).rejects.toThrow(` is invalid`);
    expect(generateNonceMock).toHaveBeenCalled();
  });

  it('generate nonce to throw wrong wallet error', async () => {
    const { generateNonceMock } = AuthMockService(auth);

    expect(async () => {
      await auth.generateNonce(authStub().wallet, SignCipherEnum.ED25519);
    }).rejects.toThrow('');
    expect(generateNonceMock).toHaveBeenCalled();
  });

  it('refresh token', async () => {
    const { refreshTokenMock } = AuthMockService(auth);

    const jwt = await auth.refreshToken({
      signature: authStub().signature,
      signingKey: authStub().wallet,
    });

    expect(jwt).toEqual(authStub().jwt);
    expect(refreshTokenMock).toHaveBeenCalled();
  });

  it('refresh token to throw error', async () => {
    const { refreshTokenMock } = AuthMockService(auth);

    expect(async () => {
      await auth.refreshToken({
        signature: authStub({ signature: '' }).signature,
        signingKey: authStub().wallet,
      });
    }).rejects.toThrow(` should be atleast 2 length`);
    expect(refreshTokenMock).toHaveBeenCalled();
  });

  it('refresh token to throw wrong wallet error', async () => {
    const { refreshTokenMock } = AuthMockService(auth);

    expect(async () => {
      await auth.refreshToken({
        signature: authStub().signature,
        signingKey: authStub().wallet,
        cipher: 'ED25519',
      });
    }).rejects.toThrow('');
    expect(refreshTokenMock).toHaveBeenCalled();
  });
});
