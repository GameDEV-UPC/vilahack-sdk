import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { RequestNextClueErrorCode, RequestNextClueResponse, PuzzleParams } from "./types.js";

const GET_NEXT_CLUE_ERRORS: Record<number, RequestNextClueErrorCode> = {
  ...COMMON_ERRORS,
};

export async function requestNextClue(
  config: Config,
  params: PuzzleParams,
): Promise<RequestNextClueResponse> {
  const result = await fetchClient<Unwrap<RequestNextClueResponse>>(
    config,
    API_ROUTES.PUZZLE.CLUE.NEXT,
    {
      method: "POST",
      params: params,
    },
  );

  if (!result.success) {
    return mapServiceError<RequestNextClueErrorCode>(result, GET_NEXT_CLUE_ERRORS);
  }

  return { success: true, data: result.data };
}
