import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { SolvePuzzleErrorCode, SolvePuzzleParams, SolvePuzzleResponse } from "./types.js";

const SOLVE_PUZZLE_ERRORS: Record<number, SolvePuzzleErrorCode> = {
  ...COMMON_ERRORS,
};

export async function solvePuzzle(
  config: Config,
  params: SolvePuzzleParams,
): Promise<SolvePuzzleResponse> {
  const queryParam: Pick<SolvePuzzleParams, "flag"> = { flag: params.flag };
  const result = await fetchClient<Unwrap<SolvePuzzleResponse>>(
    config,
    API_ROUTES.PUZZLE.SOLVE(params.id),
    {
      method: "PUT",
      params: queryParam,
    },
  );

  if (!result.success) {
    return mapServiceError<SolvePuzzleErrorCode>(result, SOLVE_PUZZLE_ERRORS);
  }

  return { success: true, data: result.data };
}
