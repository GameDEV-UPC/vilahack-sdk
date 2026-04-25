import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type {
  GetLeaderboardErrorCode,
  GetLeaderboardResponse,
  LeaderboardEntry,
} from "./types.js";

export async function getLeaderboard(config: Config): Promise<GetLeaderboardResponse> {
  const result = await fetchClient<LeaderboardEntry[]>(config, API_ROUTES.TEAM.LEADERBOARD, {
    method: "GET",
  });

  if (!result.success) {
    return mapServiceError<GetLeaderboardErrorCode>(result, COMMON_ERRORS);
  }

  return { success: true, data: result.data };
}
