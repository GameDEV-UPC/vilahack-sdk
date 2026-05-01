import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetNextClueErrorCode, GetNextClueResponse, PuzzleParams } from "./types.js";

const GET_NEXT_CLUE_ERRORS: Record<number, GetNextClueErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getNextClue(
  config: Config,
  params: PuzzleParams,
): Promise<GetNextClueResponse> {
  const result = await fetchClient<Unwrap<GetNextClueResponse>>(
    config,
    API_ROUTES.PUZZLE.CLUE.NEXT,
    {
      method: "GET",
      params: params,
    },
  );

  if (!result.success) {
    return mapServiceError<GetNextClueErrorCode>(result, GET_NEXT_CLUE_ERRORS);
  }

  return { success: true, data: result.data };
}
