import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { UpdateUserErrorCode, UpdateUserRequest, UpdateUserResponse } from "./types.js";

const UPDATE_USER_ERRORS: Record<number, UpdateUserErrorCode> = {
  ...COMMON_ERRORS,
  412: "USER_UPDATE_ERROR",
};

export async function updateUser(
  config: Config,
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.USER.UPDATE, {
    method: "PUT",
    body: data,
  });

  if (!result.success) {
    return mapServiceError<UpdateUserErrorCode>(result, UPDATE_USER_ERRORS);
  }

  return { success: true, data: undefined };
}
