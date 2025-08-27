import type { KonthoKoshApiResponse, Pagination } from "./post";
import type { UserSummary } from "./user";

/**
 * Core Comment shape returned by the API
 */
export type Comment = {
  id: number;
  postId: number;
  userId: number;
  parentId: number | null;
  content: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
  repliesCount: number;
};

export type CreatedComment = Omit<Comment, "user" | "repliesCount">;

/**
 * Request body to create a comment
 * the parentId needed for reply
 */
export type CreateCommentRequest = {
  postId: number;
  content: string;
  parentId?: number | null;
};

/**
 * Request body to update a comment
 */
export type UpdateCommentRequest = {
  content?: string;
};

/**
 * Response returned when a single comment is created/returned
 */
export type CreateCommentResponse = KonthoKoshApiResponse<CreatedComment>;

export type GetCommentResponse = KonthoKoshApiResponse<Comment>;

/**
 * Paged comments response (list endpoints)
 */
export type PagedCommentsResponse = KonthoKoshApiResponse<{
  data: Comment[];
  pagination: Pagination;
}>;

/**
 * Generic comments-only response shape
 */
export type CommentsResponse = KonthoKoshApiResponse<
  Comment[] | { items: Comment[] }
>;
