import { API_ROUTES } from "../routes.js";
import type { Config } from "../config.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetUserErrorCode, GetUserRequest, GetUserResponse, UserProfile } from "./types.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { mapServiceError } from "../utils/errorHandler.js";

const GET_USER_ERRORS: Record<number, GetUserErrorCode> = {
  ...COMMON_ERRORS,
  404: "USER_NOT_FOUND",
};

export async function getUser(config: Config, data: GetUserRequest): Promise<GetUserResponse> {
  const result = await fetchClient<UserProfile>(config, API_ROUTES.USER.GET, {
    method: "GET",
    params: data as Record<string, string | number | undefined>,
  });

  if (!result.success) {
    return mapServiceError<GetUserErrorCode>(result, GET_USER_ERRORS);
  }

  return { success: true, data: result.data };
}
