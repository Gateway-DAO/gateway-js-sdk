import { ethers } from 'ethers';
import { PublicKey } from '@solana/web3.js';
import { Chain } from '../common/enums';
import { STRING_VALIDATION_LENGTH } from '../common/constants';
import { FilterPDAInput } from '../../gatewaySdk/sources/Gateway';
import mime from 'mime-types';

export class ValidationService {
  /**
   * The function `validateEmail` checks if a given email address is valid based on a regular
   * expression pattern.
   * @param {string} email - The `validateEmail` function takes an email address as a parameter and
   * uses a regular expression to check if the email address is in a valid format. The regular
   * expression ensures that the email address has the correct structure with characters before and
   * after the "@" symbol, followed by a domain with at least one "."
   * @returns The `validateEmail` function returns a boolean value, either `true` if the email is valid
   * according to the regex pattern, or it throws an error if the email is not valid.
   */
  public validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error(`${email} is not valid`);
    return true;
  }

  /**
   * The function `validateString` checks if a given string meets a minimum length requirement and
   * returns a boolean value accordingly.
   * @param {string} value - The `value` parameter in the `validateString` function is a string that
   * needs to be validated for a minimum length requirement.
   * @returns The `validateString` function is returning a boolean value, which is `true` if the string
   * length is greater than `STRING_VALIDATION_LENGTH`.
   */
  public validateString(value: string): boolean {
    if (!(value.length > STRING_VALIDATION_LENGTH))
      throw new Error(
        `${value} should be atleast ${STRING_VALIDATION_LENGTH} length`,
      );
    return true;
  }

  /**
   * The function `validateURL` in TypeScript checks if a given URL is valid based on a specific
   * pattern.
   * @param {string} url - The `url` parameter is a string that represents a URL that needs to be
   * validated against a specific pattern. The `validateURL` function uses a regular expression pattern
   * to check if the provided URL matches the expected format. If the URL does not match the pattern,
   * an error is thrown indicating that the
   * @returns The `validateURL` function returns a boolean value - `true` if the provided URL matches
   * the specified pattern, and throws an error if the URL does not match the pattern.
   */
  public validateURL(url: string): boolean {
    const urlPattern =
      /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._?%&=]*)?$/;

    if (!urlPattern.test(url)) throw new Error(`${url} is not valid`);
    return true;
  }

  /**
   * The function `validateUUID` checks if a given string is a valid UUID format and returns a boolean
   * value.
   * @param {string} uuid - The `uuid` parameter is a string that represents a Universally Unique
   * Identifier (UUID). It is used to uniquely identify information in a system or application. The
   * `validateUUID` function is used to check if the provided `uuid` string matches the standard UUID
   * format.
   * @returns The `validateUUID` function returns a boolean value - `true` if the provided UUID string
   * matches the specified regex pattern, and `false` otherwise.
   */
  public validateUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(uuid)) throw new Error(`${uuid} is not valid uuid`);
    return true;
  }

  /**
   * The function `validateEtherumWallet` checks if a given string is a valid Ethereum wallet address.
   * @param {string} wallet - The `wallet` parameter is a string representing an Ethereum wallet
   * address that needs to be validated.
   * @returns If the `wallet` string passed to the `validateEtherumWallet` function is a valid Ethereum
   * wallet address, the function will return `true`. Otherwise, it will throw an error with the
   * message ` is invalid`.
   */
  public validateEtherumWallet(wallet: string): boolean {
    if (ethers.utils.isAddress(wallet)) {
      return true;
    }

    throw new Error(`${wallet} is invalid`);
  }

  /**
   * The function `validateSolanaWallet` checks if a given Solana wallet address is valid.
   * @param {string} wallet - The `wallet` parameter is a string representing a Solana wallet address
   * that needs to be validated.
   * @returns If the public key represented by the `wallet` string is on the curve, the function will
   * return `true`. Otherwise, it will throw an error indicating that the wallet is invalid.
   */
  public validateSolanaWallet(wallet: string): boolean {
    const key = new PublicKey(wallet);

    if (PublicKey.isOnCurve(key.toBytes())) {
      return true;
    }

    throw new Error(`${wallet} is invalid`);
  }

  /**
   * The function `validateWalletAddress` validates a wallet address based on the specified blockchain
   * chain (EVM or SOL).
   * @param {string} wallet - The `wallet` parameter is a string representing a cryptocurrency wallet
   * address that needs to be validated.
   * @param {Chain} chain - The `chain` parameter is an enum representing different blockchain
   * networks. In this code snippet, it is used to determine which specific validation method to call
   * based on the blockchain network specified.
   * @returns The `validateWalletAddress` function returns a boolean value based on the validation of
   * the wallet address for the specified blockchain chain. If the chain is Ethereum (Chain.EVM), it
   * calls the `validateEtherumWallet` function to validate the Ethereum wallet address. If the chain
   * is Solana (Chain.SOL), it calls the `validateSolanaWallet` function to validate the Solana wallet
   * address
   */
  public validateWalletAddress(wallet: string, chain: Chain): boolean {
    if (chain === Chain.EVM) {
      return this.validateEtherumWallet(wallet);
    } else if (chain === Chain.SOL) {
      return this.validateSolanaWallet(wallet);
    } else {
      throw new Error(`${chain} not supported yet`);
    }
  }

  /**
   * The function `validateDate` in TypeScript checks if a given string can be parsed into a valid
   * date.
   * @param {string} date - The `validateDate` function takes a `date` parameter as a string input.
   * This function attempts to parse the input string into a Date object using `new Date(date)`. If the
   * parsing is successful and the date is valid, the function returns `true`. If the parsing fails
   * (e.g
   * @returns The `validateDate` function is returning a boolean value, either `true` if the input
   * `date` is a valid date, or it will throw an error if the input `date` is not a valid date.
   */
  public validateDate(date: string): boolean {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`${date} is not valid date`);
    }
    return true;
  }

  /**
   * The function `validateDID` checks if a given string follows a specific format for a decentralized
   * identifier (DID).
   * @param {string} did - The `did` parameter is a string that represents a Decentralized Identifier
   * (DID) following a specific format. The format is expected to be in the form of
   * `did:gatewayId:gateway:` followed by a 64-character hexadecimal string.
   * @returns The `validateDID` function is returning a boolean value. It returns `true` if the
   * provided DID string matches the specified regex pattern, and it throws an error if the DID string
   * does not match the pattern.
   */
  public validateDID(did: string): boolean {
    const didRegex = /^did:gatewayid:mygateway:[0-9a-fA-F]{64}$/;
    if (!didRegex.test(did)) throw new Error(`${did} is not valid did`);

    return true;
  }

  /**
   * The function `validateObjectProperties` iterates over the properties of an object and validates
   * them based on certain conditions like checking for specific key names and data types.
   * @param obj - The `validateObjectProperties` function takes an object `obj` as a parameter. It
   * iterates over the properties of the object and performs validation based on the property names and
   * values. If the value of a property is a string, it checks the property name to determine which
   * validation method to call.
   */
  public validateObjectProperties(obj: Record<string, any>): void {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        try {
          if (key.toLocaleLowerCase() === 'did') {
            this.validateDID(obj[key]);
          } else if (key.toLocaleLowerCase().includes('id')) {
            this.validateUUID(obj[key]);
          } else if (key.toLocaleLowerCase().includes('date')) {
            this.validateDate(obj[key]);
          } else this.validateString(obj[key]);
        } catch (error) {
          throw error;
        }
      }
    }
  }

  /**
   * The function `validatePDAFilter` in TypeScript validates the dataModelIds in a FilterPDAInput
   * object by checking if they are valid UUIDs.
   * @param {FilterPDAInput} filter - The `validatePDAFilter` function takes in a `filter` object of
   * type `FilterPDAInput`. This object likely contains various properties related to filtering data,
   * such as `dataModelIds`. The function attempts to validate the `dataModelIds` by mapping over them
   * and calling the `
   */
  public validatePDAFilter(filter: FilterPDAInput): void {
    try {
      if (filter.dataModelIds) {
        filter.dataModelIds.map((id) => this.validateUUID(id));
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * This TypeScript function validates a file name by checking for missing file name or extension and
   * returns the name and MIME type of the file.
   * @param {string} fileName - The `validateFileName` function takes a `fileName` parameter, which is
   * a string representing the name of a file including its extension. The function validates the file
   * name by checking if it is not empty, if it contains both a name and an extension, and then returns
   * an object containing the name and
   * @returns The `validateFileName` function returns an object with two properties: `name` and
   * `extension`. The `name` property contains the file name without the extension, and the `extension`
   * property contains the MIME type of the file extension or defaults to 'application/octet-stream' if
   * the MIME type is not found.
   */
  public validateFileName(fileName: string): {
    name: string;
    extension: string;
  } {
    if (!fileName) {
      throw new Error('Invalid file path. File name is missing.');
    }

    const parts = fileName.split('.');

    if (parts.length < 2) {
      throw new Error('Invalid file name. File name or extension is missing.');
    }

    const extension = parts.pop() as string;
    const name = parts.join('.');
    if (!name || !extension) {
      throw new Error('Invalid file name. Name or extension is missing.');
    }
    return {
      name,
      extension: mime.contentType(extension) || 'application/octet-stream',
    };
  }
}
