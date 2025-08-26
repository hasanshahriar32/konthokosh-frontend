"use client";

import { API_ENDPOINTS } from "@/constants/api";
import { ERROR_LOAD_FAILED, ERROR_NETWORK } from "@/constants/feed";
import type { KonthoKoshFeedPost } from "@/types/api";
import { useKonthoKoshApi } from "@/utils/konthokosh-api";
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
  selectedTag: string;
  setSelectedTag: (t: string) => void;
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
  loadPosts: (pageNum: number, searchKeyword?: string, tag?: string) => Promise<void>;
  handleTagFilter: (tag: string) => void;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getFeedPosts } = useKonthoKoshApi();

  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadPosts = useCallback(
  async (pageNum: number, searchKeyword: string = "", tag: string = "") => {
      setLoading(true);
      setError("");

      try {
        const { posts: fetchedPosts, pagination } = await getFeedPosts({
          page: pageNum,
          size: 10,
      ...(searchKeyword ? { keyword: searchKeyword } : {}),
  ...(tag ? { tags: tag } : {}),
        });

        if (Array.isArray(fetchedPosts)) {
          setPosts(fetchedPosts);
          setTotalPages(pagination.totalPages);
          setTotalCount(pagination.totalCount);
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
  [getFeedPosts]
  );

  useEffect(() => {
    if (!hasLoaded) loadPosts(1);
  }, [hasLoaded, loadPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchInput);
    setPage(1);
  void loadPosts(1, searchInput, selectedTag);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
  void loadPosts(newPage, keyword, selectedTag);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      void loadPosts(newPage, keyword, selectedTag);
    }
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag);
    setPage(1);
    // keep current keyword when filtering by tag
    void loadPosts(1, keyword, tag);
  };

  const value: FeedContextType = {
    posts,
    page,
    setPage,
    keyword,
  selectedTag,
  setSelectedTag,
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
  handleTagFilter,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export const useFeed = (): FeedContextType => {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeed must be used within FeedProvider");
  return ctx;
};

export default FeedContext;
