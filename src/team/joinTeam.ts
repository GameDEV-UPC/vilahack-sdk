import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../client.js";
import type { JoinTeamResponse, TeamResponse } from "./types.js";

export async function joinTeam(data: string): Promise<JoinTeamResponse> {
  const safeId = encodeURIComponent(data);
  const result = await fetchClient<TeamResponse>(API_ROUTES.TEAM.JOIN(safeId), {
    method: "PUT",
  });

  if (!result.success) {
    if (result.status === 401) {
      return { success: false, code: "UNAUTHORIZED" };
    }

    if (result.status === 404) {
      return { success: false, code: "TEAM_FULL" };
    }

    if (result.status === 412) {
      if (typeof result.error.type === "object" && "database" in result.error.type) {
        const backendMessage = result.error.message.toLowerCase();

        if (backendMessage.includes("member_of_pkey")) {
          return { success: false, code: "ALREADY_IN_TEAM" };
        }
        if (backendMessage.includes("member_of_team_fkey")) {
          return { success: false, code: "TEAM_NOT_FOUND" };
        }
      }
      return { success: false, code: "SERVER_ERROR" };
    }

    return { success: false, code: "NETWORK_ERROR" };
  }

  return { success: true, data: result.data };
}
