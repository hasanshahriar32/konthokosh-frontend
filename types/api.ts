import type { PostTag } from "./post";

export type KonthoKoshApiResponse<T = unknown> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
};

export type FeedPostsParams = {
  page?: number;
  size?: number;
  keyword?: string;
  isApproved?: boolean;
  myPosts?: boolean;
  tags?: string | string[];
};

/**
 * Create post request body
 */

export type CreatePostRequest = {
  title?: string;
  tags?: PostTag[];
  post: string;
};

/**
 * Post data structure from KonthoKosh API
 */

export type ImageObject = {
  key: string;
  publicUrl: string;
  type: "modern";
};

export type PostResponse = {
  id: number;
  title: string;
  post: string;
  userId: number;
  isApproved: boolean;
  imagesId: ImageObject[];
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Create post response data structure
 */
export type CreatePostAIEnhancementsDetails = {
  generatedTitle: string;
  generatedTags: string[];
};

export type CreatePostAIEnhancements = {
  titleGenerated: boolean;
  tagsGenerated: boolean;
  details?: CreatePostAIEnhancementsDetails;
};

export type CreatePostResponseData = {
  post: PostResponse;
  similarPosts: SimilarPost[];
  ragEnabled: boolean;
  similarPostsCount: number;
  similarityThresholdUsed?: number;
  aiEnhancements?: CreatePostAIEnhancements;
};

/**
 * Error response structure
 */
export type KonthoKoshError = {
  statusCode: number;
  success: false;
  message: string;
  data: null | PostErrorResponse;
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
export type KonthoKoshFeedPost = Omit<PostResponse, "imagesId"> & {
  imagesId?: ImageObject[];
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

export type SimilarityMatch = {
  id: number;
  contentPreview: string;
  similarityScore: number;
  similarityPercentage: string;
};

export type MatchedPostSummary = {
  id: number;
  content: string;
  contentPreview: string;
  userId: number;
  isApproved: boolean;
  createdAt: string;
};

export type PostErrorResponse = {
  similarityScore: number;
  similarityPercentage: string;
  threshold: number;
  thresholdPercentage: string;
  matchedPost: MatchedPostSummary | null;
  totalMatches: number;
  allMatches: SimilarityMatch[];
};

/* -------------------------------- On Chain -------------------------------- */

export type Web3Wallet = {
  id: string;
  web3_wallet: string;
  verification: Record<string, unknown>;
};

export type ApiUser = {
  id: number;
  username: string;
  web3Wallets: Web3Wallet[];
};

export type ApiPost = {
  id: number;
  post: string;
  userId: number;
  isApproved: boolean;
  createdAt: string;
};

export type SimilarPost = {
  id: number;
  post: string;
  userId: number;
  similarity_score: number;
  similarity_percentage: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OnChainEntry = {
  id: number;
  onChainId: string;
  oracleStatus: string;
  postId: number;
  ipfsHash: string;
  createdAt: string;
  updatedAt: string;
  post: ApiPost;
  user: ApiUser;
};

export type OnChainSubmitResponse = {
  blockchainEntry: OnChainEntry;
  transactionHash: string;
  onChainId: string;
};

/* ---------------------------------- IPFS ---------------------------------- */

export type BlockchainProcessResponse = {
  blockchainEntry: OnChainEntry;
  ipfsHash: string;
  similarityScore: number;
  postData: {
    post_id: string;
    content: string;
    username: string;
    wallet_address: string;
    timestamp: string;
    similarity_analysis: {
      similarity_score: number;
      most_similar_posts: Array<SimilarPost>;
    };
    blockchain_info: {
      on_chain_id: string;
      submitted_at: string;
    };
  };
};
