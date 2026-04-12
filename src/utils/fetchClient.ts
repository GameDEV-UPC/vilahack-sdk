import type { Config } from "../config.js";
import type { ApiResponse, ApiErrorResponse } from "../types.js";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export async function fetchClient<T = void>(
  config: Config,
  endpointPath: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  try {
    const { params, ...requestInit } = options;

    const url = new URL(endpointPath, config.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) url.searchParams.append(key, value.toString());
      });
    }

    const token = await config.getToken();

    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const isFormData = requestInit.body instanceof FormData;
    if (!isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url.toString(), {
      ...requestInit,
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
