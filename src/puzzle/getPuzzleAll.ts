import type { Config } from "../config.js";
import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetPuzzleAllError, GetPuzzleAllResponse, Puzzle } from "./types.js";

const ERROR_MAP: Record<number, GetPuzzleAllError> = {
  400: "INVALID_DATA",
  401: "UNAUTHORIZED",
  500: "SERVER_ERROR",
  504: "NETWORK_ERROR",
};

export async function getPuzzleAll(config: Config): Promise<GetPuzzleAllResponse> {
  const result = await fetchClient<Puzzle[]>(config, API_ROUTES.PUZZLE.GET_ALL, {
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
