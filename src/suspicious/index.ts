export * from "./types.js";

import type { Config } from "../config.js";
import { getSuspicious } from "./getSuspicious.js";
import type { GetSuspiciousResponse } from "./types.js";

export class SuspiciousModule {
  constructor(private config: Config) {}

  public async get(): Promise<GetSuspiciousResponse> {
    return getSuspicious(this.config);
  }
}
