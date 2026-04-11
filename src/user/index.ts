export * from "./types.js";

import type { Config } from "../config.js";
import { getUser } from "./getUser.js";
import { signUp } from "./signUp.js";
import type { SignUpRequest } from "./types.js";

export class UserModule {
  constructor(private config: Config) {}

  public async getUser() {
    return getUser(this.config);
  }

  public async signUp(data: SignUpRequest) {
    return signUp(this.config, data);
  }
}
