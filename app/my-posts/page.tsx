"use client";

import { useState, useCallback } from "react";
import { Icons } from "@/components/common/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  FileText,
  PenTool,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/navbar";
import { useBackendApi } from "@/utils/api-client";
import type { KonthoKoshFeedPost } from "@/types/konthokosh-api";
import Link from "next/link";

export default function MyPostsPage() {
  const api = useBackendApi();
  
  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const loadPosts = useCallback(async (pageNum: number, searchKeyword: string = "", approvalStatus: boolean | null = null) => {
    setLoading(true);
    setError("");
    
    try {
      const params: Record<string, string | number | boolean> = {
        page: pageNum,
        size: 10,
        myPosts: true, // Always true for My Posts
      };

      if (searchKeyword) {
        params.keyword = searchKeyword;
      }

      if (approvalStatus !== null) {
        params.isApproved = approvalStatus;
      }

      const response = await api.get("/api/v1/posts", { params });

      const data = response.data as { 
        success: boolean; 
        data: { 
          data: KonthoKoshFeedPost[]; 
          pagination: { 
            totalPages: number; 
            totalCount: number; 
          } 
        } 
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
  }, [api]);

  const deletePost = useCallback(async (postId: number) => {
    setDeleteLoading(postId);
    
    try {
      const response = await api.delete(`/api/v1/posts/${postId}`);
      
      if (response.status === 200 || response.status === 204) {
        // Remove the deleted post from the current posts list
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        setTotalCount(prevCount => Math.max(0, prevCount - 1));
        
        // If this was the last post on the current page and we're not on page 1, go to previous page
        if (posts.length === 1 && page > 1) {
          const newPage = page - 1;
          setPage(newPage);
          loadPosts(newPage, searchTerm, isApproved);
        }
      } else {
        setError("পোস্ট মুছতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } catch (err) {
      setError("পোস্ট মুছতে ব্যর্থ। আপনার সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।");
      console.error("Delete error:", err);
    } finally {
      setDeleteLoading(null);
    }
  }, [api, posts.length, page, searchTerm, isApproved, loadPosts]);

  const handleInitialLoad = () => {
    if (!hasLoaded) {
      loadPosts(1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadPosts(1, searchTerm, isApproved);
  };

  const handleApprovalFilter = (status: boolean | null) => {
    setIsApproved(status);
    setPage(1);
    loadPosts(1, searchTerm, status);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      loadPosts(newPage, searchTerm, isApproved);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      loadPosts(newPage, searchTerm, isApproved);
    }
  };

  // Auto-load on first render
  if (!hasLoaded && !loading) {
    handleInitialLoad();
  }

  const publishedPosts = posts.filter((post) => post.isApproved);
  const pendingPosts = posts.filter((post) => !post.isApproved);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.post.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && post.isApproved) ||
      (activeTab === "pending" && !post.isApproved);
    return matchesSearch && matchesTab;
  });

  const handleDeletePost = (postId: number) => {
    if (confirm("আপনি কি নিশ্চিত যে এই পোস্টটি মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।")) {
      deletePost(postId);
    }
  };

  const totalViews = 0; // API doesn't provide view count
  const totalLikes = 0; // API doesn't provide like count  
  const totalComments = 0; // API doesn't provide comment count

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
              <p className="font-bengali text-gray-600">আপনার পোস্ট লোড হচ্ছে...</p>
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

        {/* My Posts Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-kalpurush font-bold text-red-800">আমার পোস্টসমূহ</h1>
                <Badge variant="secondary" className="font-bengali">
                  {totalCount} টি পোস্ট
                </Badge>
              </div>
              <Link href="/write">
                <Button className="bg-red-600 hover:bg-red-700 font-bengali">
                  <PenTool className="h-4 w-4 mr-2" />
                  নতুন পোস্ট লিখুন
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bengali text-blue-600 text-sm font-medium">মোট পোস্ট</p>
                    <p className="text-2xl font-bold text-blue-800">{totalCount}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bengali text-green-600 text-sm font-medium">অনুমোদিত</p>
                    <p className="text-2xl font-bold text-green-800">{publishedPosts.length}</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bengali text-yellow-600 text-sm font-medium">অপেক্ষমাণ</p>
                    <p className="text-2xl font-bold text-yellow-800">{pendingPosts.length}</p>
                  </div>
                  <Heart className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bengali text-purple-600 text-sm font-medium">সক্রিয়</p>
                    <p className="text-2xl font-bold text-purple-800">{posts.filter(p => p.isActive).length}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="bg-white/90 backdrop-blur-sm border-red-100 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
                  <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-80">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="পোস্ট খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-red-200 focus:border-red-400 font-bengali"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-red-600 hover:bg-red-700 font-bengali" 
                      disabled={loading}
                    >
                      {loading ? "খুঁজছি..." : "খুঁজুন"}
                    </Button>
                  </form>
                  
                  {/* Approval Status Filter */}
                  <div className="flex gap-2">
                    <Button
                      variant={isApproved === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleApprovalFilter(null)}
                      className="font-bengali"
                    >
                      সব
                    </Button>
                    <Button
                      variant={isApproved === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleApprovalFilter(true)}
                      className="font-bengali"
                    >
                      অনুমোদিত
                    </Button>
                    <Button
                      variant={isApproved === false ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleApprovalFilter(false)}
                      className="font-bengali"
                    >
                      অপেক্ষমাণ
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
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
                      onClick={() => loadPosts(page, searchTerm, isApproved)}
                    >
                      আবার চেষ্টা করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm">
              <TabsTrigger value="all" className="font-bengali">
                সব পোস্ট ({posts.length})
              </TabsTrigger>
              <TabsTrigger value="published" className="font-bengali">
                অনুমোদিত ({publishedPosts.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="font-bengali">
                অপেক্ষমাণ ({pendingPosts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-kalpurush font-bold text-gray-900">
                              {post.post.split('\n')[0] || `পোস্ট #${post.id}`}
                            </h3>
                            <Badge
                              variant={post.isApproved ? "default" : "secondary"}
                              className="font-bengali text-xs"
                            >
                              {post.isApproved ? "অনুমোদিত" : "অপেক্ষমাণ"}
                            </Badge>
                            <Badge variant="outline" className="font-bengali text-xs">
                              {post.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                            </Badge>
                          </div>

                          <p className="font-bengali text-gray-600 text-sm mb-4 line-clamp-3 whitespace-pre-wrap">
                            {post.post}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Icons.User className="h-4 w-4" />
                                <span className="font-bengali">ID: {post.id}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span className="font-bengali">
                                  {new Date(post.createdAt).toLocaleDateString("bn-BD")}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span className="font-bengali">
                                সর্বশেষ: {new Date(post.updatedAt).toLocaleString("bn-BD")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="font-bengali">
                              <Eye className="h-4 w-4 mr-2" />
                              দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-bengali">
                              <Edit className="h-4 w-4 mr-2" />
                              সম্পাদনা
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="font-bengali text-red-600 focus:text-red-600"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {deleteLoading === post.id ? "মুছছি..." : "মুছে ফেলুন"}
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="font-kalpurush">পোস্ট মুছে ফেলুন?</AlertDialogTitle>
                                  <AlertDialogDescription className="font-bengali">
                                    আপনি কি নিশ্চিত যে এই পোস্টটি মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="font-bengali">বাতিল</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeletePost(post.id)}
                                    className="bg-red-600 hover:bg-red-700 font-bengali"
                                    disabled={deleteLoading === post.id}
                                  >
                                    {deleteLoading === post.id ? "মুছছি..." : "মুছে ফেলুন"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredPosts.length === 0 && hasLoaded && !loading && (
                  <Card className="bg-white/90 backdrop-blur-sm border-red-100">
                    <CardContent className="p-12 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-kalpurush text-lg font-semibold text-gray-600 mb-2">কোনো পোস্ট পাওয়া যায়নি</h3>
                      <p className="font-bengali text-gray-500 mb-4">
                        {searchTerm ? "আপনার অনুসন্ধান অনুযায়ী কোনো পোস্ট খুঁজে পাওয়া যায়নি।" : "আপনি এখনো কোনো পোস্ট তৈরি করেননি।"}
                      </p>
                      <Link href="/write">
                        <Button className="bg-red-600 hover:bg-red-700 font-bengali">
                          <PenTool className="h-4 w-4 mr-2" />
                          নতুন পোস্ট লিখুন
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          {totalPages > 1 && (
            <Card className="bg-white/90 backdrop-blur-sm border-red-100 mt-6">
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
        </main>
      </div>
    </ProtectedRoute>
  );
}
