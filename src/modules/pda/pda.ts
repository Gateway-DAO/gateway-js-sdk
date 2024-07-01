import axios from 'axios';
import {
  CreatePDAInput,
  FilterPDAInput,
  issuedPDAs_queryQueryVariables,
  PDACount_queryQueryVariables,
  PDAs_queryQueryVariables,
  UpdatePDAStatusInput,
  Sdk,
  UpdatePDAInput,
} from '../../../gatewaySdk/sources/Gateway';
import { Chain, PDAStatus, SignCipherEnum } from '../../common/enums';
import { errorHandler, getChain } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';
import { Config } from '../../common/types';

// secp256k1=evm by default
// Ed25519=solana

export class PDA {
  private sdk: Sdk;
  private validationService: ValidationService;
  private url: string;
  private apiKey: string;
  private authToken: string;

  constructor(sdk: Sdk, validationService: ValidationService, config: Config) {
    this.sdk = sdk;
    this.validationService = validationService;
    this.url = config.url;
    this.apiKey = config.apiKey;
    this.authToken = config.token;
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
      this.validationService.validateUUID(id);
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
      if (filter?.filter) {
        this.validationService.validatePDAFilter(filter.filter);
      }
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
      if (variables?.filter) {
        this.validationService.validatePDAFilter(variables.filter);
      }
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
      if (variables?.filter) {
        this.validationService.validatePDAFilter(variables.filter);
      }
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
      if (filter) {
        this.validationService.validatePDAFilter(filter);
      }
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
      const chain: Chain = getChain(input.signingCipher as SignCipherEnum);
      this.validationService.validateWalletAddress(input.signingKey, chain);
      this.validationService.validateObjectProperties(input.data);
      return await this.sdk.changePDAStatus_mutation({ input });
    } catch (error) {
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
      const chain: Chain = getChain(pdaInput.signingCipher as SignCipherEnum);
      this.validationService.validateWalletAddress(pdaInput.signingKey, chain);

      this.validationService.validateObjectProperties(pdaInput.data);
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
      this.validationService.validateDID(updatedPDA.did);
      this.validationService.validateString(updatedPDA.signature);

      this.validationService.validateObjectProperties(updatedPDA.data);
      return await this.sdk.updatePDA_mutation({ input: updatedPDA });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `uploadFileAsPDA` takes a file path as input and a PDA Id
   * and updates the PDA and makes it Valid
   * @param {File} file - The parameter `file` is of type `File`. Maximum file size allowed is 30 MB
   * @param {number} pdaId - The parameter `pdaId` is of type `number`. It should be valid pdaId
   * @returns a promise of type fetch response.
   */
  async uploadFileAsPDA(
    file: Buffer,
    pdaId: number,
    fileName: string,
    fileType: string,
  ) {
    try {
      const { PDA: filePda } = await this.getPDA(pdaId);

      if (filePda === undefined || filePda === null)
        throw new Error(`${pdaId} not found!`);

      if (filePda.status !== PDAStatus.PENDING)
        throw new Error(
          `${pdaId} should be in Pending status only. To upload a file`,
        );

      const formData = new FormData();
      formData.append('pdaId', BigInt(pdaId).toString());
      formData.append('file', new Blob([file], { type: fileType }), fileName);

      return await axios.post(
        `${this.url.replace('/graphql', '')}/file/upload`,
        formData,
        {
          headers: {
            'x-api-key': this.apiKey,
            Authorization: `Bearer ${this.authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    } catch (error) {
      throw new Error('File Upload failed!');
    }
  }
}
