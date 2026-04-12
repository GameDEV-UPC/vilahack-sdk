import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type {
  GetPuzzleAllByCategoryError,
  GetPuzzleAllByCategoryResponse,
  PuzzleByCategoryMap,
} from "./types.js";

const ERROR_MAP: Record<number, GetPuzzleAllByCategoryError> = {
  400: "INVALID_DATA",
  401: "UNAUTHORIZED",
  500: "SERVER_ERROR",
  504: "NETWORK_ERROR",
};

export async function getPuzzleAllByCategory(
  config: Config,
): Promise<GetPuzzleAllByCategoryResponse> {
  const result = await fetchClient<PuzzleByCategoryMap>(
    config,
    API_ROUTES.PUZZLE.GET_ALL_BY_CATEGORY,
    { method: "GET" },
  );

  if (!result.success) {
    const errorCode = ERROR_MAP[result.status] || "SERVER_ERROR";
    return { success: false, code: errorCode, message: result.error.message };
  }

  return { success: true, data: result.data };
}
