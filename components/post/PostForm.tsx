"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type PostFormData } from "@/types/post";
import { Save, Send, Eye, Edit } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>;
  onSaveDraft: (data: PostFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const PostForm = ({ onSubmit, onSaveDraft, isSubmitting = false }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please provide both title and content");
      return;
    }

    const formData: PostFormData = {
      title: title.trim(),
      content: content.trim(),
      tags: [],
      visibility: "public",
    };

    await onSubmit(formData);
  };

  const handleSaveDraft = async () => {
    if (!title.trim() && !content.trim()) {
      alert("Please write something before saving as draft");
      return;
    }

    const formData: PostFormData = {
      title: title.trim() || "Untitled Draft",
      content: content.trim() || "",
      tags: [],
      visibility: "private",
    };

    await onSaveDraft(formData);
  };

  // Calculate word count from markdown content (excluding markdown syntax)
  const getWordCount = (markdownText: string) => {
    // Remove markdown syntax for word count
    const plainText = markdownText
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/>\s+/g, '') // Remove blockquotes
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    return plainText.split(/\s+/).filter((word) => word.length > 0).length;
  };

  const wordCount = getWordCount(content);
  const charCount = content.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>নতুন পোস্ট লিখুন (মার্কডাউন)</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            disabled={isSubmitting}
          >
            {isPreviewMode ? (
              <>
                <Edit className="h-4 w-4 mr-2" />
                সম্পাদনা
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                প্রিভিউ
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="text-lg font-kalpurush"
              disabled={isSubmitting}
            />
          </div>

          {/* Markdown Editor */}
          <div className="space-y-2">
            <Label className="font-bengali text-gray-700">
              বিষয়বস্তু (মার্কডাউন ফরম্যাট)
            </Label>
            <div className="border rounded-lg overflow-hidden">
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || "")}
                preview={isPreviewMode ? "preview" : "edit"}
                hideToolbar={false}
                data-color-mode="light"
                height={400}
                style={{
                  backgroundColor: "transparent",
                }}
                textareaProps={{
                  placeholder: "আপনার গল্প, কবিতা, প্রবন্ধ মার্কডাউন ফরম্যাটে লিখুন...\n\n# শিরোনাম\n## উপশিরোনাম\n**গুরুত্বপূর্ণ** *তির্যক* `কোড`\n- তালিকা\n> উদ্ধৃতি",
                  style: {
                    fontSize: "16px",
                    lineHeight: "1.6",
                    fontFamily: "var(--font-bengali, inherit)",
                  },
                  disabled: isSubmitting,
                }}
              />
            </div>
            
            {/* Markdown Tips */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm">
              <h4 className="font-semibold text-blue-800 mb-2">মার্কডাউন টিপস:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-700">
                <div>• <code># শিরোনাম</code> - বড় শিরোনাম</div>
                <div>• <code>## উপশিরোনাম</code> - ছোট শিরোনাম</div>
                <div>• <code>**বোল্ড**</code> - মোটা অক্ষর</div>
                <div>• <code>*ইটালিক*</code> - তির্যক অক্ষর</div>
                <div>• <code>- তালিকা</code> - বুলেট পয়েন্ট</div>
                <div>• <code>{'>'} উদ্ধৃতি</code> - কোট ব্লক</div>
              </div>
            </div>
          </div>

          {/* Writing Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">{wordCount}</div>
                <div className="text-gray-600 font-bengali">শব্দ</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{charCount}</div>
                <div className="text-gray-600 font-bengali">অক্ষর</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{readingTime}</div>
                <div className="text-gray-600 font-bengali">মিনিট</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="font-bengali"
            >
              <Save className="h-4 w-4 mr-2" />
              ড্রাফট সেভ
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="font-bengali"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "প্রকাশ হচ্ছে..." : "প্রকাশ করুন"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
