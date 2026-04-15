import { API_ROUTES } from "../routes.js";
import type { Config } from "../config.js";

import { fetchClient } from "../utils/fetchClient.js";

import { COMMON_ERRORS } from "../constants/api.js";
import { mapServiceError } from "../utils/errorHandler.js";
import type {
  GetApplicationIndexErrorCode,
  ApplicationIndex,
  GetApplicationIndexResponse,
} from "./types.js";

const GET_APLICATION_INDEX_ERRORS: Record<number, GetApplicationIndexErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getApplicationsIndex(config: Config): Promise<GetApplicationIndexResponse> {
  const result = await fetchClient<ApplicationIndex[]>(config, API_ROUTES.USER.INDEX, {
    method: "GET",
  });

  if (!result.success) {
    return mapServiceError<GetApplicationIndexErrorCode>(result, GET_APLICATION_INDEX_ERRORS);
  }

  return { success: true, data: result.data };
}
