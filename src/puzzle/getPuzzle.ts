import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetPuzzleErrorCode, GetPuzzleResponse, Puzzle } from "./types.js";

const GET_PUZZLE_ERRORS: Record<number, GetPuzzleErrorCode> = {
  ...COMMON_ERRORS,
  404: "PUZZLE_NOT_FOUND",
};

export async function getPuzzle(config: Config, id: string): Promise<GetPuzzleResponse> {
  const safeId = encodeURIComponent(id);
  const result = await fetchClient<Puzzle>(config, API_ROUTES.PUZZLE.GET(safeId), {
    method: "GET",
  });

  if (!result.success) {
    return mapServiceError<GetPuzzleErrorCode>(result, GET_PUZZLE_ERRORS);
  }

  return { success: true, data: result.data };
}
