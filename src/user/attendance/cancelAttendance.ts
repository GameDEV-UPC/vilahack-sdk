import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type { CancelAttendanceErrorCode, CancelAttendanceResponse } from "./types.js";

const CANCEL_ATTENDANCE_ERRORS: Record<number, CancelAttendanceErrorCode> = {
  ...COMMON_ERRORS,
  412: "USET_NOT_CONFIRMED",
};

export async function cancelAttendance(config: Config): Promise<CancelAttendanceResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.USER.ATTENDANCE.CANCEL, {
    method: "PUT",
  });

  if (!result.success) {
    return mapServiceError<CancelAttendanceErrorCode>(result, CANCEL_ATTENDANCE_ERRORS);
  }

  return { success: true, data: result.data };
}
