"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Icons } from "@/components/common/Icons";
import { PostForm } from "@/components/post/PostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type PostFormData } from "@/types/post";
import {
  useKonthoKoshApi,
  handleKonthoKoshError,
} from "@/utils/konthokosh-api";
import type { KonthoKoshPost } from "@/types/konthokosh-api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Background from "@/components/common/Background";

export default function WritePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPost, setCreatedPost] = useState<KonthoKoshPost | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 🌐 KonthoKosh API integration with automatic JWT token
  const { createPost } = useKonthoKoshApi();

  /**
   * Handle form submission (Direct KonthoKosh API)
   */
  const handleSubmit = useCallback(
    async (data: PostFormData) => {
      setIsSubmitting(true);
      setErrorMessage("");
      setCreatedPost(null);

      try {
        console.log("🚀 Creating post on KonthoKosh API...");

        // Combine title and content for the API
        const postContent = `${data.title}\n\n${data.content}`;

        // 🌐 Create post using KonthoKosh API with automatic JWT token
        const newPost = await createPost(postContent);

        console.log("✅ Post created successfully:", newPost);
        setCreatedPost(newPost);
      } catch (error) {
        console.error("❌ Error creating post:", error);
        const friendly = handleKonthoKoshError(error);
        setErrorMessage(friendly);
      } finally {
        setIsSubmitting(false);
      }
    },
    [createPost]
  );

  /**
   * Handle saving as draft (using KonthoKosh API)
   */
  const handleSaveDraft = useCallback(
    async (data: PostFormData) => {
      try {
        console.log("💾 Saving draft to KonthoKosh API...");

        // Combine title and content for the API, mark as draft
        const draftContent = `[DRAFT] ${data.title}\n\n${data.content}`;

        // 🌐 Save draft using KonthoKosh API with automatic JWT token
        const savedDraft = await createPost(draftContent);

        console.log("✅ Draft saved successfully:", savedDraft);
        alert("Draft saved successfully to KonthoKosh!");
      } catch (error) {
        console.error("❌ Error saving draft:", error);
        const errorMessage = handleKonthoKoshError(error);
        alert(`Failed to save draft: ${errorMessage}`);
      }
    },
    [createPost]
  );

  // Reset helpers
  const handleReset = useCallback(() => {
    setCreatedPost(null);
    setErrorMessage("");
  }, []);

  return (
    <ProtectedRoute>
      <Background>
        <Navbar />

        <main className="container mx-auto px-4 py-8 max-w-4xl mt-28">
          <div className="space-y-8">
            {/* Post Form */}
            <div>
              <PostForm
                onSubmit={handleSubmit}
                onSaveDraft={handleSaveDraft}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                      <Icons.X className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-200">
                        পোস্ট তৈরি করতে ব্যর্থ
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        {errorMessage}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={handleReset}
                      >
                        আবার চেষ্টা করুন
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Created Post Result */}
            {createdPost && (
              <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                      <Icons.Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-green-800 dark:text-green-200">
                        পোস্ট সফলভাবে তৈরি হয়েছে
                      </h3>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        <div>
                          <span className="font-medium">ID:</span>{" "}
                          {createdPost.id}
                        </div>
                        <div>
                          <span className="font-medium">User ID:</span>{" "}
                          {createdPost.userId}
                        </div>
                        <div>
                          <span className="font-medium">অনুমোদিত:</span>{" "}
                          {createdPost.isApproved ? "হ্যাঁ" : "না"}
                        </div>
                        <div>
                          <span className="font-medium">তৈরি:</span>{" "}
                          {new Date(createdPost.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-2 p-3 rounded bg-white/70 dark:bg-black/20 border text-sm">
                        <div className="markdown-content prose prose-sm max-w-none">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-lg font-bold font-kalpurush mb-2">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-base font-semibold font-kalpurush mb-2">
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-sm font-medium font-kalpurush mb-1">
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="mb-2 font-bengali leading-relaxed">
                                  {children}
                                </p>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-red-300 pl-3 ml-2 italic text-gray-600 mb-2">
                                  {children}
                                </blockquote>
                              ),
                              code: ({ children }) => (
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-2">
                                  {children}
                                </pre>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside mb-2 space-y-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal list-inside mb-2 space-y-1">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-sm font-bengali">
                                  {children}
                                </li>
                              ),
                            }}
                          >
                            {createdPost.post}
                          </ReactMarkdown>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => router.push("/dashboard")}
                        >
                          ড্যাশবোর্ডে যান
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleReset}
                        >
                          আরেকটি তৈরি করুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </Background>
    </ProtectedRoute>
  );
}
