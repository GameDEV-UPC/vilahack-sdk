import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type {
  ParticipateEventErrorCode,
  ParticipateEventParams,
  ParticipateEventResponse,
} from "./types.js";

const PARTICIPATE_EVENT_ERRORS: Record<number, ParticipateEventErrorCode> = {
  ...COMMON_ERRORS,
  404: "EVENT_NOT_FOUND",
  412: "ALREADY_PARTICIPATED",
};

export async function participateEvent(
  config: Config,
  params: ParticipateEventParams,
): Promise<ParticipateEventResponse> {
  const response = await fetchClient<Unwrap<ParticipateEventResponse>>(
    config,
    API_ROUTES.EVENT.PARTICIPATE,
    {
      method: "PUT",
      params: params,
    },
  );

  if (!response.success) {
    return mapServiceError<ParticipateEventErrorCode>(response, PARTICIPATE_EVENT_ERRORS);
  }

  return { success: true, data: response.data };
}
