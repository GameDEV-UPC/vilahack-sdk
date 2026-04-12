import type { Config } from "../config.js";
import type { ApiResponse, ApiErrorResponse } from "../types.js";

export async function fetchClient<T = void>(
  config: Config,
  endpointPath: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const token = await config.getToken();

    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const isFormData = options.body instanceof FormData;
    if (!isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${config.baseUrl}${endpointPath}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const rawText = await response.text();
      try {
        const errorPayload = JSON.parse(rawText) as ApiErrorResponse;
        return { success: false, status: response.status, error: errorPayload };
      } catch {
        return {
          success: false,
          status: response.status,
          error: {
            message: rawText || `Server returned ${response.status}`,
            type: "internal",
          },
        };
      }
    }
    const rawText = await response.text();
    const data = rawText ? (JSON.parse(rawText) as T) : ({} as T);
    return { success: true, status: response.status, data };
  } catch (error) {
    return {
      success: false,
      status: 503,
      error: {
        message: "Network error occurred",
        type: "internal",
      },
    };
  }
}
