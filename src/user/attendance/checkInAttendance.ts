import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  CheckInAttendanceErrorCode,
  AttendanceParams,
  CheckInAttendanceResponse,
} from "./types.js";

const CHECK_IN_ATTENDANCE_ERRORS: Record<number, CheckInAttendanceErrorCode> = {
  ...COMMON_ERRORS,
  412: "USER_ALREADY_CHECKED_IN",
};

export async function checkInAttendance(
  config: Config,
  params: AttendanceParams,
): Promise<CheckInAttendanceResponse> {
  const result = await fetchClient<Unwrap<CheckInAttendanceResponse>>(
    config,
    API_ROUTES.USER.ATTENDANCE.CHECKIN,
    {
      method: "PUT",
      params: params,
    },
  );

  if (!result.success) {
    return mapServiceError<CheckInAttendanceErrorCode>(result, CHECK_IN_ATTENDANCE_ERRORS);
  }

  return { success: true, data: result.data };
}
