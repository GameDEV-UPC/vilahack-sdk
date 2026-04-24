import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type { ConfirmAttendanceErrorCode, ConfirmAttendanceResponse } from "./types.js";

const CONFIRM_ATTENDANCE_ERRORS: Record<number, ConfirmAttendanceErrorCode> = {
  ...COMMON_ERRORS,
  412: "USER_NOT_ACCEPTED",
};

export async function confirmAttendance(config: Config): Promise<ConfirmAttendanceResponse> {
  const result = await fetchClient<Unwrap<ConfirmAttendanceResponse>>(
    config,
    API_ROUTES.USER.ATTENDANCE.CONFIRM,
    {
      method: "PUT",
    },
  );

  if (!result.success) {
    return mapServiceError<ConfirmAttendanceErrorCode>(result, CONFIRM_ATTENDANCE_ERRORS);
  }

  return { success: true, data: result.data };
}
