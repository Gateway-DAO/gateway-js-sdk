import {
  JWTData,
  OpenAPIClient,
  CustomConfig,
  CustomMiddlewareWithVariables,
  Environment,
} from '../common/types';
import { WalletService } from '../services/wallet-service';
import { MediaType } from 'openapi-typescript-helpers';
import { paths } from '../api';
import { Auth } from '../modules/auth/auth';
import jwt from 'jsonwebtoken';
import { routes } from '../common/routes';

/**
 * The function `parameterChecker` checks the environment parameter and returns a corresponding URL or
 * throws an error if the environment is not valid.
 * @param {Environment} environment - The `environment` parameter is used to specify the environment
 * for which you want to retrieve the corresponding URL. It should be either 'dev' for the development
 * environment or 'sandbox' for the sandbox environment.
 * @returns The function `parameterChecker` returns a string value which is the URL for the development
 * environment `https://dev.api.gateway.tech` if the input `environment` is `'dev'`. If the input
 * `environment` is not `'dev'`, it throws an error with the message 'No valid url found!. Use sandbox
 * or production url'.
 */
export const parameterChecker = (environment: Environment): string => {
  if (!environment)
    throw new Error('No url found!.Use either sandbox or production env');

  const urls = ['https://dev.api.gateway.tech'];

  if (environment === 'dev') return urls[0];
  else throw new Error('No valid url found!. Use sandbox or production url');
};

let accessToken: string | undefined = undefined;

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
  let auth = new Auth(client);

  const message = await auth.generateSignMessage();
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
