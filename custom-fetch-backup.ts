import { fetch } from '@whatwg-node/fetch';
import { MeshContext } from '@graphql-mesh/runtime';

type ContextModified = MeshContext & {
  token: string;
  apiKey: string;
};

export default function patchedFetch(
  url: string,
  init: RequestInit,
  context: ContextModified,
) {
  context.apiKey;
  return fetch(url, init);
}
