"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    author: {
      name: "রহিম উদ্দিন",
      username: "@rahim_writer",
      avatar: "/bengali-writer-avatar.png",
    },
    title: "বর্ষার প্রথম দিন",
    content:
      "আজ বর্ষার প্রথম দিন। আকাশ ভেঙে পড়া বৃষ্টিতে মন ভিজে গেল। রিকশায় চড়ে অফিস যাওয়ার পথে দেখলাম রাস্তার পাশে দাঁড়িয়ে থাকা সেই চা বিক্রেতা। তার মুখে এক অদ্ভুত হাসি। বৃষ্টিতে ভিজে যাওয়া মানুষগুলো তার দোকানে আশ্রয় নিচ্ছে। আর সে পরিবেশন করছে গরম চা।",
    category: "গল্প",
    likes: 45,
    comments: 12,
    shares: 8,
    timestamp: "২ ঘন্টা আগে",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    author: {
      name: "ফাতেমা খাতুন",
      username: "@fatema_poet",
      avatar: "/bengali-female-poet-avatar.png",
    },
    title: "মায়ের হাতের রান্না",
    content:
      "মায়ের হাতের রান্নার স্বাদ কখনো ভোলা যায় না। আজ অনেকদিন পর মায়ের রান্না করা ইলিশ মাছের ভর্তা খেলাম। প্রতিটি কামড়ে ছিল অসীম ভালোবাসার স্বাদ। মনে পড়ে গেল ছোটবেলার সেই দিনগুলো, যখন স্কুল থেকে ফিরে মায়ের হাতের রান্না খেতাম।",
    category: "স্মৃতিকথা",
    likes: 78,
    comments: 23,
    shares: 15,
    timestamp: "৪ ঘন্টা আগে",
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 3,
    author: {
      name: "করিম মিয়া",
      username: "@karim_blogger",
      avatar: "/bengali-blogger-avatar.png",
    },
    title: "পুরান ঢাকার গলিপথ",
    content:
      "পুরান ঢাকার সরু গলিপথ দিয়ে হাঁটতে হাঁটতে মনে হয় যেন সময় থেমে গেছে। প্রতিটি দেয়ালে লেখা আছে ইতিহাসের গল্প। রিকশার ঘন্টির আওয়াজ, হকারদের ডাক, আর পুরনো বাড়িগুলোর জানালা থেকে ভেসে আসা রান্নার গন্ধ - সবকিছু মিলে এক অনন্য পরিবেশ।",
    category: "ভ্রমণ",
    likes: 92,
    comments: 34,
    shares: 28,
    timestamp: "৬ ঘন্টা আগে",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 4,
    author: {
      name: "সালমা আক্তার",
      username: "@salma_essayist",
      avatar: "/bengali-female-writer-avatar.png",
    },
    title: "স্বাধীনতার মূল্য",
    content:
      "স্বাধীনতা শুধু একটি শব্দ নয়, এটি আমাদের অস্তিত্বের মূল ভিত্তি। আমাদের পূর্বপুরুষরা যে স্বাধীনতার জন্য জীবন দিয়েছেন, সেই স্বাধীনতার মর্যাদা রক্ষা করা আমাদের দায়িত্ব। আজকের এই ডিজিটাল যুগেও আমাদের মত প্রকাশের স্বাধীনতা রক্ষা করতে হবে।",
    category: "প্রবন্ধ",
    likes: 156,
    comments: 67,
    shares: 45,
    timestamp: "৮ ঘন্টা আগে",
    isLiked: true,
    isBookmarked: false,
  },
]

export default function FeedPage() {
  const [posts, setPosts] = useState(mockPosts)

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleBookmark = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="relative">
        <div className="h-20 bg-gradient-to-r from-red-600 to-orange-600"></div>
        <Navbar />
      </div>

      {/* Feed Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-kalpurush font-bold text-red-800">ফিড</h1>
              <Badge variant="secondary" className="font-bengali">
                সর্বশেষ পোস্ট
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="font-bengali bg-transparent">
                ফিল্টার
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 font-bengali">নতুন পোস্ট লিখুন</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="bg-white/90 backdrop-blur-sm border-red-100 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback className="font-bengali">{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-kalpurush font-semibold text-gray-900">{post.author.name}</h3>
                      <p className="text-sm text-gray-500 font-bengali">
                        {post.author.username} • {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-kalpurush font-bold text-gray-900">{post.title}</h2>
                    <Badge variant="outline" className="font-bengali text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <p className="font-bengali text-gray-700 leading-relaxed text-base">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 ${post.isLiked ? "text-red-600" : "text-gray-600"} hover:text-red-600`}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                      <span className="font-bengali text-sm">{post.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="font-bengali text-sm">{post.comments}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-600"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="font-bengali text-sm">{post.shares}</span>
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(post.id)}
                    className={`${post.isBookmarked ? "text-yellow-600" : "text-gray-600"} hover:text-yellow-600`}
                  >
                    <Bookmark className={`h-4 w-4 ${post.isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="font-bengali px-8 py-3 bg-transparent">
            আরও পোস্ট লোড করুন
          </Button>
        </div>
      </main>
    </div>
  )
}
