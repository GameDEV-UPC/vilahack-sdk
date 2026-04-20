import type { Config } from "../config.js";
import type { ApiResponse, ApiErrorResponse } from "../types.js";

interface FetchOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, any>;
  body?: unknown;
  responseType?: "json" | "text" | "blob";
}

export async function fetchClient<T = void>(
  config: Config,
  endpointPath: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  try {
    const { params, body, ...requestInit } = options;

    const base = config.baseUrl.replace(/\/+$/, "");
    const path = endpointPath.replace(/^\/+/, "");
    const url = new URL(`${base}/${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) url.searchParams.append(key, String(value));
      });
    }

    const headers = new Headers(options.headers);
    const token = await config.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    let finalBody: BodyInit | undefined;

    if (body) {
      finalBody = JSON.stringify(body);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }

    const response = await fetch(url.toString(), {
      ...requestInit,
      headers,
      ...(finalBody !== undefined ? { body: finalBody } : {}),
    });

    const contentType = response.headers.get("Content-Type") || "";

    if (!response.ok) {
      const rawErrorText = await response.text();
      try {
        const errorPayload = JSON.parse(rawErrorText) as ApiErrorResponse;
        return { success: false, status: response.status, error: errorPayload };
      } catch {
        return {
          success: false,
          status: response.status,
          error: {
            message: rawErrorText || `Server returned ${response.status}`,
            type: "internal",
          },
        };
      }
    }

    if (
      options.responseType === "blob" ||
      contentType.includes("application/octet-stream") ||
      contentType.includes("application/gzip")
    ) {
      const data = (await response.blob()) as unknown as T;
      return { success: true, status: response.status, data };
    }

    if (options.responseType === "text") {
      const data = (await response.text()) as unknown as T;
      return { success: true, status: response.status, data };
    }

    const rawText = await response.text();
    let data: T;

    if (options.responseType === "json" || contentType.includes("application/json")) {
      data = rawText ? (JSON.parse(rawText) as T) : ({} as T);
    } else {
      data = rawText as unknown as T;
    }

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
