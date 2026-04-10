import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../client.js";
import type { GetTeamResponse, TeamResponse } from "./types.js";

export async function getTeam(): Promise<GetTeamResponse> {
  const result = await fetchClient<TeamResponse>(API_ROUTES.TEAM.GET, {
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
