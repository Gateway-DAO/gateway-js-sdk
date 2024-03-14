import { User } from '../src/user/user';
import { transactionStub } from '../test/stubs/transaction.stub';
import {
  financialTransactionsStub,
  userStub,
  walletStub,
} from '../test/stubs/user.stub';

export const UserMockService = (user: User) => ({
  meMock: jest.spyOn(user.sdk, 'me_query').mockResolvedValue({
    me: userStub(),
  }),
  getSingleUserMock: jest.spyOn(user.sdk, 'user_query').mockResolvedValue({
    user: userStub(),
  }),
  myPDACountMock: jest.spyOn(user.sdk, 'myPDACount_query').mockResolvedValue({
    myPDACount: 10,
  }),
  myPDAsMock: jest.spyOn(user.sdk, 'myPDAs_query').mockResolvedValue({
    myPDAs: userStub().issuedPDAs,
  }),
  myDataModelsCountMock: jest
    .spyOn(user.sdk, 'dataModelsCount_query')
    .mockResolvedValue({
      dataModelsCount: 10,
    }),
  myDataRequestTemplatesCountMock: jest
    .spyOn(user.sdk, 'myDataRequestTemplatesCount_query')
    .mockResolvedValue({
      myDataRequestTemplatesCount: 10,
    }),
  updateUserMock: jest
    .spyOn(user.sdk, 'updateUser_mutation')
    .mockResolvedValue({
      updateUser: userStub({ displayName: 'testuser02' }),
    }),
  updateMyProfilePictureMock: jest
    .spyOn(user.sdk, 'updateMyProfilePicture_mutation')
    .mockResolvedValue({
      updateMyProfilePicture: userStub({
        profilePicture: userStub().profilePicture,
      }).profilePicture,
    }),
  myFinancialTransactionsCountMock: jest
    .spyOn(user.sdk, 'myFinancialTransactionsCount_query')
    .mockResolvedValue({
      myFinancialTransactionsCount: 10,
    }),
  myTransactionsMock: jest
    .spyOn(user.sdk, 'myTransactions_query')
    .mockResolvedValue({ myTransactions: [transactionStub()] }),
  mywalletMock: jest.spyOn(user.sdk, 'myWallet_query').mockResolvedValue({
    myWallet: walletStub(),
  }),
  updateUserDisplayNameMock: jest
    .spyOn(user.sdk, 'updateMyDisplayName_mutation')
    .mockResolvedValue({
      updateMyDisplayName: userStub().displayName,
    }),
  updateUserGatewayIdMock: jest
    .spyOn(user.sdk, 'updateMyGatewayId_mutation')
    .mockResolvedValue({
      updateMyGatewayId: userStub(),
    }),
  updateUserNotificationEmaailMock: jest
    .spyOn(user.sdk, 'updateNotificationEmail_mutation')
    .mockResolvedValue({
      updateNotificationEmail: { user: userStub() },
    }),
  myFinancialTransactionsMock: jest
    .spyOn(user.sdk, 'myFinancialTransactions_query')
    .mockResolvedValue({
      myFinancialTransactions: financialTransactionsStub(),
    }),
});
