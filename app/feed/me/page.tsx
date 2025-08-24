"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import { Icons } from "@/components/common/Icons";
import FeedHeading from "@/components/feed/FeedHeading";
import MyPostsFilter from "@/components/feed/MyPostsFilter";
import MyPostsStats from "@/components/feed/MyPostsStats";
import Pagination from "@/components/feed/Pagination";
import PostCard from "@/components/feed/PostCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  WRITE_BUTTON
} from "@/constants/feed";
import { MyPostsProvider, useMyPosts } from "@/context/MyPostsContext";
import { FileText, PenTool } from "lucide-react";
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
  } = useMyPosts();

  const [activeTab, setActiveTab] = React.useState("all");
  const [deleteLoading, setDeleteLoading] = React.useState<number | null>(null);

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
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
          <div className="relative">
            <div className="h-16 bg-gradient-to-r from-red-600 to-orange-600"></div>
            <Navbar />
          </div>
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="font-bengali text-gray-600">{MY_POSTS_LOADING}</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
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
            totalCount={totalCount}
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
                      আবার চেষ্টা করুন
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
                        {searchTerm
                          ? NO_MY_POSTS_SEARCH
                          : "আপনি এখনো কোনো পোস্ট তৈরি করেননি।"}
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
