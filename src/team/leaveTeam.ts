import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { LeaveTeamResponse } from "./types.js";

export async function leaveTeam(config: Config): Promise<LeaveTeamResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.TEAM.LEAVE, {
    method: "PUT",
  });

  if (!result.success) {
    if (result.status === 401 || result.status === 403) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    if (result.status === 404) {
      return { success: false, code: "NOT_ON_TEAM" };
    }

    return {
      success: false,
      code: "SERVER_ERROR",
      message: result.error.message,
    };
  }

  return { success: true };
}
