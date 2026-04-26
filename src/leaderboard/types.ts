import type { GlobalError, ServiceResponse } from "../types.js";

export interface Leaderboard {
  id: string;
  name: string;
  score: number;
}

export type GetLeaderboardErrorCode = GlobalError;

export type GetLeaderboardResponse = ServiceResponse<Leaderboard[], GetLeaderboardErrorCode>;
