import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetPuzzleErrorCode, PuzzleParams, GetPuzzleResponse } from "./types.js";

const GET_PUZZLE_ERRORS: Record<number, GetPuzzleErrorCode> = {
  ...COMMON_ERRORS,
  404: "PUZZLE_NOT_FOUND",
};

export async function getPuzzle(config: Config, params: PuzzleParams): Promise<GetPuzzleResponse> {
  const result = await fetchClient<Unwrap<GetPuzzleResponse>>(config, API_ROUTES.PUZZLE.GET, {
    method: "GET",
    params: params,
  });

  if (!result.success) {
    return mapServiceError<GetPuzzleErrorCode>(result, GET_PUZZLE_ERRORS);
  }

  return { success: true, data: result.data };
}
