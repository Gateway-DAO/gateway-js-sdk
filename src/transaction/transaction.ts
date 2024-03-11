import { Sdk, transactions_queryQueryVariables } from '../../gatewaySdk';
import { errorHandler } from '../utils/errorHandler';
import { isStringValid } from '../utils/validators';

export class Transaction {
  public sdk: Sdk;

  constructor(sdk: Sdk) {
    this.sdk = sdk;
  }

  /**
   * The function `getTransaction` is an asynchronous function that queries a transaction using an ID and
   * handles any errors that occur.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * transaction.
   * @returns The `getTransaction` function is returning the result of the `this.sdk.transaction_query({
   * id: id })` function call.
   */
  async getTransaction(id: string) {
    try {
      isStringValid(id);
      return await this.sdk.transaction_query({ id: id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The `getTransactions` function is an asynchronous function that queries transactions based on a
   * given filter and returns the result.
   * @param {FilterTransactionsInput} filter - The `filter` parameter is an object that contains the
   * criteria for filtering the transactions. It is of type `FilterTransactionsInput`. The specific
   * properties and their types within this object will depend on the requirements of your application.
   * @returns the result of the `this.sdk.transactions_query({ filter: filter })` call.
   */
  async getTransactions(variables?: transactions_queryQueryVariables) {
    try {
      return await this.sdk.transactions_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getTransactionCount` is an asynchronous function that queries the transaction count,
   * with an optional parameter to show money transactions.
   * @param {boolean} [showMoneyTxs] -    The parameter "showMoneyTxs" is a boolean value that determines
   * whether or not to include money transactions in the count. If set to true, the count will include
   * money transactions. If set to false or not provided, the count will only include non-money
   * transactions.
   * @returns the result of the `this.sdk.transactionsCount_query({ showMoneyTxs })` function call.
   */
  async getTransactionCount(showMoneyTxs?: boolean) {
    try {
      return await this.sdk.transactionsCount_query({ showMoneyTxs });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }
}
