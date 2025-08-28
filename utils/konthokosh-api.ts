import { API_ENDPOINTS } from "@/constants/api";
import type {
  BlockchainProcessResponse,
  Comment,
  CreateCommentRequest,
  CreateCommentResponse,
  CreatedComment,
  CreatePostRequest,
  CreatePostResponseData,
  FeedPostsParams,
  GetCommentResponse,
  KonthoKoshApiResponse,
  KonthoKoshFeedPost,
  KonthoKoshPagedPostsResponse,
  OnChainSubmitResponse,
  PagedCommentsResponse,
  PostCoversPayload,
  PostErrorResponse,
  PostExplainResponse,
  PostResponse,
  PostSummaryResponse,
  UpdatePostRequest,
  UpdatePostResponse,
  UpdateCommentRequest,
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
      data: CreatePostRequest
    ): Promise<PostResponse | PostErrorResponse> => {
      try {
        const response = await api.post<
          KonthoKoshApiResponse<CreatePostResponseData>
        >(API_ENDPOINTS.posts.create, data);

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
          const responseData = (
            error.response as { data?: unknown } | undefined
          )?.data;
          if (error.status === 409) {
            return responseData as PostErrorResponse;
          }
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
  const getUserPosts = useCallback(async (): Promise<PostResponse[]> => {
    try {
      const response = await api.get<KonthoKoshApiResponse<PostResponse[]>>(
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
      params: FeedPostsParams = {}
    ): Promise<{
      posts: KonthoKoshFeedPost[];
      pagination: {
        page: number;
        size: number;
        totalCount: number;
        totalPages: number;
      };
    }> => {
      const { page = 1, size = 10, tags } = params;
      try {
        const requestParams: Record<string, unknown> = {
          ...params,
          page,
          size,
        };

        if (Array.isArray(tags)) {
          requestParams.tags = tags.join(",");
        }

        const qsParams: Record<string, string | number | boolean> = {};
        Object.entries(requestParams).forEach(([k, v]) => {
          if (v === undefined || v === null) return;
          if (
            typeof v === "string" ||
            typeof v === "number" ||
            typeof v === "boolean"
          ) {
            qsParams[k] = v;
            return;
          }
          // fallback: stringify other types (e.g., objects)
          qsParams[k] = String(v);
        });

        const response = await api.get<KonthoKoshPagedPostsResponse>(
          API_ENDPOINTS.posts.getAll,
          {
            params: qsParams,
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

  /**
   * Submit a resource (by id) to the blockchain endpoint.
   * @param id - resource id to submit
   * @returns transaction info from the blockchain service
   */
  const submitOnChain = useCallback(
    async (id: string | number): Promise<OnChainSubmitResponse> => {
      try {
        const response = await api.post<
          KonthoKoshApiResponse<OnChainSubmitResponse>
        >(API_ENDPOINTS.blockchain.submit(id));

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to submit to blockchain",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400) {
            throw new Error("Invalid request. Please check the id.");
          }
          if (error.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(error.message || "Failed to submit to blockchain");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  /**
   * Trigger processing of an IPFS resource on the blockchain service.
   * @param id - resource id to process
   * @returns processing result (ipfs hash and status)
   */
  const processIpfs = useCallback(
    async (id: string | number): Promise<BlockchainProcessResponse> => {
      try {
        const response = await api.post<
          KonthoKoshApiResponse<BlockchainProcessResponse>
        >(API_ENDPOINTS.blockchain.process(id));

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to process IPFS resource",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400) {
            throw new Error("Invalid request. Please check the id.");
          }
          if (error.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(error.message || "Failed to process IPFS resource");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  /**
   * Fetches a machine-generated summary for a post.
   * @param id - Post id
   * @returns Summary payload with post metadata
   */
  const getPostSummary = useCallback(
    async (id: string | number): Promise<PostSummaryResponse> => {
      try {
        const response = await api.get<
          KonthoKoshApiResponse<PostSummaryResponse>
        >(API_ENDPOINTS.posts.summary(id));

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch post summary",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400) {
            throw new Error("Invalid request. Please check the id.");
          }
          if (error.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(error.message || "Failed to fetch post summary");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  /**
   * Fetches an explanation for a post.
   * @param id - Post id
   * @returns Explanation payload with post metadata
   */
  const getPostExplain = useCallback(
    async (id: string | number): Promise<PostExplainResponse> => {
      try {
        const response = await api.get<
          KonthoKoshApiResponse<PostExplainResponse>
        >(API_ENDPOINTS.posts.explain(id));

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch post explanation",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400) {
            throw new Error("Invalid request. Please check the id.");
          }
          if (error.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(error.message || "Failed to fetch post explanation");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  /**
   * Fetches AI-generated cover images for a post.
   * @param id - Post id
   * @returns Payload containing generated images
   */
  const getPostCovers = useCallback(
    async (id: string | number): Promise<PostCoversPayload> => {
      try {
        const response = await api.get<
          KonthoKoshApiResponse<PostCoversPayload>
        >(API_ENDPOINTS.posts.covers(id));

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch post covers",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400) {
            throw new Error("Invalid request. Please check the id.");
          }
          if (error.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(error.message || "Failed to fetch post covers");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  /**
   * Update an existing post.
   * @param id - Post id
   * @param data - Fields to update
   * @returns The updated post
   */
  const updatePost = useCallback(
    async (id: string | number, data: UpdatePostRequest): Promise<PostResponse> => {
      try {
        const response = await api.put<
          KonthoKoshApiResponse<UpdatePostResponse>
        >(API_ENDPOINTS.posts.update(id), data);

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to update post",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400) {
            throw new Error("Invalid request. Please check the input.");
          }
          if (error.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          if (error.status === 404) {
            throw new Error("Post not found.");
          }
          throw new Error(error.message || "Failed to update post");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  /* ------------------------------ Comments ------------------------------ */

  const createComment = useCallback(
    async (data: CreateCommentRequest): Promise<CreatedComment> => {
      try {
        const response = await api.post<CreateCommentResponse>(
          API_ENDPOINTS.comments.create,
          data
        );

        if (!response.data.success || response.data.statusCode !== 201) {
          throw new ApiError(
            response.data.message || "Failed to create comment",
            response.data.statusCode || response.status,
            response.data
          );
        }

        if (!response.data.data) {
          throw new ApiError(
            "No comment returned",
            response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400)
            throw new Error(
              "অবৈধ মন্তব্য। অনুগ্রহ করে আপনার ইনপুট পরীক্ষা করুন।"
            );
          if (error.status === 401)
            throw new Error(
              "প্রমাণীকরণ ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।"
            );
          throw new Error(error.message || "Failed to create comment");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  const getComments = useCallback(
    async (
      params: Record<string, string | number | boolean> = {}
    ): Promise<{
      comments: Comment[];
      pagination?: {
        page: number;
        size: number;
        totalCount: number;
        totalPages: number;
      };
    }> => {
      try {
        const response = await api.get<PagedCommentsResponse>(
          API_ENDPOINTS.comments.getAll,
          { params }
        );

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch comments",
            response.data.statusCode || response.status,
            response.data
          );
        }

        const payload = response.data.data as any;
        if (Array.isArray(payload.data)) {
          return { comments: payload.data, pagination: payload.pagination };
        }

        if (Array.isArray(response.data.data as unknown)) {
          return { comments: response.data.data as unknown as Comment[] };
        }

        return { comments: [] };
      } catch (error) {
        if (error instanceof ApiError) throw new Error(error.message);
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  const getCommentsForPost = useCallback(
    async (
      postId: string | number,
      params: Record<string, string | number | boolean> = {}
    ) => {
      try {
        const response = await api.get<PagedCommentsResponse>(
          API_ENDPOINTS.comments.forPost(postId),
          { params }
        );

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch comments for post",
            response.data.statusCode || response.status,
            response.data
          );
        }

        const payload = response.data.data as unknown as any;
        return { comments: payload.data || [], pagination: payload.pagination };
      } catch (error) {
        if (error instanceof ApiError) throw new Error(error.message);
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  const getCommentById = useCallback(
    async (id: string | number): Promise<Comment> => {
      try {
        const response = await api.get<GetCommentResponse>(
          API_ENDPOINTS.comments.getById(id)
        );

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch comment",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof ApiError) throw new Error(error.message);
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  const updateComment = useCallback(
    async (
      id: string | number,
      data: UpdateCommentRequest
    ): Promise<Comment> => {
      try {
        const response = await api.put<
          KonthoKoshApiResponse<GetCommentResponse>
        >(API_ENDPOINTS.comments.update(id), data);

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to update comment",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return (response.data.data as any).comment;
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 400)
            throw new Error(
              "অবৈধ অনুরোধ। অনুগ্রহ করে আপনার ইনপুট পরীক্ষা করুন।"
            );
          if (error.status === 401)
            throw new Error(
              "প্রমাণীকরণ ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।"
            );
          throw new Error(error.message || "Failed to update comment");
        }
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  const deleteComment = useCallback(
    async (id: string | number): Promise<boolean> => {
      try {
        const response = await api.delete<KonthoKoshApiResponse<null>>(
          API_ENDPOINTS.comments.delete(id)
        );

        if (!response.data.success) {
          throw new ApiError(
            response.data.message || "Failed to delete comment",
            response.data.statusCode || response.status,
            response.data
          );
        }

        return true;
      } catch (error) {
        if (error instanceof ApiError) throw new Error(error.message);
        throw new Error("Network error. Please try again.");
      }
    },
    [api]
  );

  const getReplies = useCallback(
    async (id: string | number): Promise<Comment[]> => {
      try {
        const response = await api.get<PagedCommentsResponse>(
          API_ENDPOINTS.comments.replies(id)
        );

        if (!response.data.success || !response.data.data) {
          throw new ApiError(
            response.data.message || "Failed to fetch replies",
            response.data.statusCode || response.status,
            response.data
          );
        }

        const payload = response.data.data.data;
        return payload || [];
      } catch (error) {
        if (error instanceof ApiError) throw new Error(error.message);
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
      updatePost,
      submitToBlockchain: submitOnChain,
      processIpfs,
      getPostSummary,
      getPostExplain,
      getPostCovers,
      // comments
      createComment,
      getComments,
      getCommentsForPost,
      getCommentById,
      updateComment,
      deleteComment,
      getReplies,
      api,
    }),
    [
      createPost,
      getUserPosts,
      getFeedPosts,
      updatePost,
      submitOnChain,
      processIpfs,
      getPostSummary,
      getPostExplain,
      getPostCovers,
      // comments
      createComment,
      getComments,
      getCommentsForPost,
      getCommentById,
      updateComment,
      deleteComment,
      getReplies,
      api,
    ]
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
        return "অবৈধ অনুরোধ। অনুগ্রহ করে আপনার ইনপুট পরীক্ষা করুন।";
      case 401:
        return "প্রমাণীকরণ ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় লগইন করুন।";
      case 403:
        return "এই কার্যটি করার আপনার অনুমতি নেই।";
      case 409:
        return "বিরোধ ঘটেছে। অনুগ্রহ করে বিরোধ মেটান এবং পুনরায় চেষ্টা করুন।";
      case 429:
        return "অনেক অনুরোধ এসেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
      case 500:
        return "সার্ভার ত্রুটি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
      default:
        return "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।";
    }
  }
  if (error instanceof Error) return error.message;
  return "An unknown error occurred.";
};
