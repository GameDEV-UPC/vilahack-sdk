export type GlobalError = "UNAUTHORIZED" | "NETWORK_ERROR" | "SERVER_ERROR" | "INVALID_DATA";

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

export type ErrorDetail =
  | { authentication: AuthErrorType }
  | { database: DatabaseErrorType }
  | "internal";

export interface ApiErrorResponse {
  message: string;
  type: ErrorDetail;
}

export type ApiResponse<T = void> =
  | { success: true; status: number; data: T }
  | { success: false; status: number; error: ApiErrorResponse };
