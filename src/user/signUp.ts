import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { SignUpErrorCode, SignUpRequest, SignUpResponse } from "./types.js";

const SIGNUP_ERRORS: Record<number, SignUpErrorCode> = {
  ...COMMON_ERRORS,
  412: "EMAIL_ALREADY_IN_USE",
};

export async function signUp(config: Config, data: SignUpRequest): Promise<SignUpResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.USER.SIGNUP, {
    method: "PUT",
    body: data,
  });

  if (!result.success) {
    return mapServiceError<SignUpErrorCode>(result, SIGNUP_ERRORS);
  }

  return { success: true, data: undefined };
}
