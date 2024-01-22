"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectProperties = exports.isDateValid = exports.isWalletAddressvalid = exports.validateSolanaWallet = exports.validateEtherumWallet = exports.isUUIDValid = exports.isValidUrl = exports.isStringValid = exports.isEmailValid = void 0;
const ethers_1 = require("ethers");
const web3_js_1 = require("@solana/web3.js");
const types_1 = require("../types");
const constants_1 = require("./constants");
const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
        throw new Error(`${email} is not valid`);
    return true;
};
exports.isEmailValid = isEmailValid;
const isStringValid = (value) => {
    if (!(value.length > constants_1.STRING_VALIDATION_LENGTH))
        throw new Error(`${value} should be atleast ${constants_1.STRING_VALIDATION_LENGTH} length`);
    return true;
};
exports.isStringValid = isStringValid;
const isValidUrl = (url) => {
    const urlPattern = /^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._?%&=]*)?$/;
    if (!urlPattern.test(url))
        throw new Error(`${url} is not valid`);
    return true;
};
exports.isValidUrl = isValidUrl;
const isUUIDValid = (uuid) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(uuid))
        throw new Error(`${uuid} is not valid`);
    return true;
};
exports.isUUIDValid = isUUIDValid;
const validateEtherumWallet = (wallet) => {
    if (ethers_1.ethers.utils.isAddress(wallet)) {
        return true;
    }
    throw new Error(`${wallet} is invalid`);
};
exports.validateEtherumWallet = validateEtherumWallet;
const validateSolanaWallet = (wallet) => {
    const key = new web3_js_1.PublicKey(wallet);
    if (web3_js_1.PublicKey.isOnCurve(key.toBytes())) {
        return true;
    }
    throw new Error(`${wallet} is invalid`);
};
exports.validateSolanaWallet = validateSolanaWallet;
const isWalletAddressvalid = (wallet, chain) => {
    if (chain === types_1.Chain.EVM) {
        return (0, exports.validateEtherumWallet)(wallet);
    }
    else if (chain === types_1.Chain.SOL) {
        return (0, exports.validateSolanaWallet)(wallet);
    }
    else {
        throw new Error(`${chain} not supported yet`);
    }
};
exports.isWalletAddressvalid = isWalletAddressvalid;
const isDateValid = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new Error(`${date} is not valid`);
    }
    return true;
};
exports.isDateValid = isDateValid;
const validateObjectProperties = (obj) => {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            try {
                if (key.toLocaleLowerCase().includes('id')) {
                    (0, exports.isUUIDValid)(obj[key]);
                }
                if (key.toLocaleLowerCase().includes('date')) {
                    (0, exports.isDateValid)(obj[key]);
                }
                else
                    (0, exports.isStringValid)(obj[key]);
            }
            catch (error) {
                throw error;
            }
        }
    }
};
exports.validateObjectProperties = validateObjectProperties;
