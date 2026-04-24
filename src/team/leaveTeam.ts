import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { LeaveTeamErrorCode, LeaveTeamResponse } from "./types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { COMMON_ERRORS } from "../constants/api.js";
import type { Unwrap } from "../types.js";

const LEAVE_TEAM_ERRORS: Record<number, LeaveTeamErrorCode> = {
  ...COMMON_ERRORS,
  404: "NOT_ON_TEAM",
};

export async function leaveTeam(config: Config): Promise<LeaveTeamResponse> {
  const result = await fetchClient<Unwrap<LeaveTeamResponse>>(config, API_ROUTES.TEAM.LEAVE, {
    method: "PUT",
  });

  if (!result.success) {
    return mapServiceError<LeaveTeamErrorCode>(result, LEAVE_TEAM_ERRORS);
  }

  return { success: true, data: undefined };
}
