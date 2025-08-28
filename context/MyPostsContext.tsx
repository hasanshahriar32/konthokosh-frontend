"use client";

import { API_ENDPOINTS } from "@/constants/api";
import { ERROR_LOAD_FAILED, ERROR_NETWORK } from "@/constants/feed";
import type { KonthoKoshFeedPost } from "@/types/post";
import { useKonthoKoshApi } from "@/utils/konthokosh-api";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

type MyPostsContextType = {
  posts: KonthoKoshFeedPost[];
  page: number;
  setPage: (n: number) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  activeTab: string;
  setActiveTab: (s: string) => void;
  publishedPosts: KonthoKoshFeedPost[];
  pendingPosts: KonthoKoshFeedPost[];
  filteredPosts: KonthoKoshFeedPost[];
  loading: boolean;
  error: string;
  totalPages: number;
  totalCount: number;
  hasLoaded: boolean;
  isApproved: boolean | null;
  setIsApproved: (v: boolean | null) => void;
  loadPosts: (
    pageNum?: number,
    searchKeyword?: string,
    approvalStatus?: boolean | null
  ) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
};

const MyPostsContext = createContext<MyPostsContextType | undefined>(undefined);

export const MyPostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getFeedPosts, api } = useKonthoKoshApi();

  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const loadPosts = useCallback(
    async (
      pageNum: number = 1,
      searchKeyword: string = "",
      approvalStatus: boolean | null = null
    ) => {
      setLoading(true);
      setError("");

      try {
        const params: Record<string, string | number | boolean> = {
          page: pageNum,
          size: 10,
          myPosts: true,
        };

        if (searchKeyword) params.keyword = searchKeyword;
        if (approvalStatus !== null) params.isApproved = approvalStatus;

        const { posts: fetchedPosts, pagination } = await getFeedPosts(params);

        if (Array.isArray(fetchedPosts)) {
          setPosts(fetchedPosts);
          setTotalPages(pagination.totalPages);
          setTotalCount(pagination.totalCount);
        } else {
          setError(ERROR_LOAD_FAILED);
        }
      } catch (err) {
        console.error("loadPosts error", err);
        setError(ERROR_NETWORK);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    },
    [getFeedPosts, api]
  );

  const deletePost = useCallback(
    async (postId: number) => {
      try {
        const response = await api.delete(API_ENDPOINTS.posts.delete(postId));
        if (response.status === 200 || response.status === 204) {
          setPosts((p) => p.filter((x) => x.id !== postId));
          setTotalCount((c) => Math.max(0, c - 1));
        } else {
          setError("Failed to delete post");
        }
      } catch (err) {
        console.error("deletePost error", err);
        setError("Failed to delete post");
      }
    },
    [api]
  );

  const publishedPosts = useMemo(
    () => posts.filter((p) => p.isApproved),
    [posts]
  );

  const pendingPosts = useMemo(
    () => posts.filter((p) => !p.isApproved),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const term = (searchTerm || "").toLowerCase();
    return posts.filter((post) => {
      const matchesSearch = post?.post?.toLowerCase()?.includes(term);
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "published" && post.isApproved) ||
        (activeTab === "pending" && !post.isApproved);
      return matchesSearch && matchesTab;
    });
  }, [posts, searchTerm, activeTab]);

  useEffect(() => {
    if (!hasLoaded) loadPosts(1);
  }, [hasLoaded, loadPosts]);

  const value: MyPostsContextType = {
    posts,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    publishedPosts,
    pendingPosts,
    filteredPosts,
    loading,
    error,
    totalPages,
    totalCount,
    hasLoaded,
    isApproved,
    setIsApproved,
    loadPosts,
    deletePost,
  };

  return (
    <MyPostsContext.Provider value={value}>{children}</MyPostsContext.Provider>
  );
};

export const useMyPosts = (): MyPostsContextType => {
  const ctx = useContext(MyPostsContext);
  if (!ctx) throw new Error("useMyPosts must be used within MyPostsProvider");
  return ctx;
};

export default MyPostsContext;
