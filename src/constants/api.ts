import type { GlobalError } from "../types.js";

export const COMMON_ERRORS: Record<number, GlobalError> = {
  400: "INVALID_DATA",
  401: "UNAUTHORIZED",
  500: "SERVER_ERROR",
  504: "NETWORK_ERROR",
};
