import { API_ROUTES } from "../routes.js";
import type { Config } from "../config.js";
import { fetchClient } from "../utils/fetchClient.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { mapServiceError } from "../utils/errorHandler.js";
import type { CheckInUserErrorCode, CheckInUserRequest, CheckInUserResponse } from "./types.js";

const GET_USER_ERRORS: Record<number, CheckInUserErrorCode> = {
  ...COMMON_ERRORS,
  412: "USER_ALREADY_CHECKED_IN",
};

export async function checkInUser(
  config: Config,
  data: CheckInUserRequest,
): Promise<CheckInUserResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.USER.CHECKIN, {
    method: "PUT",
    params: data,
  });

  if (!result.success) {
    return mapServiceError<CheckInUserErrorCode>(result, GET_USER_ERRORS);
  }

  return { success: true, data: result.data };
}
