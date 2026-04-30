import type { Config } from "../config.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { API_ROUTES } from "../routes.js";
import type { Unwrap } from "../types.js";
import { mapServiceError } from "../utils/errorHandler.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetPuzzleFilesErrorCode, GetPuzzleFilesResponse, PuzzleParams } from "./types.js";

const GET_PUZZLE_FILES_ERRORS: Record<number, GetPuzzleFilesErrorCode> = {
  ...COMMON_ERRORS,
  401: "NOT_IN_NETWORK",
  404: "PUZZLE_NOT_FOUND",
};

export async function getPuzzleFiles(
  config: Config,
  params: PuzzleParams,
): Promise<GetPuzzleFilesResponse> {
  const MAX_ATTEMPTS = 30;
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    const result = await fetchClient<Unwrap<GetPuzzleFilesResponse>>(
      config,
      API_ROUTES.PUZZLE.FILES,
      { method: "GET", params: params },
    );

    if (!result.success) {
      return mapServiceError<GetPuzzleFilesErrorCode>(result, GET_PUZZLE_FILES_ERRORS);
    }

    if (result.status === 206) {
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    return { success: true, data: result.data };
  }

  return { success: false, code: "SERVER_ERROR", message: "connection-timeout" };
}
