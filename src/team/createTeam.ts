import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { CreateTeamResponse } from "./types.js";

export async function createTeam(config: Config, teamName: string): Promise<CreateTeamResponse> {
  const safeName = encodeURIComponent(teamName);
  const result = await fetchClient<string>(config, API_ROUTES.TEAM.CREATE(safeName), {
    method: "PUT",
  });

  if (!result.success) {
    if (result.status === 401 || result.status === 403) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    if (result.status === 412) {
      return { success: false, code: "TEAM_ALREADY_EXISTS" };
    }

    if (result.status === 400) {
      return {
        success: false,
        code: "INVALID_DATA",
        message: result.error.message,
      };
    }

    if (result.status === 503) {
      return { success: false, code: "NETWORK_ERROR" };
    }

    return {
      success: false,
      code: "SERVER_ERROR",
      message: result.error.message,
    };
  }

  return { success: true, data: result.data };
}
