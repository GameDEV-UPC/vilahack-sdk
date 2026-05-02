// --- RAW BACKEND TYPES ---

export type AuthErrorType =
  | "invalid_format"
  | "invalid_issuer"
  | "invalid_algorithm"
  | "invalid_signature"
  | "invalid_key"
  | "invalid_claim"
  | "no_matching_key"
  | "invalid_time_range"
  | "insufficient_permissions"
  | "not_in_network"
  | "missing"
  | "unknown";

export type DatabaseErrorType =
  | "timeout"
  | "connection"
  | "pool"
  | "not_found"
  | "transaction"
  | "serialization"
  | "query"
  | "constraint_violation"
  | "unknown";

export type PuzzleErrorType =
  | "io"
  | "generator"
  | "files_missing"
  | "not_found"
  | "processing"
  | "incorrect_flag";

export type ErrorDetail =
  | { authentication: AuthErrorType }
  | { database: DatabaseErrorType }
  | { puzzle: PuzzleErrorType }
  | "internal";

export interface ApiErrorResponse {
  message: string;
  type: ErrorDetail;
}

export type ApiResponse<T = void> =
  | { success: true; status: number; data: T }
  | { success: false; status: number; error: ApiErrorResponse };

// --- SDK SERVICE TYPES (UI Wrappers) ---

export type GlobalError = "UNAUTHORIZED" | "NETWORK_ERROR" | "SERVER_ERROR" | "INVALID_DATA";

export interface ServiceError<TCode extends string> {
  success: false;
  code: TCode | GlobalError;
  message?: string;
  rawError?: ApiErrorResponse;
}

export type ServiceResponse<TData, TCode extends string = never> =
  | { success: true; data: TData }
  | ServiceError<TCode>;

export type Unwrap<T extends { success: boolean; data?: any }> = Extract<
  T,
  { success: true }
>["data"];
