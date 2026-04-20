import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { UpdateTeamErrorCode, TeamParams, UpdateTeamResponse } from "./types.js";

const UPDATE_TEAM_ERRORS: Record<number, UpdateTeamErrorCode> = {
  ...COMMON_ERRORS,
  412: "TEAM_ALREADY_EXISTS",
};

export async function updateTeam(config: Config, params: TeamParams): Promise<UpdateTeamResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.TEAM.UPDATE, {
    method: "PUT",
    params: params,
  });

  if (!result.success) {
    return mapServiceError<UpdateTeamErrorCode>(result, UPDATE_TEAM_ERRORS);
  }

  return { success: true, data: undefined };
}
