import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { CreateTeamErrorCode, CreateTeamResponse } from "./types.js";

const CREATE_TEAM_ERRORS: Record<number, CreateTeamErrorCode> = {
  ...COMMON_ERRORS,
  412: "TEAM_ALREADY_EXISTS",
};

export async function createTeam(config: Config, teamName: string): Promise<CreateTeamResponse> {
  const safeName = encodeURIComponent(teamName);
  const result = await fetchClient<string>(config, API_ROUTES.TEAM.CREATE(safeName), {
    method: "PUT",
  });

  if (!result.success) {
    return mapServiceError<CreateTeamErrorCode>(result, CREATE_TEAM_ERRORS);
  }

  return { success: true, data: result.data };
}
