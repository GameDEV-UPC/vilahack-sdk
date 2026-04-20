import type { GlobalError, ServiceResponse } from "../../types.js";

export interface AttendanceParams {
  id: string;
}
export type CheckInAttendanceErrorCode = GlobalError | "USER_ALREADY_CHECKED_IN";
export type AcceptAttendanceErrorCode = GlobalError | "USER_NOT_APPLIED";
export type ConfirmAttendanceErrorCode = GlobalError | "USER_NOT_ACCEPTED";
export type CancelAttendanceErrorCode = GlobalError | "USET_NOT_CONFIRMED";

export type CheckInAttendanceResponse = ServiceResponse<void, CheckInAttendanceErrorCode>;
export type AcceptAttendanceResponse = ServiceResponse<void, AcceptAttendanceErrorCode>;
export type ConfirmAttendanceResponse = ServiceResponse<void, ConfirmAttendanceErrorCode>;
export type CancelAttendanceResponse = ServiceResponse<void, CancelAttendanceErrorCode>;
