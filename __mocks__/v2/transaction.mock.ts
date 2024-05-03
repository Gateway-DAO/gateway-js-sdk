import { Transaction } from '../../src/v2/transaction/transaction';
import { transactionStub } from '../../test/stubs/v2/transaction.stub';

export const TransactionMockService = (transaction: Transaction) => ({
  getTransactionCountMock: jest
    .spyOn(transaction.sdk, 'transactionsCount_query')
    .mockResolvedValue({
      transactionsCount: 10,
    }),

  getTransactionMock: jest
    .spyOn(transaction.sdk, 'transaction_query')
    .mockResolvedValue({
      transaction: transactionStub(),
    }),

  getTransactionsMock: jest
    .spyOn(transaction.sdk, 'transactions_query')
    .mockResolvedValue({
      transactions: [transactionStub()],
    }),
});
