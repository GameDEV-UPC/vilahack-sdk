import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type { ListApplicationSummariesResponse } from "./types.js";

export async function listUserApplicationSummaries(
  config: Config,
): Promise<ListApplicationSummariesResponse> {
  const result = await fetchClient<Unwrap<ListApplicationSummariesResponse>>(
    config,
    API_ROUTES.USER.APPLICATION.LIST.SUMMARIES,
    {
      method: "GET",
    },
  );

  if (!result.success) {
    return mapServiceError(result, COMMON_ERRORS);
  }

  return { success: true, data: result.data };
}
