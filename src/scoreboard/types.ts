import type { GlobalError, ServiceResponse } from "../types.js";

export interface Scoreboard {
  id: string;
  name: string;
  score: number;
}

export type GetScoreboardErrorCode = GlobalError;

export type GetScoreboardResponse = ServiceResponse<Scoreboard[], GetScoreboardErrorCode>;
