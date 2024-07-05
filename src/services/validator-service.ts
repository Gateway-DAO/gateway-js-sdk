import { ethers } from 'ethers';
import { PublicKey } from '@solana/web3.js';
import { Chain } from '../common/enums';
import { STRING_VALIDATION_LENGTH } from '../common/constants';
import { FilterPDAInput } from '../../gatewaySdk/sources/Gateway';
import mime from 'mime-types';

export class ValidationService {
  validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error(`${email} is not valid`);
    return true;
  };

  validateString = (value: string): boolean => {
    if (!(value.length > STRING_VALIDATION_LENGTH))
      throw new Error(
        `${value} should be atleast ${STRING_VALIDATION_LENGTH} length`,
      );
    return true;
  };

  validateURL = (url: string): boolean => {
    const urlPattern =
      /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._?%&=]*)?$/;

    if (!urlPattern.test(url)) throw new Error(`${url} is not valid`);
    return true;
  };

  validateUUID = (uuid: string): boolean => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(uuid)) throw new Error(`${uuid} is not valid uuid`);
    return true;
  };

  validateEtherumWallet = (wallet: string): boolean => {
    if (ethers.utils.isAddress(wallet)) {
      return true;
    }

    throw new Error(`${wallet} is invalid`);
  };

  validateSolanaWallet = (wallet: string): boolean => {
    const key = new PublicKey(wallet);

    if (PublicKey.isOnCurve(key.toBytes())) {
      return true;
    }

    throw new Error(`${wallet} is invalid`);
  };

  validateWalletAddress = (wallet: string, chain: Chain): boolean => {
    if (chain === Chain.EVM) {
      return this.validateEtherumWallet(wallet);
    } else if (chain === Chain.SOL) {
      return this.validateSolanaWallet(wallet);
    } else {
      throw new Error(`${chain} not supported yet`);
    }
  };

  validateDate = (date: string): boolean => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`${date} is not valid date`);
    }
    return true;
  };

  validateDID = (did: string): boolean => {
    const didRegex = /^did:gatewayid:\w+$/;
    if (!didRegex.test(did)) throw new Error(`${did} is not valid did`);

    return true;
  };

  validateObjectProperties = (obj: Record<string, any>): void => {
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
  };

  validatePDAFilter = (filter: FilterPDAInput) => {
    try {
      if (filter.dataModelIds) {
        filter.dataModelIds.map((id) => this.validateUUID(id));
      }
    } catch (error) {
      throw error;
    }
  };

  validateFileName = (fileName: string) => {
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
  };
}