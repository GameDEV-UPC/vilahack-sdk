import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  ListApplicationSummariesErrorCode,
  ListApplicationSummariesResponse,
} from "./types.js";

const LIST_APPLICATION_SUMMARIES_ERRORS: Record<number, ListApplicationSummariesErrorCode> = {
  ...COMMON_ERRORS,
};

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
    return mapServiceError<ListApplicationSummariesErrorCode>(
      result,
      LIST_APPLICATION_SUMMARIES_ERRORS,
    );
  }

  return { success: true, data: result.data };
}
