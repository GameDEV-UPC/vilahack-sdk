import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap, GlobalError } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetSuspiciousResponse } from "./types.js";

export async function getSuspicious(config: Config): Promise<GetSuspiciousResponse> {
  config.baseUrl = "http:vilahack.com:20020";
  const response = await fetchClient<Unwrap<GetSuspiciousResponse>>(
    config,
    API_ROUTES.SUSPICIOUS.GET,
    {
      method: "GET",
    },
  );

  if (!response.success) {
    return mapServiceError<GlobalError>(response, COMMON_ERRORS);
  }

  return { success: true, data: response.data };
}
