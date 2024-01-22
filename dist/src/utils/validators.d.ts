import { Chain } from '../types';
export declare const isEmailValid: (email: string) => boolean;
export declare const isStringValid: (value: string) => boolean;
export declare const isValidUrl: (url: string) => boolean;
export declare const isUUIDValid: (uuid: string) => boolean;
export declare const validateEtherumWallet: (wallet: string) => boolean;
export declare const validateSolanaWallet: (wallet: string) => boolean;
export declare const isWalletAddressvalid: (wallet: string, chain: Chain) => boolean;
export declare const isDateValid: (date: string) => boolean;
export declare const validateObjectProperties: (obj: Record<string, any>) => void;
