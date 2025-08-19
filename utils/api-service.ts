import {
  useApiClient,
  createApiClient,
  DEFAULT_API_CONFIG,
  ApiError,
  useBackendApi,
} from "@/utils/api-client";
import type { PostData, PostFormData, OriginalityReport } from "@/types/post";

/**
 * 🌐 API endpoints configuration
 */
const API_ENDPOINTS = {
  posts: {
    create: "/api/posts",
    getAll: "/api/posts",
    getById: (id: string) => `/api/posts/${id}`,
    update: (id: string) => `/api/posts/${id}`,
    delete: (id: string) => `/api/posts/${id}`,
    analyze: (id: string) => `/api/posts/${id}/analyze`,
  },
  originality: {
    check: "/api/originality/check",
    report: (id: string) => `/api/originality/report/${id}`,
  },
  user: {
    profile: "/api/user/profile",
    posts: "/api/user/posts",
    analytics: "/api/user/analytics",
  },
} as const;

/**
 * 📊 API Response Types
 */
type ApiPostResponse = {
  success: boolean;
  data: PostData;
  message?: string;
};

type ApiPostsListResponse = {
  success: boolean;
  data: PostData[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ApiOriginalityResponse = {
  success: boolean;
  data: OriginalityReport;
  postId?: string;
};

type ApiUserAnalyticsResponse = {
  success: boolean;
  data: {
    totalPosts: number;
    verifiedPosts: number;
    averageOriginalityScore: number;
    recentActivity: {
      postsThisMonth: number;
      verificationsThisMonth: number;
    };
  };
};

/**
 * 🔐 Custom hook for Post API operations with automatic authentication
 *
 * This hook provides all the methods needed to interact with post-related APIs
 * with automatic Bearer token handling using Clerk's authentication.
 */
export const usePostApi = () => {
  const apiClient = useApiClient({
    ...DEFAULT_API_CONFIG,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_API_CONFIG.baseURL,
  });

  /**
   * 📝 Create a new post
   */
  const createPost = async (postData: PostFormData): Promise<PostData> => {
    try {
      const response = await apiClient.post<ApiPostResponse>(
        API_ENDPOINTS.posts.create,
        postData
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to create post",
          response.status,
          response.data
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("❌ Error creating post:", error);
      throw error;
    }
  };

  /**
   * 📋 Get all posts for the current user
   */
  const getPosts = async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    posts: PostData[];
    pagination?: ApiPostsListResponse["pagination"];
  }> => {
    try {
      const response = await apiClient.get<ApiPostsListResponse>(
        API_ENDPOINTS.posts.getAll,
        { params }
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to fetch posts",
          response.status,
          response.data
        );
      }

      return {
        posts: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
      throw error;
    }
  };

  /**
   * 📖 Get a specific post by ID
   */
  const getPostById = async (id: string): Promise<PostData> => {
    try {
      const response = await apiClient.get<ApiPostResponse>(
        API_ENDPOINTS.posts.getById(id)
      );

      if (!response.data.success) {
        throw new ApiError("Post not found", response.status, response.data);
      }

      return response.data.data;
    } catch (error) {
      console.error(`❌ Error fetching post ${id}:`, error);
      throw error;
    }
  };

  /**
   * ✏️ Update an existing post
   */
  const updatePost = async (
    id: string,
    updates: Partial<PostFormData>
  ): Promise<PostData> => {
    try {
      const response = await apiClient.put<ApiPostResponse>(
        API_ENDPOINTS.posts.update(id),
        updates
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to update post",
          response.status,
          response.data
        );
      }

      return response.data.data;
    } catch (error) {
      console.error(`❌ Error updating post ${id}:`, error);
      throw error;
    }
  };

  /**
   * 🗑️ Delete a post
   */
  const deletePost = async (id: string): Promise<void> => {
    try {
      const response = await apiClient.delete<{
        success: boolean;
        message: string;
      }>(API_ENDPOINTS.posts.delete(id));

      if (!response.data.success) {
        throw new ApiError(
          "Failed to delete post",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error(`❌ Error deleting post ${id}:`, error);
      throw error;
    }
  };

  /**
   * 🔍 Check originality of content
   */
  const checkOriginality = async (
    content: string,
    title?: string
  ): Promise<OriginalityReport> => {
    try {
      const response = await apiClient.post<ApiOriginalityResponse>(
        API_ENDPOINTS.originality.check,
        { content, title }
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to analyze originality",
          response.status,
          response.data
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("❌ Error checking originality:", error);
      throw error;
    }
  };

  /**
   * 📊 Get originality report for a specific post
   */
  const getOriginalityReport = async (
    postId: string
  ): Promise<OriginalityReport> => {
    try {
      const response = await apiClient.get<ApiOriginalityResponse>(
        API_ENDPOINTS.originality.report(postId)
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to fetch originality report",
          response.status,
          response.data
        );
      }

      return response.data.data;
    } catch (error) {
      console.error(
        `❌ Error fetching originality report for post ${postId}:`,
        error
      );
      throw error;
    }
  };

  /**
   * 📈 Get user analytics data
   */
  const getUserAnalytics = async (): Promise<
    ApiUserAnalyticsResponse["data"]
  > => {
    try {
      const response = await apiClient.get<ApiUserAnalyticsResponse>(
        API_ENDPOINTS.user.analytics
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to fetch analytics",
          response.status,
          response.data
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("❌ Error fetching user analytics:", error);
      throw error;
    }
  };

  return {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    checkOriginality,
    getOriginalityReport,
    getUserAnalytics,
    // Expose the underlying API client for custom requests
    apiClient,
    // Export API Error for error handling
    ApiError,
  };
};

/**
 * 🌐 Server-side API functions for use in API routes or server components
 * These require you to pass the token manually since they're not hooks
 */
export class PostApiService {
  private apiClient;

  constructor(token?: string) {
    this.apiClient = createApiClient(
      {
        ...DEFAULT_API_CONFIG,
        baseURL:
          process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_API_CONFIG.baseURL,
      },
      token
    );
  }

  /**
   * 📝 Create a new post (server-side)
   */
  async createPost(postData: PostFormData): Promise<PostData> {
    try {
      const response = await this.apiClient.post<ApiPostResponse>(
        API_ENDPOINTS.posts.create,
        postData
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to create post",
          response.status,
          response.data
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("❌ Error creating post (server-side):", error);
      throw error;
    }
  }

  /**
   * 🔍 Check originality (server-side)
   */
  async checkOriginality(
    content: string,
    title?: string
  ): Promise<OriginalityReport> {
    try {
      const response = await this.apiClient.post<ApiOriginalityResponse>(
        API_ENDPOINTS.originality.check,
        { content, title }
      );

      if (!response.data.success) {
        throw new ApiError(
          "Failed to analyze originality",
          response.status,
          response.data
        );
      }

      return response.data.data;
    } catch (error) {
      console.error("❌ Error checking originality (server-side):", error);
      throw error;
    }
  }

  // Add more server-side methods as needed...
}

/**
 * 🔧 Example usage functions - These show how to use the API client
 */

/**
 * 💡 Example: Handle API errors gracefully
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return "Authentication failed. Please log in again.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return error.message || "An unexpected error occurred.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred.";
};

/**
 * 🔄 Example: Retry function for failed requests
 */
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error = new Error("All retry attempts failed");

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error");

      if (attempt === maxRetries) {
        break;
      }

      // Don't retry on authentication or client errors
      if (error instanceof ApiError && error.status < 500) {
        throw error;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
};
