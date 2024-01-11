import { User } from '../src/user/user';
import { userStub, walletStub } from '../test/stubs/user.stub';

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
        profilePicture:
          'https://www.tryodyssey.xyz/images/campaigns/lifi/odyssey_lifi.png',
      }).profilePicture,
    }),
  myFinancialTransactionsCountMock: jest
    .spyOn(user.sdk, 'myFinancialTransactionsCount_query')
    .mockResolvedValue({
      myFinancialTransactionsCount: 10,
    }),
  mywalletMock: jest.spyOn(user.sdk, 'myWallet_query').mockResolvedValue({
    myWallet: walletStub(),
  }),
  // myFinancialTransactionsMock: jest
  //   .spyOn(user.sdk, 'myFinancialTransactions_query')
  //   .mockResolvedValue({
  //     myFinancialTransactions: userStub().
  //   }),
});
