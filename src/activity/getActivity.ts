import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { ActivityParams, GetActivityErrorCode, GetActivityResponse } from "./types.js";

const GET_ACTIVTY_ERROR: Record<number, GetActivityErrorCode> = {
  ...COMMON_ERRORS,
  404: "ACTIVITY_NOT_FOUND",
};

export async function getActivity(
  config: Config,
  params: ActivityParams,
): Promise<GetActivityResponse> {
  const safeId = encodeURIComponent(params.id);
  const response = await fetchClient<Unwrap<GetActivityResponse>>(
    config,
    API_ROUTES.ACTIVITY.GET(safeId),
    {
      method: "GET",
    },
  );

  if (!response.success) {
    return mapServiceError<GetActivityErrorCode>(response, GET_ACTIVTY_ERROR);
  }

  return { success: true, data: response.data };
}
