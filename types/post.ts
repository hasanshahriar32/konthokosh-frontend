/**
 * 📝 Post-related type definitions
 */

export type PostStatus =
  | "draft"
  | "published"
  | "analyzing"
  | "verified"
  | "rejected";

export type PostVisibility = "public" | "private" | "unlisted";

export type PostData = {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  visibility: PostVisibility;
  status: PostStatus;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
  originalityScore?: number;
  blockchainHash?: string;
  verificationStatus?: "pending" | "verified" | "failed";
};

export type PostFormData = {
  title: string;
  content: string;
  tags: string[];
  visibility: PostVisibility;
};

export type OriginalityReport = {
  score: number;
  similarPosts: SimilarPost[];
  isOriginal: boolean;
  confidence: number;
  analysisDetails?: {
    plagiarismPercentage: number;
    uniqueContent: number;
    sourcesFound: number;
  };
};

export type SimilarPost = {
  id: string;
  title: string;
  author: string;
  similarity: number;
  source?: string;
  url?: string;
};

export type PostValidationError = {
  field: string;
  message: string;
};

export const POST_UI = {
  ACTIVE: "সক্রিয়",
  INACTIVE: "নিষ্ক্রিয়",
};
