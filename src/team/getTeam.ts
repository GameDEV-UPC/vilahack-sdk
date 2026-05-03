import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetTeamErrorCode, GetTeamParams, GetTeamResponse } from "./types.js";

const GET_TEAM_ERRORS: Record<number, GetTeamErrorCode> = {
  ...COMMON_ERRORS,
  404: "TEAM_NOT_FOUND",
};

export async function getTeam(
  config: Config,
  params: GetTeamParams = {},
): Promise<GetTeamResponse> {
  const result = await fetchClient<Unwrap<GetTeamResponse>>(config, API_ROUTES.TEAM.GET, {
    method: "GET",
    params: params,
  });

  if (!result.success) {
    return mapServiceError<GetTeamErrorCode>(result, GET_TEAM_ERRORS);
  }

  return { success: true, data: result.data };
}
