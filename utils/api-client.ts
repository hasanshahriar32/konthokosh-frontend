"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useMemo } from "react";

/**
 * 🌐 API Client Configuration
 */
type ApiClientConfig = {
  baseURL?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
};

/**
 * 📡 API Request Options
 */
type ApiRequestOptions = RequestInit & {
  url: string;
  params?: Record<string, string | number | boolean>;
  skipAuth?: boolean;
};

/**
 * 🔄 API R/**
 * 🔧 Default API client configuration
 */
export const DEFAULT_API_CONFIG: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
  timeout: 30000,
  defaultHeaders: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

/**
 * 🚀 Simple hook for external backend API calls with automatic Clerk authentication
 *
 * This is a ready-to-use API client that automatically:
 * 1. Uses your NEXT_PUBLIC_BACKEND_URL environment variable
 * 2. Gets JWT token from Clerk's useAuth() hook
 * 3. Adds Bearer token to ALL requests automatically
 *
 * @returns API client methods ready for your external backend
 */
export const useBackendApi = () => {
  return useApiClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    timeout: 30000,
    defaultHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

/**
 * 🌐 Export API Error for use in components
 */
export { ApiError };
type ApiResponse<T = unknown> = {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
};

/**
 * ❌ API Error Type
 */
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * 🔐 Custom hook for API client with automatic Clerk token handling
 *
 * This hook automatically uses Clerk's useAuth() to get and add JWT tokens
 * to all requests without you having to manage tokens manually!
 *
 * @param config - API client configuration
 * @returns API client methods with automatic authentication
 */
export const useApiClient = (config: ApiClientConfig = {}) => {
  // 🔐 Get Clerk's getToken function automatically
  const { getToken } = useAuth();
  const { baseURL = "", timeout = 30000, defaultHeaders = {} } = config;

  /**
   * 🚀 Make authenticated API request
   *
   * @param options - Request options
   * @returns Promise with API response
   */
  const request = useCallback(
    async <T = unknown>(
      options: ApiRequestOptions
    ): Promise<ApiResponse<T>> => {
      const {
        url,
        params,
        skipAuth = false,
        headers: customHeaders = {},
        ...fetchOptions
      } = options;

      try {
        // Build URL with query parameters
        const fullURL = new URL(url, baseURL || window.location.origin);
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            fullURL.searchParams.append(key, String(value));
          });
        }

        // Prepare headers
        const headersRecord: Record<string, string> = {
          "Content-Type": "application/json",
        };

        // Merge default headers
        if (defaultHeaders) {
          Object.assign(headersRecord, defaultHeaders);
        }

        // Merge custom headers
        if (customHeaders) {
          Object.assign(headersRecord, customHeaders);
        }

        // Add Bearer token if authentication is required
        if (!skipAuth && getToken) {
          try {
            // 🔐 Automatically get JWT token from Clerk
            const token = await getToken();
            if (token) {
              headersRecord.Authorization = `Bearer ${token}`;
              console.log("✅ Token added to request headers:", token.substring(0, 20) + "...");
            } else {
              console.warn("⚠️ No token available from Clerk");
              throw new ApiError("No authentication token available", 401);
            }
          } catch (tokenError) {
            console.error("❌ Failed to get Clerk token:", tokenError);
            throw new ApiError("Authentication token unavailable", 401);
          }
        }

        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        // Make the request
        const response = await fetch(fullURL.toString(), {
          ...fetchOptions,
          headers: headersRecord,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Parse response
        let data: T;
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = (await response.text()) as unknown as T;
        }

        // Handle non-2xx responses
        if (!response.ok) {
          throw new ApiError(
            `API request failed: ${response.status} ${response.statusText}`,
            response.status,
            data
          );
        }

        return {
          data,
          status: response.status,
          headers: response.headers,
          ok: response.ok,
        };
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }

        // Handle network errors
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            throw new ApiError("Request timeout", 408);
          }
          throw new ApiError(`Network error: ${error.message}`, 0);
        }

        throw new ApiError("Unknown error occurred", 500);
      }
    },
    [baseURL, timeout, defaultHeaders, getToken]
  );

  /**
   * 📥 GET request
   */
  const get = useCallback(
    <T = unknown>(
      url: string,
      options: Omit<ApiRequestOptions, "url" | "method"> = {}
    ) => {
      return request<T>({ ...options, url, method: "GET" });
    },
    [request]
  );

  /**
   * 📤 POST request
   */
  const post = useCallback(
    <T = unknown>(
      url: string,
      data?: unknown,
      options: Omit<ApiRequestOptions, "url" | "method" | "body"> = {}
    ) => {
      return request<T>({
        ...options,
        url,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    [request]
  );

  /**
   * ✏️ PUT request
   */
  const put = useCallback(
    <T = unknown>(
      url: string,
      data?: unknown,
      options: Omit<ApiRequestOptions, "url" | "method" | "body"> = {}
    ) => {
      return request<T>({
        ...options,
        url,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    [request]
  );

  /**
   * 🔄 PATCH request
   */
  const patch = useCallback(
    <T = unknown>(
      url: string,
      data?: unknown,
      options: Omit<ApiRequestOptions, "url" | "method" | "body"> = {}
    ) => {
      return request<T>({
        ...options,
        url,
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    [request]
  );

  /**
   * 🗑️ DELETE request
   */
  const del = useCallback(
    <T = unknown>(
      url: string,
      options: Omit<ApiRequestOptions, "url" | "method"> = {}
    ) => {
      return request<T>({ ...options, url, method: "DELETE" });
    },
    [request]
  );

  return useMemo(
    () => ({
      request,
      get,
      post,
      put,
      patch,
      delete: del,
      ApiError,
    }),
    [request, get, post, put, patch, del]
  );
};

/**
 * 🌐 Create a standalone API client instance for use outside React components
 * Note: This requires you to pass the token manually for now
 *
 * @param config - API client configuration
 * @param token - JWT token for authentication
 * @returns API client methods
 */
export const createApiClient = (
  config: ApiClientConfig = {},
  token?: string
) => {
  const { baseURL = "", timeout = 30000, defaultHeaders = {} } = config;

  /**
   * 🚀 Make API request with optional token
   */
  const request = async <T = unknown>(
    options: ApiRequestOptions
  ): Promise<ApiResponse<T>> => {
    const {
      url,
      params,
      skipAuth = false,
      headers: customHeaders = {},
      ...fetchOptions
    } = options;

    try {
      // Build URL with query parameters
      const fullURL = new URL(
        url,
        baseURL || (typeof window !== "undefined" ? window.location.origin : "")
      );
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          fullURL.searchParams.append(key, String(value));
        });
      }

      // Prepare headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Merge default headers
      if (defaultHeaders) {
        Object.assign(headers, defaultHeaders);
      }

      // Merge custom headers
      if (customHeaders) {
        Object.assign(headers, customHeaders);
      }

      // Add Bearer token if provided and authentication is required
      if (!skipAuth && token) {
        headers.Authorization = `Bearer ${token}`;
        console.log(
          "🔐 Added Bearer token to standalone request:",
          fullURL.pathname
        );
      }

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Make the request
      const response = await fetch(fullURL.toString(), {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response
      let data: T;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }

      // Handle non-2xx responses
      if (!response.ok) {
        throw new ApiError(
          `API request failed: ${response.status} ${response.statusText}`,
          response.status,
          data
        );
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
        ok: response.ok,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiError("Request timeout", 408);
        }
        throw new ApiError(`Network error: ${error.message}`, 0);
      }

      throw new ApiError("Unknown error occurred", 500);
    }
  };

  const get = <T = unknown>(
    url: string,
    options: Omit<ApiRequestOptions, "url" | "method"> = {}
  ) => {
    return request<T>({ ...options, url, method: "GET" });
  };

  const post = <T = unknown>(
    url: string,
    data?: unknown,
    options: Omit<ApiRequestOptions, "url" | "method" | "body"> = {}
  ) => {
    return request<T>({
      ...options,
      url,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  const put = <T = unknown>(
    url: string,
    data?: unknown,
    options: Omit<ApiRequestOptions, "url" | "method" | "body"> = {}
  ) => {
    return request<T>({
      ...options,
      url,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  const patch = <T = unknown>(
    url: string,
    data?: unknown,
    options: Omit<ApiRequestOptions, "url" | "method" | "body"> = {}
  ) => {
    return request<T>({
      ...options,
      url,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  const del = <T = unknown>(
    url: string,
    options: Omit<ApiRequestOptions, "url" | "method"> = {}
  ) => {
    return request<T>({ ...options, url, method: "DELETE" });
  };

  return {
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    ApiError,
  };
};
