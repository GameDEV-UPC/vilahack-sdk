import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  AttendanceParams,
  AcceptAttendanceResponse,
  AcceptAttendanceErrorCode,
} from "./types.js";

const ACCEPT_ATTENDANCE_ERRORS: Record<number, AcceptAttendanceErrorCode> = {
  ...COMMON_ERRORS,
  412: "USER_NOT_APPLIED",
};

export async function acceptAttendance(
  config: Config,
  params: AttendanceParams,
): Promise<AcceptAttendanceResponse> {
  const result = await fetchClient<void>(config, API_ROUTES.USER.ATTENDANCE.ACCEPT, {
    method: "PUT",
    params: params,
  });

  if (!result.success) {
    return mapServiceError<AcceptAttendanceErrorCode>(result, ACCEPT_ATTENDANCE_ERRORS);
  }

  return { success: true, data: result.data };
}
