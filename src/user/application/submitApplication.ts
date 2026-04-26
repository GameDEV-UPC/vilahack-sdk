import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  SubmitApplicationRequest,
  SubmitApplicationErrorCode,
  SubmitApplicationResponse,
} from "./types.js";

const SUBMIT_APPLICATION_ERRORS: Record<number, SubmitApplicationErrorCode> = {
  ...COMMON_ERRORS,
  412: "EMAIL_ALREADY_IN_USE",
};

export async function submitUserApplication(
  config: Config,
  data: SubmitApplicationRequest,
): Promise<SubmitApplicationResponse> {
  const result = await fetchClient<Unwrap<SubmitApplicationResponse>>(
    config,
    API_ROUTES.USER.APPLICATION.SUBMIT,
    {
      method: "PUT",
      body: data,
    },
  );

  if (!result.success) {
    return mapServiceError<SubmitApplicationErrorCode>(result, SUBMIT_APPLICATION_ERRORS);
  }

  return { success: true, data: undefined };
}
