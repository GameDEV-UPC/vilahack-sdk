import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  SubmitApplicationRequest,
  SubmitApplicationErrorCode,
  SubmitApplicationResponse,
} from "./types.js";

const SIGNUP_ERRORS: Record<number, SubmitApplicationErrorCode> = {
  ...COMMON_ERRORS,
  412: "EMAIL_ALREADY_IN_USE",
};

export async function submitUserApplication(
  config: Config,
  data: SubmitApplicationRequest,
): Promise<SubmitApplicationResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.USER.APPLICATION.SUBMIT, {
    method: "PUT",
    body: data,
  });

  if (!result.success) {
    return mapServiceError<SubmitApplicationErrorCode>(result, SIGNUP_ERRORS);
  }

  return { success: true, data: undefined };
}
