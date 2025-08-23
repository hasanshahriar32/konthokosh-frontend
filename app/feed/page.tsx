"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import FeedLoader from "@/components/common/FeedLoader";
import ErrorBanner from "@/components/feed/ErrorBanner";
import PostCard from "@/components/feed/PostCard";
import SearchBar from "@/components/feed/SearchBar";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ERROR_LOAD_FAILED,
  ERROR_NETWORK,
  FEED_LOADING_MESSAGE,
  FEED_SUBTITLE,
  FEED_TITLE,
  NEXT,
  NO_POSTS,
  PAGE_LABEL,
  PREVIOUS,
  RETRY_BUTTON,
  SEARCH_BUTTON,
  SEARCH_LOADING,
  SEARCH_PLACEHOLDER,
  TRY_DIFFERENT_KEYWORD,
} from "@/constants/feed";
import type { KonthoKoshFeedPost } from "@/types/konthokosh-api";
import { useBackendApi } from "@/utils/api-client";
import { useCallback, useEffect, useState } from "react";

const FeedPage = () => {
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
        const response = await api.get("/api/v1/posts", {
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
    loadPosts(1, searchInput);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      loadPosts(newPage, keyword);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      loadPosts(newPage, keyword);
    }
  };

  if (loading && !hasLoaded) {
    return (
      <ProtectedRoute>
        <div className="w-full bg-background grid grid-cols-[auto,1fr]">
          <Navbar />
          <div className="flex flex-1 items-center justify-center mt-16">
            <FeedLoader message={FEED_LOADING_MESSAGE} skeletons={3} />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Background>
        <Navbar />
        <main className="container mx-auto px-4 max-w-3xl w-full flex-1 flex flex-col justify-center items-center mt-28">
          <header className="w-full text-center">
            <h1 className="heading-primary tracking-tight text-primary drop-shadow-lg mb-4 md:mb-6">
              {FEED_TITLE}
            </h1>
            <p className="text-subtitle">{FEED_SUBTITLE}</p>
          </header>

          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onSearch={handleSearch}
            loading={loading}
            placeholder={SEARCH_PLACEHOLDER}
            loadingText={SEARCH_LOADING}
            buttonText={SEARCH_BUTTON}
          />

          <ErrorBanner
            error={error}
            onRetry={() => loadPosts(page, keyword)}
            retryLabel={RETRY_BUTTON}
          />

          <section className="w-full space-y-6 pb-8">
            {posts.length === 0 && hasLoaded && !loading && (
              <Card className="bg-card/90 backdrop-blur-md rounded-2xl shadow-lg border-none">
                <CardContent className="p-8 text-center">
                  <p className="font-bengali text-lg text-muted-foreground">
                    {NO_POSTS} {keyword && TRY_DIFFERENT_KEYWORD}
                  </p>
                </CardContent>
              </Card>
            )}

            {posts.map((post) => (
              <PostCard key={post.id} post={post} totalCount={totalCount} />
            ))}
          </section>

          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-card/80 backdrop-blur-md p-4 rounded-full shadow-lg mt-8 w-full">
              <div className="text-base text-muted-foreground font-bengali">
                {PAGE_LABEL} {page} / {totalPages}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={page <= 1 || loading}
                  className="font-bengali rounded-full px-6 py-2"
                >
                  {PREVIOUS}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={page >= totalPages || loading}
                  className="font-bengali rounded-full px-6 py-2"
                >
                  {NEXT}
                </Button>
              </div>
            </div>
          )}
        </main>
      </Background>
    </ProtectedRoute>
  );
};

export default FeedPage;
