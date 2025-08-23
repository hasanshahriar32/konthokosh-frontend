"use client";

import { useState, useCallback } from "react";
import { Icons } from "@/components/common/Icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { useBackendApi } from "@/utils/api-client";
import type { KonthoKoshFeedPost } from "@/types/konthokosh-api";
import { Heart, MessageCircle, Share2 } from "lucide-react";

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
          setError("পোস্ট লোড করতে ব্যর্থ");
        }
      } catch {
        setError("নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    },
    [api]
  );

  const handleInitialLoad = () => {
    if (!hasLoaded) {
      loadPosts(1);
    }
  };

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

  // Auto-load on first render
  if (!hasLoaded && !loading) {
    handleInitialLoad();
  }

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
              <p className="font-bengali text-gray-600">ফিড লোড হচ্ছে...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        <div className="relative">
          <div className="h-16 bg-gradient-to-r from-red-600 to-orange-600"></div>
          <Navbar />
        </div>

        {/* Feed Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-kalpurush font-bold text-red-800">
                  কমিউনিটি ফিড
                </h1>
                <Badge variant="secondary" className="font-bengali">
                  {totalCount} টি পোস্ট
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            {/* Search Section */}
            <Card className="bg-white/90 backdrop-blur-sm border-red-100">
              <CardContent className="p-4">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="পোস্ট অনুসন্ধান করুন..."
                      className="pl-9 font-bengali border-red-200 focus:border-red-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 font-bengali"
                    disabled={loading}
                  >
                    {loading ? "অনুসন্ধান..." : "খুঁজুন"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <Icons.X className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-red-700 font-bengali">
                        {error}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 font-bengali"
                        onClick={() => loadPosts(page, keyword)}
                      >
                        আবার চেষ্টা করুন
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            <div className="space-y-6">
              {posts.length === 0 && hasLoaded && !loading && (
                <Card className="bg-white/90 backdrop-blur-sm border-red-100">
                  <CardContent className="p-6 text-center">
                    <p className="font-bengali text-gray-600">
                      কোন পোস্ট পাওয়া যায়নি।
                      {keyword && " অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।"}
                    </p>
                  </CardContent>
                </Card>
              )}

              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 space-y-4">
                    {/* Post Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
                        {post.userImageUrl ? (
                          <img
                            src={post.userImageUrl}
                            alt={post.userFirstName || "ব্যবহারকারী"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Icons.User className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-kalpurush font-medium text-red-800">
                          {post.userFirstName || "ব্যবহারকারী"}{" "}
                          {post.userLastName || ""}
                        </div>
                        <div className="text-xs text-gray-500 font-bengali">
                          {new Date(post.createdAt).toLocaleString("bn-BD")}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Post Content */}
                    <div className="space-y-3">
                      <div className="font-bengali text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {post.post}
                      </div>
                    </div>

                    {/* Post Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="font-bengali">পছন্দ</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-600"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="font-bengali">মন্তব্য</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          <span className="font-bengali">শেয়ার</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-bengali">ID: {post.id}</span>
                        <span>•</span>
                        <span className="font-bengali">
                          {post.isApproved ? "অনুমোদিত" : "অপেক্ষমাণ"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Card className="bg-white/90 backdrop-blur-sm border-red-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 font-bengali">
                      পৃষ্ঠা {page} / {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevPage}
                        disabled={page <= 1 || loading}
                        className="font-bengali border-red-200 hover:bg-red-50"
                      >
                        পূর্ববর্তী
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={page >= totalPages || loading}
                        className="font-bengali border-red-200 hover:bg-red-50"
                      >
                        পরবর্তী
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default FeedPage;
