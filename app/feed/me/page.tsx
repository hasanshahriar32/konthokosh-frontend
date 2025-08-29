"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import FeedLoader from "@/components/common/FeedLoader";
import FeedHeading from "@/components/feed/FeedHeading";
import MyPostsFilter from "@/components/feed/MyPostsFilter";
import MyPostsStats from "@/components/feed/MyPostsStats";
import Pagination from "@/components/feed/Pagination";
import PostCard from "@/components/feed/PostCard";
import Navbar from "@/components/Navbar";
import NoPost from "@/components/post/NoPost";
import PostLoadError from "@/components/post/PostLoadError";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paths } from "@/constants";
import {
  ALL_POSTS,
  APPROVED_LABEL,
  MY_POSTS_LOADING,
  MY_POSTS_SUBTITLE,
  MY_POSTS_TITLE,
  NEXT,
  PAGE_LABEL,
  PENDING_LABEL,
  PREVIOUS,
  WRITE_BUTTON
} from "@/constants/feed";
import { MyPostsProvider, useMyPosts } from "@/context/MyPostsContext";
import { motion } from "framer-motion";
import { PenTool } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyPostsInner: React.FC = () => {
  const {
    posts,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    totalPages,
    totalCount,
    hasLoaded,
    isApproved,
    setIsApproved,
    loadPosts,
    deletePost,
    activeTab,
    setActiveTab,
    publishedPosts,
    pendingPosts,
    filteredPosts,
  } = useMyPosts();
  const [expanded, setExpanded] = React.useState(false);

  const labelVariants = {
    rest: {
      opacity: 0,
      x: -6,
      scaleX: 0,
      maxWidth: 0,
      paddingLeft: 0,
      transition: { duration: 0.12 },
    },
    hover: {
      opacity: 1,
      x: 0,
      scaleX: 1,
      maxWidth: 160,
      paddingLeft: 8,
      transition: { duration: 0.18 },
    },
  } as const;

  if (loading && !hasLoaded) {
    return (
      <div className="w-full bg-background grid grid-cols-[auto,1fr]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center mt-16">
          <FeedLoader message={MY_POSTS_LOADING} skeletons={3} />
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Background>
        <div className="relative">
          <div className="h-16 bg-transparent" />
          <Navbar />
        </div>

        <div className="mt-8">
          <FeedHeading title={MY_POSTS_TITLE} subtitle={MY_POSTS_SUBTITLE} />
        </div>

        <main className="container mx-auto px-4 pb-8 max-w-7xl">
          <MyPostsStats
            totalCount={posts.length}
            publishedPosts={publishedPosts}
            pendingPosts={pendingPosts}
            posts={posts}
          />

          <MyPostsFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isApproved={isApproved}
            setIsApproved={setIsApproved}
            loadPosts={loadPosts}
            loading={loading}
            setPage={setPage}
          />

          {error && (
            <PostLoadError
              error={error}
              loadPosts={loadPosts}
              page={page}
              searchTerm={searchTerm}
              isApproved={isApproved}
            />
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm">
              <TabsTrigger value="all" className="font-bengali">
                {ALL_POSTS} ({posts.length})
              </TabsTrigger>
              <TabsTrigger value="published" className="font-bengali">
                {APPROVED_LABEL} ({publishedPosts.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="font-bengali">
                {PENDING_LABEL} ({pendingPosts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard post={post} key={post.id} showMenu />
                ))}

                {filteredPosts.length === 0 && hasLoaded && !loading && (
                  <NoPost searchTerm={searchTerm} />
                )}
              </div>
            </TabsContent>
          </Tabs>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => {
              if (page > 1) {
                const np = page - 1;
                setPage(np);
                void loadPosts(np, searchTerm, isApproved);
              }
            }}
            onNext={() => {
              if (page < totalPages) {
                const np = page + 1;
                setPage(np);
                void loadPosts(np, searchTerm, isApproved);
              }
            }}
            disabled={loading}
            pageLabel={PAGE_LABEL}
            previousLabel={PREVIOUS}
            nextLabel={NEXT}
          />
        </main>

        <Link href={paths.write} className="fixed right-6 bottom-6 z-50">
          <motion.div
            className="rounded-full overflow-hidden"
            initial={false}
            animate={expanded ? { width: 180 } : { width: 48 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
          >
            <Button
              className="rounded-full bg-primary/90 hover:bg-primary/80 backdrop-blur-sm text-white shadow-lg flex items-center justify-center h-12 p-3 w-full"
              aria-label="Write a new post"
              style={{ width: "100%" }}
              onFocus={() => setExpanded(true)}
              onBlur={() => setExpanded(false)}
            >
              <div className="flex items-center">
                <PenTool className="h-5 w-5 text-white" />
                <motion.span
                  className="font-bengali overflow-hidden whitespace-nowrap inline-block"
                  variants={labelVariants}
                  initial="rest"
                  animate={expanded ? "hover" : "rest"}
                  style={{ transformOrigin: "left" }}
                >
                  {WRITE_BUTTON}
                </motion.span>
              </div>
            </Button>
          </motion.div>
        </Link>
      </Background>
    </ProtectedRoute>
  );
};

const MyPostsPage: React.FC = () => (
  <MyPostsProvider>
    <MyPostsInner />
  </MyPostsProvider>
);

export default MyPostsPage;
