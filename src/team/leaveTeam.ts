import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../client.js";
import type { LeaveTeamResponse } from "./types.js";

export async function leaveTeam(): Promise<LeaveTeamResponse> {
  const result = await fetchClient<void>(API_ROUTES.TEAM.LEAVE, {
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
