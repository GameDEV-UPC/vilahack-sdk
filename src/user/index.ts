export * from "./types.js";

import type { Config } from "../config.js";
import { getUser } from "./getUser.js";
import { signUp } from "./signUp.js";
import type { GetUserResponse, SignUpRequest, SignUpResponse } from "./types.js";

export class UserModule {
  constructor(private config: Config) {}

  public async get(): Promise<GetUserResponse> {
    return getUser(this.config);
  }

  public async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    return signUp(this.config, data);
  }
}
