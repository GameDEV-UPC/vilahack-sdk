import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  GetApplicationErrorCode,
  GetApplicationResponse,
  ApplicationParams,
} from "./types.js";

const GET_APPLICATION_ERRORS: Record<number, GetApplicationErrorCode> = {
  ...COMMON_ERRORS,
  404: "APPLICATION_NOT_FOUND",
};

export async function getUserApplication(
  config: Config,
  data: ApplicationParams = {},
): Promise<GetApplicationResponse> {
  const result = await fetchClient<Unwrap<GetApplicationResponse>>(
    config,
    API_ROUTES.USER.APPLICATION.GET,
    {
      method: "GET",
      params: data,
    },
  );

  if (!result.success) {
    return mapServiceError<GetApplicationErrorCode>(result, GET_APPLICATION_ERRORS);
  }

  return { success: true, data: result.data };
}
