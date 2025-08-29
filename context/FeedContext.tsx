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
} from "react";

type FeedContextType = {
  posts: KonthoKoshFeedPost[];
  page: number;
  setPage: (n: number) => void;
  keyword: string;
  selectedTags: string[];
  setSelectedTags: (t: string[]) => void;
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
  loadPosts: (
    pageNum: number,
    searchKeyword?: string,
    tags?: string[]
  ) => Promise<void>;
  handleTagFilter: (tags: string[]) => void;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getFeedPosts } = useKonthoKoshApi();

  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadPosts = useCallback(
    async (
      pageNum: number,
      searchKeyword: string = "",
      tags: string[] = []
    ) => {
      setLoading(true);
      setError("");

      try {
        const { posts: fetchedPosts, pagination } = await getFeedPosts({
          page: pageNum,
          size: 10,
          ...(searchKeyword ? { keyword: searchKeyword } : {}),
          ...(tags && tags.length > 0 ? { tags } : {}),
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
  void loadPosts(1, searchInput, selectedTags);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
  void loadPosts(newPage, keyword, selectedTags);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
  void loadPosts(newPage, keyword, selectedTags);
    }
  };

  const handleTagFilter = (tags: string[]) => {
    setSelectedTags(tags);
    setPage(1);
    // keep current keyword when filtering by tag(s)
    void loadPosts(1, keyword, tags);
  };

  const value: FeedContextType = {
    posts,
    page,
    setPage,
    keyword,
  selectedTags,
  setSelectedTags,
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
