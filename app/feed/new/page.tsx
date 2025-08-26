"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import ErrorMessage from "@/components/post/ErrorMessageDialog";
import { PostForm } from "@/components/post/PostForm";
import PostSuccessDialog from "@/components/post/PostSuccessDialog";
import { editorStrings } from "@/constants/editor";
import {
  PostErrorResponse,
  type CreatePostRequest,
  type PostResponse,
  type OnChainSubmitResponse,
  type BlockchainProcessResponse,
} from "@/types/api";
import {
  handleKonthoKoshError,
  useKonthoKoshApi,
} from "@/utils/konthokosh-api";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function WritePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPost, setCreatedPost] = useState<
    PostResponse | PostErrorResponse | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState<boolean>(false);

  const { createPost, submitToBlockchain, processIpfs } = useKonthoKoshApi();

  const [onChainSubmitResp, setOnChainSubmitResp] =
    useState<OnChainSubmitResponse | null>(null);
  const [onChainProcessResp, setOnChainProcessResp] =
    useState<BlockchainProcessResponse | null>(null);
  const [onChainStatusMessage, setOnChainStatusMessage] = useState<string>("");
  const [isOnChainProcessing, setIsOnChainProcessing] =
    useState<boolean>(false);

  /**
   * Handle form submission (Direct KonthoKosh API)
   */
  const handleSubmit = useCallback(
    async (data: CreatePostRequest) => {
      setIsSubmitting(true);
      setErrorMessage("");
      setCreatedPost(null);

      try {
        const newPost = await createPost(data);

        setCreatedPost(newPost);

        // Success when we receive an object with `id`
        if (newPost && "id" in newPost) {
          setIsSuccessDialogOpen(true);

          // Start on-chain flow: submit then process serially.
          setIsOnChainProcessing(true);
          setOnChainStatusMessage("Submitting to blockchain...");
          try {
            const submitResp = await submitToBlockchain(newPost.id);
            setOnChainSubmitResp(submitResp);
            setOnChainStatusMessage(
              "Processing IPFS and verifying on-chain..."
            );

            try {
              // Use the blockchain entry id returned by submit response
              const processResp = await processIpfs(newPost.id);
              setOnChainProcessResp(processResp);
              setOnChainStatusMessage("On-chain processing completed.");
            } catch (procErr) {
              const friendly = handleKonthoKoshError(procErr);
              setOnChainStatusMessage(friendly);
            }
          } catch (submitErr) {
            const friendly = handleKonthoKoshError(submitErr);
            setOnChainStatusMessage(friendly);
          } finally {
            setIsOnChainProcessing(false);
          }
        } else {
          setIsErrorDialogOpen(true);
          setErrorMessage(
            handleKonthoKoshError({
              status: 409,
            })
          );
        }
      } catch (error) {
        const friendly = handleKonthoKoshError(error);
        setErrorMessage(friendly);
      } finally {
        setIsSubmitting(false);
      }
    },
    [createPost, submitToBlockchain, processIpfs]
  );

  /**
   * Handle saving as draft (using KonthoKosh API)
   */
  const handleSaveDraft = useCallback(
    async (data: CreatePostRequest) => {
      try {
        const savedDraft = await createPost(data);

        alert(editorStrings.draftSavedAlert);
      } catch (error) {
        const errorMessage = handleKonthoKoshError(error);
        alert(`${editorStrings.errorSaveDraftAlertPrefix}${errorMessage}`);
      }
    },
    [createPost]
  );

  return (
    <ProtectedRoute>
      <Background>
        <Navbar />

        <main className="container mx-auto px-4 py-8 max-w-4xl mt-28">
          <div className="space-y-8">
            <div>
              <PostForm
                onSubmit={handleSubmit}
                onSaveDraft={handleSaveDraft}
                isSubmitting={isSubmitting}
              />
            </div>

            <PostSuccessDialog
              isOpen={isSuccessDialogOpen}
              onOpenChange={setIsSuccessDialogOpen}
              createdPost={createdPost as PostResponse}
              onChainSubmit={onChainSubmitResp}
              onChainProcess={onChainProcessResp}
              onChainStatusMessage={onChainStatusMessage}
              isOnChainProcessing={isOnChainProcessing}
              isSubmitting={isSubmitting}
            />

            <ErrorMessage
              isOpen={isErrorDialogOpen}
              onOpenChange={setIsErrorDialogOpen}
              message={errorMessage}
              postError={createdPost as PostErrorResponse | null}
            />
          </div>
        </main>
      </Background>
    </ProtectedRoute>
  );
}
