"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type PostFormData } from "@/types/post";
import { Save, Send } from "lucide-react";
import { useState } from "react";

interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>;
  onSaveDraft: (data: PostFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const PostForm = ({ onSubmit, onSaveDraft, isSubmitting = false }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>নতুন পোস্ট লিখুন</CardTitle>
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
              className="min-h-[400px] font-bengali text-base leading-relaxed resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Writing Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold">
                  {content.split(/\s+/).filter((word) => word.length > 0).length}
                </div>
                <div className="text-gray-600 font-bengali">শব্দ</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{content.length}</div>
                <div className="text-gray-600 font-bengali">অক্ষর</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">
                  {Math.max(1, Math.ceil(content.split(/\s+/).filter((word) => word.length > 0).length / 200))}
                </div>
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
