import { Headers, fetch } from "@whatwg-node/fetch";
import { MeshContext } from "./.mesh";

type ContextModified = MeshContext & {
  token: string;
  apiKey: string;
};

export default function patchedFetch(
  url: string,
  init: RequestInit,
  context: ContextModified
) {
  const headers = new Headers();
  headers.set(
    "accept",
    "application/graphql-response+json application/json multipart/mixed"
  );
  headers.set("content-type", "application/json");
  headers.set("Authorization", `Bearer ${context.token}`);
  headers.set("X-Api-Key", context.apiKey);
  init.headers = headers;
  console.log(url, init);
  return fetch(url, init);
}
