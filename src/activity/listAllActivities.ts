import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { ListActivitiesErrorCode, ListActivitiesResponse } from "./types.js";

const LIST_ACTIVITIES_ERROR: Record<number, ListActivitiesErrorCode> = {
  ...COMMON_ERRORS,
};

export async function listAllActivities(config: Config): Promise<ListActivitiesResponse> {
  const response = await fetchClient<Unwrap<ListActivitiesResponse>>(
    config,
    API_ROUTES.ACTIVITY.LIST.ALL,
    {
      method: "GET",
    },
  );

  if (!response.success) {
    return mapServiceError<ListActivitiesErrorCode>(response, LIST_ACTIVITIES_ERROR);
  }

  return { success: true, data: response.data };
}
