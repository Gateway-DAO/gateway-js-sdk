import { Middleware } from 'openapi-fetch';
import jwt from 'jsonwebtoken';

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
    return request;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onResponse({ request, response, options }) {
    // todo error handler
    return response;
  },
};

type JWTData = {
  did: string;
  exp: number;
  wallet_address: string;
};

let tempToken = '';

export const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const existingJWTToken = request.headers.get('Authorization');

    if (!existingJWTToken) {
      throw new Error('Enter valid jwt token');
    }
    tempToken = existingJWTToken;

    const decodedToken: JWTData = jwt.decode(
      existingJWTToken.split('Bearer ')[1]!,
    ) as JWTData;

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken.exp;

    const timeRemaining = expirationTime - currentTime;

    if (timeRemaining <= 3600) {
      console.log(`Token is about to expire, ${new Date(decodedToken.exp)}`);
    } else {
      console.log('Token is still valid.');
      tempToken = 'changed';
    }
    request.headers.set('Authorization', `Bearer ${tempToken}`);

    return request;
  },
};
