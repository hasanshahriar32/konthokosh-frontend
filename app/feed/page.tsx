"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import FeedLoader from "@/components/common/FeedLoader";
import ErrorBanner from "@/components/feed/ErrorBanner";
import FeedHeading from "@/components/feed/FeedHeading";
import PostCard from "@/components/feed/PostCard";
import SearchBar from "@/components/feed/SearchBar";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/feed/Pagination";

import { Card, CardContent } from "@/components/ui/card";
import {
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
import { FeedProvider, useFeed } from "@/context/FeedContext";

const FeedContent: React.FC = () => {
  const {
    posts,
    page,
    searchInput,
    setSearchInput,
    selectedTags,
    setSelectedTags,
    loading,
    error,
    totalPages,
    hasLoaded,
    handleSearch,
    handlePrevPage,
    handleNextPage,
    loadPosts,
  } = useFeed();

  if (loading && !hasLoaded) {
    return (
      <div className="w-full bg-background grid grid-cols-[auto,1fr]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center mt-16">
          <FeedLoader message={FEED_LOADING_MESSAGE} skeletons={3} />
        </div>
      </div>
    );
  }

  return (
    <Background>
      <Navbar />
      <main className="container mx-auto px-4 max-w-3xl w-full flex-1 flex flex-col justify-center items-center mt-28 mb-8">
        <FeedHeading title={FEED_TITLE} subtitle={FEED_SUBTITLE} />

        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          onSearch={handleSearch}
          loading={loading}
          placeholder={SEARCH_PLACEHOLDER}
          loadingText={SEARCH_LOADING}
          buttonText={SEARCH_BUTTON}
        />

        <ErrorBanner
          error={error}
          onRetry={() => void loadPosts(page)}
          retryLabel={RETRY_BUTTON}
        />

        <section className="w-full space-y-6 pb-8">
          {posts.length === 0 && hasLoaded && !loading && (
            <Card className="bg-card/90 backdrop-blur-md rounded-2xl shadow-lg border-none">
              <CardContent className="p-8 text-center">
                <p className="font-bengali text-lg text-muted-foreground">
                  {NO_POSTS}
                  {/* keyword is in context but not exposed here; message kept generic */}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {TRY_DIFFERENT_KEYWORD}
                </p>
              </CardContent>
            </Card>
          )}

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              showActions
              onTagClick={(t) => {
                // when clicking a tag on a post, filter by that single tag
                setSelectedTags && setSelectedTags([t]);
                void loadPosts(1, searchInput, [t]);
              }}
            />
          ))}
        </section>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
          disabled={loading}
          pageLabel={PAGE_LABEL}
          previousLabel={PREVIOUS}
          nextLabel={NEXT}
        />
      </main>
    </Background>
  );
};

const FeedPage = () => {
  return (
    <ProtectedRoute>
      <FeedProvider>
        <FeedContent />
      </FeedProvider>
    </ProtectedRoute>
  );
};

export default FeedPage;
