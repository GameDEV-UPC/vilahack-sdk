import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetPuzzleAllErrorCode, GetPuzzleAllResponse } from "./types.js";

const GET_PUZZLE_ALL_ERRORS: Record<number, GetPuzzleAllErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getPuzzleAll(config: Config): Promise<GetPuzzleAllResponse> {
  const result = await fetchClient<Unwrap<GetPuzzleAllResponse>>(
    config,
    API_ROUTES.PUZZLE.GET_ALL,
    {
      method: "GET",
    },
  );

  if (!result.success) {
    return mapServiceError<GetPuzzleAllErrorCode>(result, GET_PUZZLE_ALL_ERRORS);
  }

  return { success: true, data: result.data };
}
