import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetTeamResponse, TeamResponse } from "./types.js";

export async function getTeam(config: Config): Promise<GetTeamResponse> {
  const result = await fetchClient<TeamResponse>(config, API_ROUTES.TEAM.GET, {
    method: "GET",
  });

  if (!result.success) {
    if (result.status === 401 || result.status === 403) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    if (result.status === 404) {
      return { success: false, code: "TEAM_NOT_FOUND" };
    }

    return {
      success: false,
      code: "SERVER_ERROR",
      message: result.error.message,
    };
  }

  return { success: true, data: result.data };
}
