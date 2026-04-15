import type { GlobalError, ServiceResponse } from "../types.js";

export type CheckInUserRequest = { id: string; qr?: string } | { id?: string; qr: string };

export interface UserQRRequest {
  m?: string;
  b?: string;
}

export type CheckInUserErrorCode = GlobalError | "USER_ALREADY_CHECKED_IN";
export type GetUserQRErrorCode = GlobalError;

export type CheckInUserResponse = ServiceResponse<void, CheckInUserErrorCode>;
export type GetUserQRResponse = ServiceResponse<string, GetUserQRErrorCode>;
