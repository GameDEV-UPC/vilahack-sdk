import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetEventErrorCode, GetEventParams, GetEventResponse } from "./types.js";

const GET_EVENT_ERRORS: Record<number, GetEventErrorCode> = {
  404: "EVENT_NOT_FOUND",
};

export async function getEvent(config: Config, params: GetEventParams): Promise<GetEventResponse> {
  const response = await fetchClient<Unwrap<GetEventResponse>>(config, API_ROUTES.EVENT.GET, {
    method: "GET",
    params: params,
  });

  if (!response.success) {
    return mapServiceError<GetEventErrorCode>(response, GET_EVENT_ERRORS);
  }

  return { success: true, data: response.data };
}
