import { Middleware } from 'openapi-fetch';

/**
 * The function `parameterChecker` validates a token and URL, ensuring the URL is from a specific list
 * of valid URLs.
 * @param {string} token - The `token` parameter is a string that is used for authentication and
 * authorization purposes in the code snippet provided.
 * @param {string} url - The `url` parameter is a string that represents the URL that will be checked
 * against a list of valid URLs in the `parameterChecker` function. The function will throw an error if
 * the `url` is empty or not included in the list of valid URLs.
 * @returns The function `parameterChecker` returns a boolean value.
 */
export const parameterChecker = (token: string, url: string): boolean => {
  if (!token) throw new Error('No token found!');
  if (!url)
    throw new Error('No url found!.Use either sandbox or production url');

  const urls = ['https://dev.api.gateway.tech'];

  if (urls.includes(url)) return true;
  else throw new Error('No valid url found!. Use sandbox or production url');
};

export const networkInterceptorMiddleware: Middleware = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onRequest({ request, options }) {
    console.log(request);
    return request;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onResponse({ request, response, options }) {
    // todo error handler
    return response;
  },
};

/**
 * The `toRFC3339` function converts a Date object to a string in RFC 3339 format.
 * @param {Date} date - Date object that represents a specific date and time.
 * @returns The function `toRFC3339` is returning the input `date` parameter in the RFC 3339 format as
 * a string using the `toISOString` method of the `Date` object.
 */
export const toRFC3339 = (date: Date) => {
  return date.toISOString();
};
