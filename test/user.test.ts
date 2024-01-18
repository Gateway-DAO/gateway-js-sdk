import { getMeshSDK } from '../.mesh';
import { UserMockService } from '../__mocks__/user.mock';
import { UserIdentifierType } from '../src/types';
import { User } from '../src/user/user';
import { userStub, walletStub } from './stubs/user.stub';

let user: User;

beforeAll(() => {
  user = new User(getMeshSDK());
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('USER SERVICE TESTING', () => {
  it('me', async () => {
    const { meMock } = UserMockService(user);

    const { me } = await user.me();

    expect(me.gatewayId).toEqual(userStub().gatewayId);
    expect(meMock).toHaveBeenCalled();
  });

  it('single user', async () => {
    const { getSingleUserMock } = UserMockService(user);

    const res = await user.getSingleUser({
      type: UserIdentifierType.GATEWAY_ID,
      value: userStub().gatewayId!,
    });

    expect(res.user?.gatewayId).toEqual(userStub().gatewayId);
    expect(getSingleUserMock).toHaveBeenCalled();
  });

  it('my pdas count', async () => {
    const { myPDACountMock } = UserMockService(user);

    const count = await user.myPDACount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myPDACountMock).toHaveBeenCalled();
  });

  it('my pdas', async () => {
    const { myPDAsMock } = UserMockService(user);

    const { myPDAs } = await user.myPDAs({
      skip: 0,
      take: 10,
    });

    expect(myPDAs.length).toBeGreaterThanOrEqual(0);
    expect(myPDAsMock).toHaveBeenCalled();
  });

  it('my data models count', async () => {
    const { myDataModelsCountMock } = UserMockService(user);

    const count = await user.myDataModelsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myDataModelsCountMock).toHaveBeenCalled();
  });

  it('my data requests template count', async () => {
    const { myDataRequestTemplatesCountMock } = UserMockService(user);

    const count = await user.myDataRequestTemplatesCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myDataRequestTemplatesCountMock).toHaveBeenCalled();
  });

  it('my financial transactions', async () => {
    const { myFinancialTransactionsMock } = UserMockService(user);

    const { myFinancialTransactions } = await user.myFinancialTransactions();

    expect(myFinancialTransactions.length).toBeGreaterThanOrEqual(0);
    expect(myFinancialTransactionsMock).toHaveBeenCalled();
  });

  it('my financial transactions count', async () => {
    const { myFinancialTransactionsCountMock } = UserMockService(user);

    const count = await user.myFinancialTransactionsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(myFinancialTransactionsCountMock).toHaveBeenCalled();
  });

  // it('my transactions', async () => {
  //   const { myDataRequestTemplatesCountMock } = UserMockService(user);

  //   const count = await user.myTransactions();

  //   expect(count).toBeGreaterThanOrEqual(0);
  //   expect(myDataRequestTemplatesCountMock).toHaveBeenCalled();
  // });

  it('my wallet', async () => {
    const { mywalletMock } = UserMockService(user);

    const { myWallet } = await user.myWallet();

    expect(myWallet.balance).toBe(walletStub().balance);
    expect(mywalletMock).toHaveBeenCalled();
  });

  it('update user', async () => {
    const { updateUserMock } = UserMockService(user);

    const { updateUser } = await user.updateUser({
      displayName: userStub().displayName!,
    });
    expect(updateUser.displayName!).toEqual(userStub().displayName!);
    expect(updateUserMock).toHaveBeenCalled();
  });

  it('update user display name', async () => {
    const { updateUserDisplayNameMock } = UserMockService(user);

    const { updateMyDisplayName } = await user.updateMyDisplayName(
      userStub().displayName!,
    );
    expect(updateMyDisplayName).toEqual(userStub().displayName!);
    expect(updateUserDisplayNameMock).toHaveBeenCalled();
  });

  it('update user gateway id', async () => {
    const { updateUserGatewayIdMock } = UserMockService(user);

    const { updateMyGatewayId } = await user.updateMyGatewayId(
      userStub().displayName!,
    );
    expect(updateMyGatewayId.displayName).toEqual(userStub().displayName!);
    expect(updateUserGatewayIdMock).toHaveBeenCalled();
  });

  it('update user notification email', async () => {
    const { updateUserNotificationEmaailMock } = UserMockService(user);

    const { user: updatedUser } = await user.updateNotificationEmail(
      userStub().email!,
    );
    expect(updatedUser.email).toEqual(userStub().email!);
    expect(updateUserNotificationEmaailMock).toHaveBeenCalled();
  });

  it('update profile picture', async () => {
    const { updateMyProfilePictureMock } = UserMockService(user);

    const { updateMyProfilePicture } = await user.updateMyProfilePicture(
      userStub().profilePicture!,
    );

    expect(updateMyProfilePicture).toEqual(userStub().profilePicture!);
    expect(updateMyProfilePictureMock).toHaveBeenCalled();
  });
});
