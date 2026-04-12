import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetPuzzleError, GetPuzzleResponse, Puzzle } from "./types.js";

const ERROR_MAP: Record<number, GetPuzzleError> = {
  400: "INVALID_DATA",
  401: "UNAUTHORIZED",
  404: "PUZZLE_NOT_FOUND",
  500: "SERVER_ERROR",
  504: "NETWORK_ERROR",
};

export async function getPuzzle(config: Config, id: string): Promise<GetPuzzleResponse> {
  const safeId = encodeURIComponent(id);
  const result = await fetchClient<Puzzle>(config, API_ROUTES.PUZZLE.GET(safeId), {
    method: "GET",
  });

  if (!result.success) {
    const errorCode = ERROR_MAP[result.status] || "SERVER_ERROR";
    return {
      success: false,
      code: errorCode,
      message: result.error.message,
    };
  }

  return { success: true, data: result.data };
}
