import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { UpdateTeamErrorCode, UpdateTeamResponse } from "./types.js";

const UPDATE_TEAM_ERRORS: Record<number, UpdateTeamErrorCode> = {
  ...COMMON_ERRORS,
  412: "TEAM_ALREADY_EXISTS",
};

export async function updateTeam(config: Config, newName: string): Promise<UpdateTeamResponse> {
  const safeName = encodeURIComponent(newName);
  const result = await fetchClient<void>(config, API_ROUTES.TEAM.UPDATE(safeName), {
    method: "PUT",
  });

  if (!result.success) {
    return mapServiceError<UpdateTeamErrorCode>(result, UPDATE_TEAM_ERRORS);
  }

  return { success: true, data: undefined };
}
