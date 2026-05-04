export * from "./types.js";

import type { Config } from "../config.js";
import { getScoreboard } from "./getScoreboard.js";
import type { GetScoreboardResponse } from "./types.js";

export class ScoreboardModule {
  constructor(private config: Config) {}

  public async get(): Promise<GetScoreboardResponse> {
    return getScoreboard(this.config);
  }
}
