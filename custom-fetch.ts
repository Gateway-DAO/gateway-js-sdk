import { MeshContext } from "@graphql-mesh/runtime";
import { fetch } from "@whatwg-node/fetch";

export default function patchedFetch(
  url: string,
  init: any,
  context: MeshContext
) {
  console.debug(url, init.headers);
  init.headers["Authorization"] =
    "Bearer your-token";

  return fetch(url, init);
}
