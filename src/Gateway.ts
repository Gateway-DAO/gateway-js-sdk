import { Auth } from "./Auth";
import { PDA } from "./PDA";
import { getMeshSDK, Sdk } from "../.mesh";

export class Gateway {
  // public auth: Auth;
  public pda: PDA;
  private sdk: Sdk;

  constructor({ apiKey, token }: { apiKey: string; token: string }) {
    if (!apiKey && !token) throw new Error("No token found");
    this.sdk = getMeshSDK({
      apiKey,
      token,
    });
    // this.auth = new Auth();
    this.pda = new PDA(this.sdk);
  }
}
