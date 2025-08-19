/**
 * 🌐 KonthoKosh API Types
 */

/**
 * KonthoKosh API Response Structure
 */
export type KonthoKoshApiResponse<T = unknown> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
};

/**
 * Post data structure from KonthoKosh API
 */
export type KonthoKoshPost = {
  id: number;
  post: string;
  userId: number;
  isApproved: boolean;
  imagesId: number[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Create post request body
 */
export type CreatePostRequest = {
  post: string;
  imagesId?: number[];
};

/**
 * Error response structure
 */
export type KonthoKoshError = {
  statusCode: number;
  success: false;
  message: string;
  data: null;
};

/**
 * Pagination metadata for list endpoints
 */
export type Pagination = {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
};

/**
 * Feed post structure including user info and string-based image ids
 */
export type KonthoKoshFeedPost = Omit<KonthoKoshPost, "imagesId"> & {
  imagesId?: string[];
  userFirstName?: string;
  userLastName?: string;
  userImageUrl?: string;
};

/**
 * Paged posts API response
 */
export type KonthoKoshPagedPostsResponse = KonthoKoshApiResponse<{
  data: KonthoKoshFeedPost[];
  pagination: Pagination;
}>;
