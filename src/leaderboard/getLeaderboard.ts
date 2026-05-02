import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetLeaderboardErrorCode, GetLeaderboardResponse } from "./types.js";

const GET_LEADERBOARD_ERRORS: Record<number, GetLeaderboardErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getLeaderboard(config: Config): Promise<GetLeaderboardResponse> {
  const result = await fetchClient<Unwrap<GetLeaderboardResponse>>(
    config,
    API_ROUTES.LEADERBOARD.GET,
    {
      method: "GET",
    },
  );

  if (!result.success) {
    return mapServiceError<GetLeaderboardErrorCode>(result, GET_LEADERBOARD_ERRORS);
  }

  return { success: true, data: result.data };
}
