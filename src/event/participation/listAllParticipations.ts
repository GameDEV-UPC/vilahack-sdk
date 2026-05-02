import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  ListParticipationErrorCode,
  ListParticipationParams,
  ListParticipationResponse,
} from "./types.js";

const LIST_ALL_PARTICIPATION_ERRORS: Record<number, ListParticipationErrorCode> = {
  ...COMMON_ERRORS,
};

export async function listAllPaticpations(
  config: Config,
  params: ListParticipationParams = {},
): Promise<ListParticipationResponse> {
  const response = await fetchClient<Unwrap<ListParticipationResponse>>(
    config,
    API_ROUTES.EVENT.PARTICIPATION.LIST,
    {
      method: "GET",
      params: params,
    },
  );

  if (!response.success) {
    return mapServiceError<ListParticipationErrorCode>(response, LIST_ALL_PARTICIPATION_ERRORS);
  }

  return { success: true, data: response.data };
}
