import { Auth } from '../src/auth/auth';
import { getMeshSDK } from '../.mesh';
import { AuthMockService } from '../__mocks__/auth.mock';
import { authStub } from './stubs/auth.stub';

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

  it('add email', async () => {
    const { addEmailMock } = AuthMockService(auth);

    const { email, code } = await auth.addEmail(authStub().email);

    expect(email).toBe(authStub().email);
    expect(code).toBe(authStub().code);
    expect(addEmailMock).toHaveBeenCalled();
  });

  it('add wallet', async () => {
    const { addWalletMock } = AuthMockService(auth);

    const { message } = await auth.addWallet(authStub().wallet);

    expect(message).toBe(authStub().message);
    expect(addWalletMock).toHaveBeenCalled();
  });

  it('create wallet nounce', async () => {
    const { createWalletNonceMock } = AuthMockService(auth);

    const { message } = await auth.createWalletNonce(authStub().wallet);
    expect(message).toBe(authStub().message);
    expect(createWalletNonceMock).toHaveBeenCalled();
  });
});
