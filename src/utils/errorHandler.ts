import type { ApiResponse, ServiceError } from "../types.js";

export function mapServiceError<TCode extends string>(
  result: Extract<ApiResponse<any>, { success: false }>,
  errorMap: Record<number, TCode>,
): ServiceError<TCode> {
  const code = errorMap[result.status] || "SERVER_ERROR";

  return {
    success: false,
    code: code as TCode,
    message: result.error.message,
    rawError: result.error,
  };
}
