"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FeedLoader from "@/components/common/FeedLoader";
import { Icons } from "@/components/common/Icons";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { KonthoKoshFeedPost } from "@/types/konthokosh-api";
import { useBackendApi } from "@/utils/api-client";
import { Heart, MessageCircle, Share2 } from "lucide-react";
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
        <div
          className="min-h-screen"
          style={{ background: "var(--color-background)" }}
        >
          <Navbar />
          <FeedLoader message={"ফিড লোড হচ্ছে..."} />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div
        className="relative min-h-screen pt-20 pb-12"
        style={{ background: "var(--color-background)" }}
      >
        <Navbar />

        <main className="container mx-auto px-4 max-w-3xl mt-20">
          <header className="-mt-6 mb-6 text-center">
            <h1
              className="text-2xl md:text-3xl font-kalpurush font-semibold"
              style={{ color: "var(--color-foreground)" }}
            >
              সাম্প্রতিক পোস্ট
            </h1>
            <p className="mt-2 text-sm text-[color:var(--color-muted-foreground)] font-bengali">
              নির্ধারিত সম্প্রদায় থেকে কিউরেট করা, পাঠ করুন ও মতামত দিন
            </p>
          </header>

          <div className="space-y-6">
            <div className="flex justify-center">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="পোস্ট, লেখক বা কীওয়ার্ড খুঁজুন..."
                    className="pl-12 pr-36 py-3 rounded-full shadow-sm font-bengali text-sm"
                    style={{
                      borderColor: "transparent",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                      color: "var(--color-foreground)",
                    }}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icons.Search className="h-4 w-4" />
                  </div>
                  <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <Button
                      type="submit"
                      className="rounded-full px-4 py-2 text-sm font-bengali"
                      disabled={loading}
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-foreground)",
                        boxShadow: "0 6px 18px rgba(99,102,241,0.08)",
                      }}
                    >
                      {loading ? "অনুসন্ধান..." : "খুঁজুন"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {error && (
              <div className="rounded-lg bg-[color:var(--color-destructive)]/6 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-destructive)]">
                    <Icons.X className="h-5 w-5 text-[color:var(--color-destructive-foreground)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bengali text-[color:var(--color-destructive)]">
                      {error}
                    </p>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-bengali"
                        onClick={() => loadPosts(page, keyword)}
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        আবার চেষ্টা করুন
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {posts.length === 0 && hasLoaded && !loading && (
                <Card
                  className="bg-[color:var(--color-card)]/80 backdrop-blur-sm"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <CardContent className="p-6 text-center">
                    <p className="font-bengali text-[color:var(--color-muted-foreground)]">
                      কোন পোস্ট পাওয়া যায়নি।{" "}
                      {keyword && "অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।"}
                    </p>
                  </CardContent>
                </Card>
              )}

              {posts.map((post) => (
                <article key={post.id} className="relative">
                  <Card
                    className="overflow-hidden rounded-2xl hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                    style={{
                      borderColor: "transparent",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 flex-shrink-0 rounded-full bg-[color:var(--color-secondary)] overflow-hidden">
                          {post.userImageUrl ? (
                            <img
                              src={post.userImageUrl}
                              alt={post.userFirstName || "ব্যবহারকারী"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full">
                              <Icons.User className="h-6 w-6 text-[color:var(--color-secondary-foreground)]" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <h3
                                className="text-sm md:text-base font-kalpurush font-semibold"
                                style={{ color: "var(--color-foreground)" }}
                              >
                                {post.userFirstName || "ব্যবহারকারী"}{" "}
                                {post.userLastName || ""}
                              </h3>
                              <p className="text-xs mt-1 font-bengali text-[color:var(--color-muted-foreground)]">
                                {new Date(post.createdAt).toLocaleString(
                                  "bn-BD"
                                )}
                              </p>
                            </div>

                            <div className="text-xs font-bengali text-[color:var(--color-muted-foreground)] text-right">
                              <div>ID: {post.id}</div>
                              <div className="mt-1">
                                {post.isApproved ? "অনুমোদিত" : "অপেক্ষমাণ"}
                              </div>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="font-bengali text-sm leading-relaxed whitespace-pre-wrap break-words text-[color:var(--color-foreground)]">
                            {post.post}
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="font-bengali"
                                style={{
                                  color: "var(--color-muted-foreground)",
                                }}
                              >
                                <Heart className="h-4 w-4 mr-1" />
                                <span>পছন্দ</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="font-bengali"
                                style={{
                                  color: "var(--color-muted-foreground)",
                                }}
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span>মন্তব্য</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="font-bengali"
                                style={{
                                  color: "var(--color-muted-foreground)",
                                }}
                              >
                                <Share2 className="h-4 w-4 mr-1" />
                                <span>শেয়ার</span>
                              </Button>
                            </div>

                            <div className="text-xs text-[color:var(--color-muted-foreground)] font-bengali">
                              {totalCount ? `${totalCount} পোস্ট` : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div
                className="flex items-center justify-between bg-[color:var(--color-card)]/60 backdrop-blur-sm p-3 rounded-full"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="text-sm text-[color:var(--color-muted-foreground)] font-bengali">
                  পৃষ্ঠা {page} / {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={page <= 1 || loading}
                    className="font-bengali rounded-full"
                  >
                    পূর্ববর্তী
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={page >= totalPages || loading}
                    className="font-bengali rounded-full"
                  >
                    পরবর্তী
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default FeedPage;
