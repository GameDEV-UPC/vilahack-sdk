import { API_ROUTES } from "../routes.js";
import { fetchClient } from "../client.js";
import type { SignUpRequest, SignUpResponse } from "./types.js";

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const result = await fetchClient<void>(API_ROUTES.USER.SIGNUP, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!result.success) {
    if (result.status === 401) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: result.error.message,
      };
    }
    if (result.status === 412) {
      if (typeof result.error.type === "object" && "database" in result.error.type) {
        if (result.error.type.database === "constraint_violation") {
          return { success: false, code: "EMAIL_ALREADY_IN_USE" };
        }
      }
    }
    if (result.status === 400) {
      return {
        success: false,
        code: "INVALID_DATA",
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

  return { success: true };
}
