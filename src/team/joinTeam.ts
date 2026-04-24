import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { JoinTeamErrorCode, JoinTeamParams, JoinTeamResponse } from "./types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { COMMON_ERRORS } from "../constants/api.js";
import type { Unwrap } from "../types.js";

const JOIN_TEAM_ERRORS: Record<number, JoinTeamErrorCode> = {
  ...COMMON_ERRORS,
  404: "TEAM_FULL",
};

export async function joinTeam(config: Config, params: JoinTeamParams): Promise<JoinTeamResponse> {
  const result = await fetchClient<Unwrap<JoinTeamResponse>>(config, API_ROUTES.TEAM.JOIN, {
    method: "PUT",
    params: params,
  });

  if (!result.success) {
    if (result.status === 412) {
      const msg = result.error.message.toLowerCase();

      let specificCode: JoinTeamErrorCode = "SERVER_ERROR";
      if (msg.includes("member_of_pkey")) specificCode = "ALREADY_IN_TEAM";
      if (msg.includes("member_of_team_fkey")) specificCode = "TEAM_NOT_FOUND";

      return {
        success: false,
        code: specificCode,
        message: result.error.message,
        rawError: result.error,
      };
    }

    return mapServiceError<JoinTeamErrorCode>(result, JOIN_TEAM_ERRORS);
  }

  return { success: true, data: result.data };
}
