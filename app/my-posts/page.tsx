"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/alert-dialog"
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
} from "lucide-react"
import { useState } from "react"

// Mock data for user's posts
const mockUserPosts = [
  {
    id: 1,
    title: "বর্ষার প্রথম দিন",
    content:
      "আজ বর্ষার প্রথম দিন। আকাশ ভেঙে পড়া বৃষ্টিতে মন ভিজে গেল। রিকশায় চড়ে অফিস যাওয়ার পথে দেখলাম রাস্তার পাশে দাঁড়িয়ে থাকা সেই চা বিক্রেতা...",
    category: "গল্প",
    status: "published",
    likes: 45,
    comments: 12,
    shares: 8,
    views: 234,
    publishedAt: "২০২৪-০১-১৫",
    lastModified: "২০২৪-০১-১৫",
  },
  {
    id: 2,
    title: "মায়ের হাতের রান্না",
    content: "মায়ের হাতের রান্নার স্বাদ কখনো ভোলা যায় না। আজ অনেকদিন পর মায়ের রান্না করা ইলিশ মাছের ভর্তা খেলাম...",
    category: "স্মৃতিকথা",
    status: "published",
    likes: 78,
    comments: 23,
    shares: 15,
    views: 456,
    publishedAt: "২০২৪-০১-১২",
    lastModified: "২০২৪-০১-১৩",
  },
  {
    id: 3,
    title: "অসমাপ্ত কবিতা",
    content: "এই কবিতাটি এখনো লেখা শেষ হয়নি। মনের গভীরে লুকিয়ে থাকা অনুভূতিগুলো কাগজে তুলে আনার চেষ্টা করছি...",
    category: "কবিতা",
    status: "draft",
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
    publishedAt: null,
    lastModified: "২০২ৄ-০১-১৮",
  },
  {
    id: 4,
    title: "স্বাধীনতার মূল্য",
    content: "স্বাধীনতা শুধু একটি শব্দ নয়, এটি আমাদের অস্তিত্বের মূল ভিত্তি। আমাদের পূর্বপুরুষরা যে স্বাধীনতার জন্য জীবন দিয়েছেন...",
    category: "প্রবন্ধ",
    status: "published",
    likes: 156,
    comments: 67,
    shares: 45,
    views: 892,
    publishedAt: "২০২৪-০১-১০",
    lastModified: "২০২৪-০১-১০",
  },
  {
    id: 5,
    title: "নতুন প্রজন্মের চ্যালেঞ্জ",
    content: "আজকের যুগে তরুণ প্রজন্মের সামনে অনেক চ্যালেঞ্জ। প্রযুক্তির এই যুগে কিভাবে আমরা আমাদের সংস্কৃতি রক্ষা করব...",
    category: "সমাজ",
    status: "draft",
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0,
    publishedAt: null,
    lastModified: "২০২৪-০১-১৭",
  },
]

export default function MyPostsPage() {
  const [posts, setPosts] = useState(mockUserPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const publishedPosts = posts.filter((post) => post.status === "published")
  const draftPosts = posts.filter((post) => post.status === "draft")

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || post.category === filterCategory
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && post.status === "published") ||
      (activeTab === "drafts" && post.status === "draft")
    return matchesSearch && matchesCategory && matchesTab
  })

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const totalViews = publishedPosts.reduce((sum, post) => sum + post.views, 0)
  const totalLikes = publishedPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = publishedPosts.reduce((sum, post) => sum + post.comments, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-kalpurush font-bold text-red-800">আমার পোস্টসমূহ</h1>
              <Badge variant="secondary" className="font-bengali">
                {posts.length} টি পোস্ট
              </Badge>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 font-bengali">
              <PenTool className="h-4 w-4 mr-2" />
              নতুন পোস্ট লিখুন
            </Button>
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
                  <p className="text-2xl font-bold text-blue-800">{posts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bengali text-green-600 text-sm font-medium">মোট ভিউ</p>
                  <p className="text-2xl font-bold text-green-800">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bengali text-red-600 text-sm font-medium">মোট লাইক</p>
                  <p className="text-2xl font-bold text-red-800">{totalLikes}</p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bengali text-purple-600 text-sm font-medium">মোট মন্তব্য</p>
                  <p className="text-2xl font-bold text-purple-800">{totalComments}</p>
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
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="পোস্ট খুঁজুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-red-200 focus:border-red-400"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full md:w-48 border-red-200">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="বিভাগ ফিল্টার" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-bengali">
                      সব বিভাগ
                    </SelectItem>
                    <SelectItem value="গল্প" className="font-bengali">
                      গল্প
                    </SelectItem>
                    <SelectItem value="কবিতা" className="font-bengali">
                      কবিতা
                    </SelectItem>
                    <SelectItem value="প্রবন্ধ" className="font-bengali">
                      প্রবন্ধ
                    </SelectItem>
                    <SelectItem value="স্মৃতিকথা" className="font-bengali">
                      স্মৃতিকথা
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm">
            <TabsTrigger value="all" className="font-bengali">
              সব পোস্ট ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="published" className="font-bengali">
              প্রকাশিত ({publishedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="drafts" className="font-bengali">
              ড্রাফট ({draftPosts.length})
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
                          <h3 className="text-xl font-kalpurush font-bold text-gray-900">{post.title}</h3>
                          <Badge
                            variant={post.status === "published" ? "default" : "secondary"}
                            className="font-bengali text-xs"
                          >
                            {post.status === "published" ? "প্রকাশিত" : "ড্রাফট"}
                          </Badge>
                          <Badge variant="outline" className="font-bengali text-xs">
                            {post.category}
                          </Badge>
                        </div>

                        <p className="font-bengali text-gray-600 text-sm mb-4 line-clamp-2">{post.content}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            {post.status === "published" && (
                              <>
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span className="font-bengali">{post.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-4 w-4" />
                                  <span className="font-bengali">{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span className="font-bengali">{post.comments}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Share2 className="h-4 w-4" />
                                  <span className="font-bengali">{post.shares}</span>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span className="font-bengali">
                              {post.status === "published"
                                ? `প্রকাশিত: ${post.publishedAt}`
                                : `সর্বশেষ: ${post.lastModified}`}
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
                          <DropdownMenuItem className="font-bengali">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            পরিসংখ্যান
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="font-bengali text-red-600 focus:text-red-600"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                মুছে ফেলুন
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
                                >
                                  মুছে ফেলুন
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

              {filteredPosts.length === 0 && (
                <Card className="bg-white/90 backdrop-blur-sm border-red-100">
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-kalpurush text-lg font-semibold text-gray-600 mb-2">কোনো পোস্ট পাওয়া যায়নি</h3>
                    <p className="font-bengali text-gray-500 mb-4">আপনার অনুসন্ধান অনুযায়ী কোনো পোস্ট খুঁজে পাওয়া যায়নি।</p>
                    <Button className="bg-red-600 hover:bg-red-700 font-bengali">
                      <PenTool className="h-4 w-4 mr-2" />
                      নতুন পোস্ট লিখুন
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
