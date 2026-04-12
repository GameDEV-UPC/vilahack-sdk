import { API_ROUTES } from "../routes.js";
import type { Config } from "../config.js";
import { fetchClient } from "../utils/fetchClient.js";
import type { GetQRResponse, GetQRErrorCode, QRRequest } from "./types.js";
import { COMMON_ERRORS } from "../constants/api.js";
import { mapServiceError } from "../utils/errorHandler.js";

const GET_QR_ERRORS: Record<number, GetQRErrorCode> = {
  ...COMMON_ERRORS,
};

export async function getQR(config: Config, data: QRRequest = {}): Promise<GetQRResponse> {
  const result = await fetchClient<string>(config, API_ROUTES.USER.QR, {
    method: "GET",
    params: data as Record<string, string | number | undefined>,
  });

  if (!result.success) {
    return mapServiceError<GetQRErrorCode>(result, GET_QR_ERRORS);
  }

  return { success: true, data: result.data };
}
