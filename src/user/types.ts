import type { GlobalError, ServiceResponse } from "../types.js";

export interface UserQRParams {
  m?: string;
  b?: string;
}

export type GetUserQRErrorCode = GlobalError;

export type GetUserQRResponse = ServiceResponse<string, GetUserQRErrorCode>;
