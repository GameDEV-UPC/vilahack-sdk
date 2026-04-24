import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetPuzzleAllByCategoryErrorCode, GetPuzzleAllByCategoryResponse } from "./types.js";

const GET_PUZZLE_ALL_BY_CATEGORY_ERRORS: Record<number, GetPuzzleAllByCategoryErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getPuzzleAllByCategory(
  config: Config,
): Promise<GetPuzzleAllByCategoryResponse> {
  const result = await fetchClient<Unwrap<GetPuzzleAllByCategoryResponse>>(
    config,
    API_ROUTES.PUZZLE.GET_ALL_BY_CATEGORY,
    { method: "GET" },
  );

  if (!result.success) {
    return mapServiceError<GetPuzzleAllByCategoryErrorCode>(
      result,
      GET_PUZZLE_ALL_BY_CATEGORY_ERRORS,
    );
  }

  return { success: true, data: result.data };
}
