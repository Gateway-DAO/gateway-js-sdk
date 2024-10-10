import {
  JWTData,
  OpenAPIClient,
  CustomConfig,
  CustomMiddlewareWithVariables,
  TokenManagementMode,
} from '../common/types';
import { WalletService } from '../services/wallet-service';
import { MediaType } from 'openapi-typescript-helpers';
import { paths } from '../api';
import { Auth } from '../modules/auth/auth';
import jwt from 'jsonwebtoken';
import { routes } from '../common/routes';

/**
 * The function `parameterChecker` checks for either a JWT token or a private key and returns the token
 * management mode along with the corresponding value.
 * @param {string} [jwt] - JWT (JSON Web Token) is a compact, URL-safe means of representing claims to
 * be transferred between two parties. It is commonly used for authentication and information exchange
 * in web development.
 * @param {string} [privateKey] - The `privateKey` parameter is a string that represents a private key
 * used for token management.
 * @returns The `parameterChecker` function returns an object with two properties: `mode` of type
 * `TokenManagementMode` and `value` of type `string`.
 */
export const parameterChecker = (
  jwt?: string,
  privateKey?: string,
): { mode: TokenManagementMode; value: string } => {
  let mode: TokenManagementMode;
  let value = '';

  if (privateKey) {
    mode = 'privateKey';
    value = privateKey;
  } else if (jwt) {
    mode = 'jwt';
    value = jwt;
    if (!checkJWTTokenExpiration(jwt))
      throw new Error('The provided token is expired or invalid.');
  } else {
    throw new Error('Need jwt or private key');
  }

  return { mode, value };
};

let accessToken: string | undefined = undefined;

/**
 * The function `checkJWTTokenExpiration` verifies if a JWT token is expired or not.
 * @param {string} existinToken - The `existinToken` parameter is a string representing a JWT token
 * that you want to check for expiration.
 * @returns The function `checkJWTTokenExpiration` returns a boolean value. It returns `true` if the
 * JWT token is valid and has not expired, and `false` if the token is invalid or has expired.
 */
export const checkJWTTokenExpiration = (existinToken: string): boolean => {
  try {
    const decodedToken = jwt.decode(existinToken) as JWTData | null;

    if (!decodedToken || typeof decodedToken !== 'object') {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const issueJWT = async (
  client: OpenAPIClient<paths, MediaType>,
  wallet: WalletService,
) => {
  const auth = new Auth(client);

  const message = await auth.getMessage();
  const signatureDetails = await wallet.signMessage(message);

  const jwt = await auth.login({
    message,
    signature: signatureDetails.signature,
    wallet_address: signatureDetails.signingKey,
  });
  return jwt;
};

const UNPROTECTED_ROUTES = [
  routes.AuthenticateAccount,
  routes.GenerateSignMessage,
  routes.RefreshToken,
];

export const AuthMiddleware: CustomMiddlewareWithVariables<CustomConfig> = (
  config,
) => ({
  async onRequest({ request, schemaPath }) {
    if (UNPROTECTED_ROUTES.some((pathname) => schemaPath.match(pathname))) {
      return request;
    }
    if (!accessToken) {
      accessToken = await issueJWT(config.client, config.wallet);
    } else {
      const isTokenValid = checkJWTTokenExpiration(accessToken);
      accessToken = isTokenValid
        ? accessToken
        : await issueJWT(config.client, config.wallet);
    }

    request.headers.set('Authorization', `Bearer ${accessToken}`);
    return request;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onResponse({ request, response }) {
    return response;
  },
});

/**
 * The `toRFC3339` function converts a Date object to a string in RFC 3339 format.
 * @param {Date} date - Date object that represents a specific date and time.
 * @returns The function `toRFC3339` is returning the input `date` parameter in the RFC 3339 format as
 * a string using the `toISOString` method of the `Date` object.
 */
export const toRFC3339 = (date: Date) => {
  return date.toISOString();
};
