import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetScoreboardErrorCode, GetScoreboardResponse } from "./types.js";

const GET_SCOREBOARD_ERRORS: Record<number, GetScoreboardErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getScoreboard(config: Config): Promise<GetScoreboardResponse> {
  const result = await fetchClient<Unwrap<GetScoreboardResponse>>(
    config,
    API_ROUTES.LEADERBOARD.GET,
    {
      method: "GET",
    },
  );

  if (!result.success) {
    return mapServiceError<GetScoreboardErrorCode>(result, GET_SCOREBOARD_ERRORS);
  }

  return { success: true, data: result.data };
}
