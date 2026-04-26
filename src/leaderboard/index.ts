export * from "./types.js";

import type { Config } from "../config.js";
import { getLeaderboard } from "./getLeaderboard.js";
import type { GetLeaderboardResponse } from "./types.js";

export class LeaderboardModule {
  constructor(private config: Config) {}

  public async get(): Promise<GetLeaderboardResponse> {
    return getLeaderboard(this.config);
  }
}
