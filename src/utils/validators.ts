import { STRING_VALIDATION_LENGTH } from './constants';

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error(`${email} is not valid`);
  return true;
};

export const isStringValid = (value: string): boolean => {
  if (!(value.length > STRING_VALIDATION_LENGTH))
    throw new Error(
      `${value} should be atleast ${STRING_VALIDATION_LENGTH} length`,
    );
  return true;
};

export const isUUIDValid = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
  if (!uuidRegex.test(uuid)) throw new Error(`${uuid} is not valid`);
  return true;
};

export const isWalletAddressvalid = (address: string): boolean => {
  const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  if (!ethereumAddressRegex.test(address))
    throw new Error(`${address} is not valid`);
  return true;
};

export const isDateValid = (date: string): boolean => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error(`${date} is not valid`);
  }
  return true;
};

export const validateObjectProperties = (obj: Record<string, any>): void => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      try {
        if (key.toLocaleLowerCase().includes('id')) {
          isUUIDValid(obj[key]);
        }
        if (key.toLocaleLowerCase().includes('date')) {
          isDateValid(obj[key]);
        } else isStringValid(obj[key]);
      } catch (error) {
        throw error;
      }
    }
  }
};
