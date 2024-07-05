import axios from 'axios';
import {
  FilterPDAInput,
  PDACountQueryQueryVariables,
  PDAsQueryQueryVariables,
  issuedPDAsQueryQueryVariables,
  Sdk,
  PDABody,
  UpdatePDAStatusData,
  UpdatePDABody,
} from '../../../gatewaySdk/sources/Gateway';
import { PDAStatus } from '../../common/enums';
import { errorHandler } from '../../helpers/helper';
import { ValidationService } from '../../services/validator-service';
import { Config } from '../../common/types';
import { WalletService } from '../../services/wallet-service';
import FormData from 'form-data';
import { MAX_UPLOAD_FILE_SIZE } from '../../common/constants';

export class PDA {
  private sdk: Sdk;
  private validationService: ValidationService;
  private config: Config;
  private wallet: WalletService;

  constructor(
    sdk: Sdk,
    validationService: ValidationService,
    config: Config,
    wallet: WalletService,
  ) {
    this.sdk = sdk;
    this.validationService = validationService;
    this.config = config;
    this.wallet = wallet;
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
      return await this.sdk.PDAQuery({ id });
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
  async getPDACount(filter?: PDACountQueryQueryVariables) {
    try {
      if (filter?.filter) {
        this.validationService.validatePDAFilter(filter.filter);
      }
      return (await this.sdk.PDACountQuery(filter)).PDACount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getPDAs` retrieves PDAs based on the provided filter, order, skip, and take
   * parameters.
   * @param {PDAsQueryQueryVariables}  - - `filter`: An object that contains filter criteria for the query.
   * @returns a Promise that resolves to a value of type PDAs_queryQuery.
   */
  async getPDAs(variables?: PDAsQueryQueryVariables) {
    try {
      if (variables?.filter) {
        this.validationService.validatePDAFilter(variables.filter);
      }
      return await this.sdk.PDAsQuery(variables);
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `getIssuedPDAs` retrieves issued PDAs based on the provided filter, order, skip, and
   * take parameters.
   * @param {issuedPDAsQueryQueryVariables}  - - `filter`: An object that contains filter criteria for the query. It is
   * used to specify conditions that the returned PDAs must meet.
   * @returns a Promise that resolves to an object of type `issuedPDAs_queryQuery`.
   */
  async getIssuedPDAs(variables?: issuedPDAsQueryQueryVariables) {
    try {
      if (variables?.filter) {
        this.validationService.validatePDAFilter(variables.filter);
      }
      return await this.sdk.issuedPDAsQuery(variables);
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
      return (await this.sdk.issuedPDAsCountQuery({ filter })).issuedPDAsCount;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `changePDAStatus` updates the status of a PDA (Personal Data Account) by signing a
   * message and sending a mutation request.
   * @param {UpdatePDAStatusData} input - The `input` parameter in the `changePDAStatus` function is of
   * type `UpdatePDAStatusData`. This parameter is used to update the status of a PDA (Personal Digital
   * Assistant) and contains the necessary data for the update operation.
   * @returns The `changePDAStatus` function is returning the result of the
   * `sdk.changePDAStatusMutation` function after passing in an object with the `data`, `signature`,
   * `signingKey`, and `signingCipher` properties.
   */
  async changePDAStatus(input: UpdatePDAStatusData) {
    try {
      this.validationService.validateObjectProperties(input);
      const { signature, signingKey } = await this.wallet.signMessage(input);

      return await this.sdk.changePDAStatusMutation({
        input: {
          data: input,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function creates a PDA  using the provided input and returns the result.
   * @param {PDABody} pdaBody - The `pdaInput` parameter is an object that contains the input
   * data for creating a PDA . It is of type `CreatePDAInput`.
   * @returns the result of the `createPDA_mutation` method call, which is a Promise.
   */
  async createPDA(pdaBody: PDABody) {
    try {
      this.validationService.validateObjectProperties(pdaBody);
      const { signature, signingKey } = await this.wallet.signMessage(pdaBody);

      return await this.sdk.createPDAMutation({
        input: {
          data: pdaBody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `updatePDA` updates a PDA  using the provided input and returns
   * the result of the mutation.
   * @param {UpdatePDABody} updatedPDABody - The parameter `updatedPDA` is of type `UpdatePDAInput`. It is
   * an input object that contains the data to update a PDA.
   * @returns a Promise that resolves to an object of type `updatePDA_mutationMutation`.
   */
  async updatePDA(updatedPDABody: UpdatePDABody) {
    try {
      this.validationService.validateObjectProperties(updatedPDABody);
      const { signature, signingKey } =
        await this.wallet.signMessage(updatedPDABody);

      return await this.sdk.updatePDAMutation({
        input: {
          data: updatedPDABody,
          signature,
          signingKey,
          signingCipher: this.config.walletType,
        },
      });
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  }

  /**
   * The function `uploadFileAsPDA` uploads a file to a server associated with a specific PDA after
   * performing validation checks.
   * @param {Buffer} file - The `file` parameter in the `uploadFileAsPDA` function is expected to be a
   * `Buffer` type. It represents the file content that you want to upload.
   * @param {number} pdaId - The `pdaId` parameter is the identification number of the PDA (Personal
   * Digital Assistant) to which the file will be uploaded.
   * @param {string} fileName - The `fileName` parameter in the `uploadFileAsPDA` function represents
   * the name of the file being uploaded. It is a string value that should include the name of the file
   * with its extension. For example, if you are uploading a file named "document.pdf", the `fileName`
   * should be same "document.pdf"
   * @returns The `uploadFileAsPDA` function returns the result of the axios POST request made to
   * upload the file to the server.
   */
  async uploadFileAsPDA(file: Buffer, pdaId: number, fileName: string) {
    try {
      const { extension, name } =
        this.validationService.validateFileName(fileName);
      const { PDA: filePda } = await this.getPDA(pdaId);

      if (filePda === undefined || filePda === null)
        throw new Error(`${pdaId} not found!`);

      if (filePda.status !== PDAStatus.PENDING)
        throw new Error(
          `${pdaId} should be in Pending status only. To upload a file`,
        );

      if (file.length > MAX_UPLOAD_FILE_SIZE)
        throw new Error(`File size max allowed is ${MAX_UPLOAD_FILE_SIZE}(mb)`);

      const formData = new FormData();
      formData.append('pdaId', BigInt(pdaId).toString());
      formData.append('file', file, {
        filename: fileName,
        contentType: extension,
      });

      return await axios.post(
        `${this.config.url.replace('/graphql', '')}/file/upload`,
        formData,
        {
          headers: {
            'x-api-key': this.config.apiKey,
            Authorization: `Bearer ${this.config.token}`,
            'Content-Type': 'multipart/form-data',
            ...formData.getHeaders(),
          },
        },
      );
    } catch (error) {
      throw new Error('File Upload failed!');
    }
  }
}
