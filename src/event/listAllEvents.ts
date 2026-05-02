import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { ListEventsErrorCode, ListEventsResponse } from "./types.js";

const LIST_EVENTS_ERROR: Record<number, ListEventsErrorCode> = {
  ...COMMON_ERRORS,
};

export async function listAllEvents(config: Config): Promise<ListEventsResponse> {
  const response = await fetchClient<Unwrap<ListEventsResponse>>(
    config,
    API_ROUTES.EVENT.LIST.ALL,
    {
      method: "GET",
    },
  );

  if (!response.success) {
    return mapServiceError<ListEventsErrorCode>(response, LIST_EVENTS_ERROR);
  }

  return { success: true, data: response.data };
}
