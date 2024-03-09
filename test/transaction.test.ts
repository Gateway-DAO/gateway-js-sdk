import { Transaction } from '../src/transaction/transaction';
import { getSdk } from '../gatewaySdk';
import { TransactionMockService } from '../__mocks__/transaction.mock';
import { transactionStub } from './stubs/transaction.stub';
import { GraphQLClient } from 'graphql-request';

let transaction: Transaction;

beforeAll(() => {
  transaction = new Transaction(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('TRANSACTION SERVICE TESTING', () => {
  it('get transaction count', async () => {
    const { getTransactionCountMock } = TransactionMockService(transaction);
    const { transactionsCount } = await transaction.getTransactionCount(true);

    expect(transactionsCount).toBeGreaterThanOrEqual(10);
    expect(getTransactionCountMock).toHaveBeenCalled();
  });

  it('get transaction by id', async () => {
    const { getTransactionMock } = TransactionMockService(transaction);
    const { transaction: transactionResult } = await transaction.getTransaction(
      transactionStub().id,
    );
    expect(transactionResult.id).toEqual(transactionStub().id);
    expect(getTransactionMock).toHaveBeenCalled();
  });

  it('get transaction by id => throw error', async () => {
    const { getTransactionMock } = TransactionMockService(transaction);
    expect(async () => await transaction.getTransaction('34')).rejects.toThrow(
      ' should be atleast 2 length',
    );
    expect(getTransactionMock).toHaveBeenCalled();
  });

  it('get transactions', async () => {
    const { getTransactionsMock } = TransactionMockService(transaction);
    const { transactions } = await transaction.getTransactions();
    expect(transactions.length).toBeGreaterThanOrEqual(0);
    expect(getTransactionsMock).toHaveBeenCalled();
  });
});
