import { API_ROUTES } from "../routes.js";
import type { Config } from "../config.js";
import { fetchClient } from "../utils/fetchClient.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { mapServiceError } from "../utils/errorHandler.js";
import type { GetUserQRResponse, GetUserQRErrorCode, UserQRRequest } from "./types.js";

const GET_QR_ERRORS: Record<number, GetUserQRErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getUserQR(
  config: Config,
  data: UserQRRequest = {},
): Promise<GetUserQRResponse> {
  const result = await fetchClient<string>(config, API_ROUTES.USER.QR, {
    method: "GET",
    params: data,
    responseType: "text",
  });

  if (!result.success) {
    return mapServiceError<GetUserQRErrorCode>(result, GET_QR_ERRORS);
  }

  return { success: true, data: result.data };
}
