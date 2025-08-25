"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import { Icons } from "@/components/common/Icons";
import { PostForm } from "@/components/post/PostForm";
import { PostSuccessDialog } from "@/components/post/PostSuccessDialog";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { editorStrings } from "@/constants/editor";
import type { CreatePostRequest, KonthoKoshPost } from "@/types/api";
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
    async (data: CreatePostRequest) => {
      setIsSubmitting(true);
      setErrorMessage("");
      setCreatedPost(null);

      try {
        console.log(editorStrings.creatingPostLog);

        // 🌐 Create post using KonthoKosh API with automatic JWT token
        const newPost = await createPost(data);

        console.log(editorStrings.postCreatedLogPrefix, newPost);
        setCreatedPost(newPost);
        // show success dialog and schedule redirect to /feed
        setShowSuccessDialog(true);
      } catch (error) {
        console.error(editorStrings.errorCreatingLog, error);
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
      // router.push("/feed");
    }, 2000);

    return () => clearTimeout(t);
  }, [createdPost, showSuccessDialog, router]);

  /**
   * Handle saving as draft (using KonthoKosh API)
   */
  const handleSaveDraft = useCallback(
    async (data: CreatePostRequest) => {
      try {
        console.log(editorStrings.savingDraftLog);

        // 🌐 Save draft using KonthoKosh API with automatic JWT token
        const savedDraft = await createPost(data);

        console.log(editorStrings.draftSavedLogPrefix, savedDraft);
        alert(editorStrings.draftSavedAlert);
      } catch (error) {
        console.error(editorStrings.errorSavingDraftLog, error);
        const errorMessage = handleKonthoKoshError(error);
        alert(`${editorStrings.errorSaveDraftAlertPrefix}${errorMessage}`);
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

            {/* Error Message (reusable) */}
            <ErrorMessage
              open={Boolean(errorMessage)}
              title={editorStrings.postCreateFailedTitle}
              message={errorMessage}
              onClose={() => setErrorMessage("")}
              tryAgainLabel={editorStrings.tryAgain}
            />

            {/* Success dialog shown when a post is created; auto-redirects to /feed */}
            <PostSuccessDialog
              open={showSuccessDialog}
              onOpenChange={setShowSuccessDialog}
              createdPost={createdPost}
              onReset={handleReset}
            />
          </div>
        </main>
      </Background>
    </ProtectedRoute>
  );
}
