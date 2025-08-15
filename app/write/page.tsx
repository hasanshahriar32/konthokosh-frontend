"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Send, Eye, FileText, Hash, Shield, Clock } from "lucide-react"
import { useState } from "react"

const categories = [
  "গল্প",
  "কবিতা",
  "প্রবন্ধ",
  "স্মৃতিকথা",
  "ভ্রমণ",
  "সমালোচনা",
  "হাস্যরস",
  "সংস্কৃতি",
  "ইতিহাস",
  "রাজনীতি",
  "সমাজ",
  "অন্যান্য",
]

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [enableComments, setEnableComments] = useState(true)
  const [isPreview, setIsPreview] = useState(false)

  const handleSaveDraft = () => {
    // Save as draft logic
    console.log("Saving draft...")
  }

  const handlePublish = () => {
    // Publish logic with blockchain verification
    console.log("Publishing post...")
  }

  const togglePreview = () => {
    setIsPreview(!isPreview)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-red-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-kalpurush font-bold text-red-800">নতুন পোস্ট লিখুন</h1>
              <Badge variant="secondary" className="font-bengali">
                <Shield className="h-3 w-3 mr-1" />
                ব্লকচেইন সুরক্ষিত
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={togglePreview} className="font-bengali bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? "সম্পাদনা" : "প্রিভিউ"}
              </Button>
              <Button variant="outline" onClick={handleSaveDraft} className="font-bengali bg-transparent">
                <Save className="h-4 w-4 mr-2" />
                ড্রাফট সেভ
              </Button>
              <Button onClick={handlePublish} className="bg-red-600 hover:bg-red-700 font-bengali">
                <Send className="h-4 w-4 mr-2" />
                প্রকাশ করুন
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Writing Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-red-100">
              <CardHeader>
                <CardTitle className="font-kalpurush text-red-800 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  আপনার লেখা
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isPreview ? (
                  <>
                    {/* Title Input */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-bengali text-gray-700">
                        শিরোনাম
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="আপনার পোস্টের শিরোনাম লিখুন..."
                        className="text-lg font-kalpurush border-red-200 focus:border-red-400"
                      />
                    </div>

                    {/* Content Textarea */}
                    <div className="space-y-2">
                      <Label htmlFor="content" className="font-bengali text-gray-700">
                        বিষয়বস্তু
                      </Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="আপনার গল্প, কবিতা, প্রবন্ধ বা যা কিছু মনে আসে তা এখানে লিখুন..."
                        className="min-h-[400px] font-bengali text-base leading-relaxed border-red-200 focus:border-red-400 resize-none"
                      />
                    </div>

                    {/* Writing Tips */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-kalpurush font-semibold text-blue-800 mb-2">লেখার টিপস:</h4>
                      <ul className="font-bengali text-blue-700 text-sm space-y-1">
                        <li>• আপনার অভিজ্ঞতা থেকে লিখুন</li>
                        <li>• সহজ ও সাবলীল ভাষা ব্যবহার করুন</li>
                        <li>• পাঠকদের সাথে সংযোগ স্থাপন করুন</li>
                        <li>• ব্লকচেইন প্রযুক্তি আপনার লেখা সুরক্ষিত রাখবে</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  /* Preview Mode */
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h1 className="text-2xl font-kalpurush font-bold text-gray-900 mb-2">{title || "শিরোনাম"}</h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-bengali">আপনার নাম</span>
                        <span>•</span>
                        <span className="font-bengali">এখনই</span>
                        {category && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="font-bengali text-xs">
                              {category}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      <p className="font-bengali text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {content || "আপনার লেখার বিষয়বস্তু এখানে দেখা যাবে..."}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card className="bg-white/90 backdrop-blur-sm border-red-100">
              <CardHeader>
                <CardTitle className="font-kalpurush text-red-800 text-lg">পোস্ট সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Selection */}
                <div className="space-y-2">
                  <Label className="font-bengali text-gray-700">বিভাগ</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-red-200">
                      <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="font-bengali">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="font-bengali text-gray-700">
                    ট্যাগ
                  </Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="ট্যাগ যোগ করুন (কমা দিয়ে আলাদা করুন)"
                    className="border-red-200 focus:border-red-400"
                  />
                  <p className="text-xs text-gray-500 font-bengali">উদাহরণ: বর্ষা, প্রেম, স্মৃতি</p>
                </div>

                <Separator />

                {/* Privacy Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-bengali text-gray-700">সর্বজনীন পোস্ট</Label>
                      <p className="text-xs text-gray-500 font-bengali">সবাই দেখতে পাবে</p>
                    </div>
                    <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-bengali text-gray-700">মন্তব্য সক্রিয়</Label>
                      <p className="text-xs text-gray-500 font-bengali">পাঠকরা মন্তব্য করতে পারবে</p>
                    </div>
                    <Switch checked={enableComments} onCheckedChange={setEnableComments} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Protection Info */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="font-kalpurush text-green-800 text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  ব্লকচেইন সুরক্ষা
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Hash className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bengali text-sm text-green-800 font-medium">ডিজিটাল স্বাক্ষর</p>
                    <p className="font-bengali text-xs text-green-600">আপনার লেখার অনন্য পরিচয়</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bengali text-sm text-green-800 font-medium">টাইমস্ট্যাম্প</p>
                    <p className="font-bengali text-xs text-green-600">প্রকাশের সময় স্থায়ীভাবে সংরক্ষিত</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bengali text-sm text-green-800 font-medium">চুরি প্রতিরোধ</p>
                    <p className="font-bengali text-xs text-green-600">কপিরাইট সুরক্ষা নিশ্চিত</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Writing Statistics */}
            <Card className="bg-white/90 backdrop-blur-sm border-red-100">
              <CardHeader>
                <CardTitle className="font-kalpurush text-red-800 text-lg">লেখার পরিসংখ্যান</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bengali text-gray-600">শব্দ সংখ্যা:</span>
                  <span className="font-bengali font-medium">
                    {content.split(/\s+/).filter((word) => word.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bengali text-gray-600">অক্ষর সংখ্যা:</span>
                  <span className="font-bengali font-medium">{content.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bengali text-gray-600">পড়ার সময়:</span>
                  <span className="font-bengali font-medium">
                    {Math.max(1, Math.ceil(content.split(/\s+/).filter((word) => word.length > 0).length / 200))} মিনিট
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
