import { API_ENDPOINTS } from "@/constants/api";
import type {
  CreatePostRequest,
  CreatePostResponseData,
  KonthoKoshApiResponse,
  KonthoKoshFeedPost,
  KonthoKoshPagedPostsResponse,
  KonthoKoshPost,
} from "@/types";
import { ApiError, useBackendApi } from "@/utils/api-client";
import { useCallback, useMemo } from "react";

/**
 * Provides KonthoKosh API methods for posts.
 * @returns API methods for posts.
 */
export const useKonthoKoshApi = () => {
  const api = useBackendApi();

  /**
   * Creates a new post.
   * @param postContent - The post content.
   * @param imagesId - Optional array of image IDs.
   * @returns The created post.
   */
  const createPost = useCallback(
    async (
      postContent: string,
      imagesId?: number[]
    ): Promise<KonthoKoshPost> => {
      try {
        const requestBody: CreatePostRequest = {
          post: postContent,
          ...(imagesId && imagesId.length > 0 && { imagesId }),
        };

        const response = await api.post<
          KonthoKoshApiResponse<CreatePostResponseData>
        >(API_ENDPOINTS.posts.create, requestBody);

        if (!response.data.success || response.data.statusCode !== 201) {
          throw new ApiError(
            response.data.message || "Failed to create post",
            response.data.statusCode || response.status,
            response.data
          );
        }

        if (!response.data.data?.post) {
          throw new ApiError(
            "No post data returned",
            response.status,
            response.data
          );
        }

        return response.data.data.post;
      } catch (error) {
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
   * Fetches all posts of the current user.
   * @returns Array of user's posts.
   */
  const getUserPosts = useCallback(async (): Promise<KonthoKoshPost[]> => {
    try {
      const response = await api.get<KonthoKoshApiResponse<KonthoKoshPost[]>>(
        API_ENDPOINTS.posts.getAll
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
      throw error;
    }
  }, [api]);

  /**
   * Fetches feed posts with pagination and optional keyword.
   * @param params - Pagination and filter params.
   * @returns Posts and pagination info.
   */
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
          API_ENDPOINTS.posts.getAll,
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
 * Returns a user-friendly error message for KonthoKosh API errors.
 * @param error - The error object.
 * @returns Error message string.
 */
export const handleKonthoKoshError = (error: unknown): string => {
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
  if (error instanceof Error) return error.message;
  return "An unknown error occurred.";
};
