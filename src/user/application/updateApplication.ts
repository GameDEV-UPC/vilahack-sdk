import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  UpdateApplicationErrorCode,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
} from "./types.js";

const UPDATE_APPLICATION_ERRORS: Record<number, UpdateApplicationErrorCode> = {
  ...COMMON_ERRORS,
  412: "UPDATE_APPLICATION_ERROR",
};

export async function updateUserApplication(
  config: Config,
  data: UpdateApplicationRequest,
): Promise<UpdateApplicationResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.USER.APPLICATION.UPDATE, {
    method: "PUT",
    body: data,
  });

  if (!result.success) {
    return mapServiceError<UpdateApplicationErrorCode>(result, UPDATE_APPLICATION_ERRORS);
  }

  return { success: true, data: undefined };
}
