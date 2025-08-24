"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import { Icons } from "@/components/common/Icons";
import { PostForm } from "@/components/post/PostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { KonthoKoshPost } from "@/types/konthokosh-api";
import { type PostFormData } from "@/types/post";
import {
  handleKonthoKoshError,
  useKonthoKoshApi,
} from "@/utils/konthokosh-api";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function WritePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPost, setCreatedPost] = useState<KonthoKoshPost | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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
        // show success dialog and schedule redirect to /feed
        setShowSuccessDialog(true);
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

  // When a post is created and dialog is shown, redirect to /feed after a short delay.
  useEffect(() => {
    if (!createdPost || !showSuccessDialog) return;

    const t = setTimeout(() => {
      // close dialog and navigate
      setShowSuccessDialog(false);
      router.push("/feed");
    }, 2000);

    return () => clearTimeout(t);
  }, [createdPost, showSuccessDialog, router]);

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

            {/* Success dialog shown when a post is created; auto-redirects to /feed */}
            <Dialog
              open={showSuccessDialog}
              onOpenChange={setShowSuccessDialog}
            >
              <DialogContent>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                    <Icons.Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <DialogTitle>পোস্ট সফলভাবে তৈরি হয়েছে</DialogTitle>
                    <DialogDescription>
                      আপনার পোস্ট সফলভাবে তৈরি হয়েছে। ২ সেকেন্ড পরে আপনি ফিড
                      পেজে সরানো হবে।
                    </DialogDescription>

                    {createdPost && (
                      <div className="text-sm text-green-700 dark:text-green-300 mt-2">
                        <div>
                          <span className="font-medium">ID:</span>{" "}
                          {createdPost.id}
                        </div>
                        <div>
                          <span className="font-medium">অনুমোদিত:</span>{" "}
                          {createdPost.isApproved ? "হ্যাঁ" : "না"}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" onClick={() => router.push("/feed")}>
                        এখন যান
                      </Button>
                      <DialogClose>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleReset}
                        >
                          বন্ধ করুন
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </Background>
    </ProtectedRoute>
  );
}
