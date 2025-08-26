"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import { Icons } from "@/components/common/Icons";
import FeedHeading from "@/components/feed/FeedHeading";
import MyPostsFilter from "@/components/feed/MyPostsFilter";
import FeedLoader from "@/components/common/FeedLoader";
import MyPostsStats from "@/components/feed/MyPostsStats";
import Pagination from "@/components/feed/Pagination";
import PostCard from "@/components/feed/PostCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paths } from "@/constants";
import {
  APPROVED_LABEL,
  DELETE_CONFIRM,
  MY_POSTS_LOADING,
  MY_POSTS_SUBTITLE,
  MY_POSTS_TITLE,
  NEXT,
  NO_MY_POSTS,
  NO_MY_POSTS_SEARCH,
  PAGE_LABEL,
  PENDING_LABEL,
  PREVIOUS,
  WRITE_BUTTON,
  RETRY_BUTTON,
  NO_MY_POSTS_YET,
} from "@/constants/feed";
import { MyPostsProvider, useMyPosts } from "@/context/MyPostsContext";
import { FileText, PenTool } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

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
  } = useMyPosts();

  const [activeTab, setActiveTab] = React.useState("all");
  const [deleteLoading, setDeleteLoading] = React.useState<number | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  const publishedPosts = posts.filter((p) => p.isApproved);
  const pendingPosts = posts.filter((p) => !p.isApproved);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.post
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && post.isApproved) ||
      (activeTab === "pending" && !post.isApproved);
    return matchesSearch && matchesTab;
  });

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

  const handleDelete = async (id: number) => {
    if (!confirm(DELETE_CONFIRM)) return;
    try {
      setDeleteLoading(id);
      await deletePost(id);
    } finally {
      setDeleteLoading(null);
    }
  };

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
            <Card className="border-l-4 border-l-red-500 bg-red-50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <Icons.X className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-red-700 font-bengali">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 font-bengali"
                      onClick={() =>
                        void loadPosts(page, searchTerm, isApproved)
                      }
                    >
                      {RETRY_BUTTON}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm">
              <TabsTrigger value="all" className="font-bengali">
                সব পোস্ট ({posts.length})
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
                  <Card className="bg-white/90 backdrop-blur-sm border-red-100">
                    <CardContent className="p-12 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-kalpurush text-lg font-semibold text-gray-600 mb-2">
                        {NO_MY_POSTS}
                      </h3>
                      <p className="font-bengali text-gray-500 mb-4">
                        {searchTerm ? NO_MY_POSTS_SEARCH : NO_MY_POSTS_YET}
                      </p>
                      <Link href="/write">
                        <Button className="bg-red-600 hover:bg-red-700 font-bengali">
                          <PenTool className="h-4 w-4 mr-2" />
                          {WRITE_BUTTON}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
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
