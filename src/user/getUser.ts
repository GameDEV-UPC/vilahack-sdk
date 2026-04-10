import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../client.js";
import type { GetUserResponse, UserProfile } from "./types.js";

export async function getUser(): Promise<GetUserResponse> {
  const result = await fetchClient<UserProfile>(API_ROUTES.USER.GET, {
    method: "GET",
  });

  if (!result.success) {
    if (result.status === 401) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: result.error.message,
      };
    }
    if (result.status === 404) {
      return {
        success: false,
        code: "USER_NOT_FOUND",
        message: result.error.message,
      };
    }
    if (result.status === 503) {
      return { success: false, code: "NETWORK_ERROR" };
    }

    return {
      success: false,
      code: "SERVER_ERROR",
      message: result.error.message,
    };
  }

  return { success: true, data: result.data };
}
