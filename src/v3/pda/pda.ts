import { promises as fs } from 'fs';

import {
  CreatePDAInput,
  FilterPDAInput,
  issuedPDAs_queryQueryVariables,
  PDACount_queryQueryVariables,
  PDAs_queryQueryVariables,
  UpdatePDAStatusInput,
  Sdk,
  UpdatePDAInput,
} from '../../../gatewaySdk/sources/GatewayV3';
import { PDAStatusV3, SignCipherEnum } from '../../types';
import { errorHandler } from '../../utils/errorHandler';
import {
  validateObjectProperties,
  validatePDAFilter,
} from '../../utils/validators';
import { MAX_UPLOAD_FILE_SIZE } from '../../utils/constants';
import { validateSignature } from '../../utils/v3-crypto-helper';

export class PDA {
  public sdk: Sdk;
  private url: string;
  private apiKey: string;
  private authToken: string;

  constructor(sdk: Sdk, url: string, apiKey: string, token: string) {
    this.sdk = sdk;
    this.url = url;
    this.apiKey = apiKey;
    this.authToken = token;
  }

  /**
   * The function `getPDA` is an asynchronous function that takes an `id` parameter and returns a
   * Promise that resolves to a `PDA_queryQuery` object.
   * @param {string} id - A string representing the ID of the PDA that you
   * want to query.
   * @returns The function `getPda` is returning a Promise that resolves to a `PDA_queryQuery` object.
   */
  async getPDA(id: number) {
    try {
      return await this.sdk.PDA_query({ id });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getPDACount` is an asynchronous function that retrieves the count of PDAs
   *  based on an optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the PDAs  before counting them. It is
   * of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async getPDACount(filter?: PDACount_queryQueryVariables) {
    try {
      if (filter?.filter) validatePDAFilter(filter.filter);
      return (await this.sdk.PDACount_query(filter)).PDACount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getPDAs` retrieves PDAs based on the provided filter, order, skip, and take
   * parameters.
   * @param {PDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query.
   * @returns a Promise that resolves to a value of type PDAs_queryQuery.
   */
  async getPDAs(variables?: PDAs_queryQueryVariables) {
    try {
      if (variables?.filter) validatePDAFilter(variables.filter);
      return await this.sdk.PDAs_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuedPDAs` retrieves issued PDAs based on the provided filter, order, skip, and
   * take parameters.
   * @param {issuedPDAs_queryQueryVariables}  - - `filter`: An object that contains filter criteria for the query. It is
   * used to specify conditions that the returned PDAs must meet.
   * @returns a Promise that resolves to an object of type `issuedPDAs_queryQuery`.
   */
  async getIssuedPDAs(variables?: issuedPDAs_queryQueryVariables) {
    try {
      if (variables?.filter) validatePDAFilter(variables.filter);
      return await this.sdk.issuedPDAs_query(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuedPDAsCount` is an asynchronous function that retrieves the count of issued
   * PDAs based on an optional filter.
   * @param {FilterPDAInput} [filter] - The `filter` parameter is an optional input that allows you to
   * specify criteria for filtering the issued PDAs. It is of type `FilterPDAInput`.
   * @returns a Promise that resolves to a number.
   */
  async getIssuedPDAsCount(filter?: FilterPDAInput) {
    try {
      if (filter) validatePDAFilter(filter);
      return (await this.sdk.issuedPDAsCount_query({ filter })).issuedPDAsCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `changePDAStatus` is an asynchronous function that takes an `id` and a `status` as
   * parameters and returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
   * @param  - - `id`: The ID of the PDA  whose status needs to be changed.
   * @returns a Promise that resolves to a `changePDAStatus_mutationMutation` object.
   */
  async changePDAStatus(input: UpdatePDAStatusInput) {
    try {
      let signCipher: SignCipherEnum;
      if (input.signingCipher === undefined) {
        signCipher = SignCipherEnum.SECP256K1;
      } else if (input.signingCipher === SignCipherEnum.ED25519) {
        signCipher = SignCipherEnum.ED25519;
      } else signCipher = SignCipherEnum.SECP256K1;

      validateObjectProperties(input.data);
      validateSignature({
        signature: input.signature,
        signingKey: input.signingKey,
        signingCipher: signCipher,
        data: input.data,
      });
      return await this.sdk.changePDAStatus_mutation({ input });
    } catch (error: any) {
      console.log(error.request.variables.input);
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function creates a PDA  using the provided input and returns the result.
   * @param {CreatePDAInput} pdaInput - The `pdaInput` parameter is an object that contains the input
   * data for creating a PDA . It is of type `CreatePDAInput`.
   * @returns the result of the `createPDA_mutation` method call, which is a Promise.
   */
  async createPDA(pdaInput: CreatePDAInput) {
    try {
      let signCipher: SignCipherEnum;
      if (pdaInput.signingCipher === undefined) {
        signCipher = SignCipherEnum.SECP256K1;
      } else if (pdaInput.signingCipher === SignCipherEnum.ED25519) {
        signCipher = SignCipherEnum.ED25519;
      } else signCipher = SignCipherEnum.SECP256K1;

      validateObjectProperties(pdaInput.data);
      validateSignature({
        signature: pdaInput.signature,
        signingKey: pdaInput.signingKey,
        signingCipher: signCipher,
        data: pdaInput.data,
      });
      return await this.sdk.createPDA_mutation({ input: pdaInput });
    } catch (error: any) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updatePDA` updates a PDA  using the provided input and returns
   * the result of the mutation.
   * @param {UpdatePDAInput} updatedPDA - The parameter `updatedPDA` is of type `UpdatePDAInput`. It is
   * an input object that contains the data to update a PDA.
   * @returns a Promise that resolves to an object of type `updatePDA_mutationMutation`.
   */
  async updatePDA(updatedPDA: UpdatePDAInput) {
    try {
      let signCipher: SignCipherEnum;
      if (updatedPDA.signingCipher === undefined) {
        signCipher = SignCipherEnum.SECP256K1;
      } else if (updatedPDA.signingCipher === SignCipherEnum.ED25519) {
        signCipher = SignCipherEnum.ED25519;
      } else signCipher = SignCipherEnum.SECP256K1;

      validateObjectProperties(updatedPDA.data);
      validateSignature({
        signature: updatedPDA.signature,
        signingKey: updatedPDA.signingKey,
        signingCipher: signCipher,
        data: updatedPDA.data,
      });
      return await this.sdk.updatePDA_mutation({ input: updatedPDA });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `uploadFileAsPDA` takes a file path as input and a PDA Id
   * and updates the PDA and makes it Valid
   * @param {string} filePath - The parameter `filePath` is of type `string`. It should be valid file path. Maximum file size allowed is 30 MB
   * @param {number} pdaId - The parameter `pdaId` is of type `number`. It should be valid pdaId
   * @returns a promise of type fetch response.
   */
  async uploadFileAsPDA(filePath: string, pdaId: number) {
    try {
      const { size } = await fs.stat(filePath);

      if (size > MAX_UPLOAD_FILE_SIZE)
        throw new Error(
          `Current file size ${size} exceeds ${MAX_UPLOAD_FILE_SIZE}. Not reading file.`,
        );
      const { PDA: filePda } = await this.getPDA(pdaId);

      if (filePda === undefined || filePda === null)
        throw new Error(`${pdaId} not found!`);

      if (filePda.status !== PDAStatusV3.PENDING)
        throw new Error(
          `${pdaId} should be in Pending status only. To upload a file`,
        );

      const file = await fs.readFile(filePath, { encoding: 'base64' });
      const formData = new FormData();
      formData.append('pdaId', BigInt(pdaId).toString());
      formData.append('file', file);
      return fetch(this.url, {
        method: 'POST',
        body: formData,
        headers: {
          'x-api-key': this.apiKey,
          Authorization: `Bearer ${this.authToken}`,
        },
      });
    } catch (error) {
      throw new Error('File Upload failed!');
    }
  }
}
