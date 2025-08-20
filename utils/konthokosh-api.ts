import { useBackendApi, ApiError } from "@/utils/api-client";
import { useCallback, useMemo } from "react";
import type {
  KonthoKoshApiResponse,
  KonthoKoshPost,
  CreatePostRequest,
  CreatePostResponseData,
  KonthoKoshPagedPostsResponse,
  KonthoKoshFeedPost,
} from "@/types/konthokosh-api";

/**
 * 🌐 KonthoKosh API Service
 *
 * This service handles all interactions with the KonthoKosh Railway backend API
 * JWT tokens are automatically added to all requests via the API client
 */
export const useKonthoKoshApi = () => {
  // 🔐 Uses automatic JWT token from Clerk
  const api = useBackendApi();

  /**
   * 📝 Create a new post
   *
   * @param postContent - The post content
   * @param imagesId - Optional array of image IDs
   * @returns Promise with the created post data
   */
  const createPost = useCallback(
    async (
      postContent: string,
      imagesId?: number[]
    ): Promise<KonthoKoshPost> => {
      try {
        console.log("🚀 Creating post on KonthoKosh API...");

        const requestBody: CreatePostRequest = {
          post: postContent,
          ...(imagesId && imagesId.length > 0 && { imagesId }),
        };

        // 🔐 JWT token automatically added by the API client
        const response = await api.post<KonthoKoshApiResponse<CreatePostResponseData>>(
          "/api/v1/posts",
          requestBody
        );

        console.log("✅ KonthoKosh API Response:", response);

        // Check if the API response indicates success
        if (!response.data.success || response.data.statusCode !== 201) {
          throw new ApiError(
            response.data.message || "Failed to create post",
            response.data.statusCode || response.status,
            response.data
          );
        }

        if (!response.data.data || !response.data.data.post) {
          throw new ApiError(
            "No post data returned",
            response.status,
            response.data
          );
        }

        console.log("✅ Post created successfully:", response.data.data.post);
        return response.data.data.post;
      } catch (error) {
        console.error("❌ Failed to create post on KonthoKosh:", error);

        // Handle specific API errors
        if (error instanceof ApiError) {
          if (error.status === 400) {
            throw new Error("Invalid post content. Please check your input.");
          }
          if (error.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(error.message || "Failed to create post");
        }

        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  /**
   * 📋 Get user's posts (if needed later)
   */
  const getUserPosts = useCallback(async (): Promise<KonthoKoshPost[]> => {
    try {
      console.log("📋 Fetching user posts from KonthoKosh API...");

      const response = await api.get<KonthoKoshApiResponse<KonthoKoshPost[]>>(
        "/api/v1/posts"
      );

      if (!response.data.success) {
        throw new ApiError(
          response.data.message || "Failed to fetch posts",
          response.data.statusCode || response.status,
          response.data
        );
      }

      return response.data.data || [];
    } catch (error) {
      console.error("❌ Failed to fetch posts from KonthoKosh:", error);
      throw error;
    }
  }, [api]);

  const getFeedPosts = useCallback(
    async (
      params: { page?: number; size?: number; keyword?: string } = {}
    ): Promise<{
      posts: KonthoKoshFeedPost[];
      pagination: {
        page: number;
        size: number;
        totalCount: number;
        totalPages: number;
      };
    }> => {
      const { page = 1, size = 10, keyword } = params;
      try {
        const response = await api.get<KonthoKoshPagedPostsResponse>(
          "/api/v1/posts",
          {
            params: {
              page,
              size,
              ...(keyword ? { keyword } : {}),
            },
          }
        );

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch posts",
            response.data.statusCode || response.status,
            response.data
          );
        }

        const { data, pagination } = response.data.data;
        return { posts: data, pagination };
      } catch (error) {
        console.error("❌ Failed to fetch feed posts:", error);
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  return useMemo(
    () => ({
      createPost,
      getUserPosts,
      getFeedPosts,
      api,
    }),
    [createPost, getUserPosts, getFeedPosts, api]
  );
};

/**
 * 🛠️ Helper function to handle KonthoKosh API errors
 */
export const handleKonthoKoshError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Authentication failed. Please log in again.";
      case 403:
        return "You do not have permission to perform this action.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return error.message || "An unexpected error occurred.";
    }
  }

  return "An unknown error occurred.";
};
