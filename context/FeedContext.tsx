"use client";

import { API_ENDPOINTS } from "@/constants/api";
import { ERROR_LOAD_FAILED, ERROR_NETWORK } from "@/constants/feed";
import type { KonthoKoshFeedPost } from "@/types/api";
import { useBackendApi } from "@/utils/api-client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type FeedContextType = {
  posts: KonthoKoshFeedPost[];
  page: number;
  setPage: (n: number) => void;
  keyword: string;
  searchInput: string;
  setSearchInput: (s: string) => void;
  loading: boolean;
  error: string;
  totalPages: number;
  totalCount: number;
  hasLoaded: boolean;
  handleSearch: (e: React.FormEvent) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  loadPosts: (pageNum: number, searchKeyword?: string) => Promise<void>;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const api = useBackendApi();

  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadPosts = useCallback(
    async (pageNum: number, searchKeyword: string = "") => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(API_ENDPOINTS.posts.getAll, {
          params: {
            page: pageNum,
            size: 10,
            ...(searchKeyword ? { keyword: searchKeyword } : {}),
          },
        });

        const data = response.data as {
          success: boolean;
          data: {
            data: KonthoKoshFeedPost[];
            pagination: {
              totalPages: number;
              totalCount: number;
            };
          };
        };

        if (data.success && data.data) {
          setPosts(data.data.data);
          setTotalPages(data.data.pagination.totalPages);
          setTotalCount(data.data.pagination.totalCount);
        } else {
          setError(ERROR_LOAD_FAILED);
        }
      } catch {
        setError(ERROR_NETWORK);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    },
    [api]
  );

  useEffect(() => {
    if (!hasLoaded) loadPosts(1);
  }, [hasLoaded, loadPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchInput);
    setPage(1);
    void loadPosts(1, searchInput);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      void loadPosts(newPage, keyword);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      void loadPosts(newPage, keyword);
    }
  };

  const value: FeedContextType = {
    posts,
    page,
    setPage,
    keyword,
    searchInput,
    setSearchInput,
    loading,
    error,
    totalPages,
    totalCount,
    hasLoaded,
    handleSearch,
    handlePrevPage,
    handleNextPage,
    loadPosts,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export const useFeed = (): FeedContextType => {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeed must be used within FeedProvider");
  return ctx;
};

export default FeedContext;
