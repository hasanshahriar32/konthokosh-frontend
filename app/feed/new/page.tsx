"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import ErrorMessage from "@/components/post/ErrorMessageDialog";
import { PostForm } from "@/components/post/PostForm";
import PostStatusDialog from "@/components/post/PostStatusDialog";
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
  // unified status: idle | submitting | onchain | completed | error
  const [status, setStatus] = useState<
    "idle" | "submitting" | "onchain" | "completed" | "error"
  >("idle");
  const [createdPost, setCreatedPost] = useState<
    PostResponse | PostErrorResponse | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] =
    useState<boolean>(false);

  const { createPost, submitToBlockchain, processIpfs } = useKonthoKoshApi();

  const [onChainSubmitResp, setOnChainSubmitResp] =
    useState<OnChainSubmitResponse | null>(null);
  const [onChainProcessResp, setOnChainProcessResp] =
    useState<BlockchainProcessResponse | null>(null);
  const [onChainStatusMessage, setOnChainStatusMessage] = useState<string>("");

  /**
   * Handle form submission (Direct KonthoKosh API)
   */
  const handleSubmit = useCallback(
    async (data: CreatePostRequest) => {
      // open dialog immediately and move to submitting status
      setIsSuccessDialogOpen(true);
      setStatus("submitting");
      setErrorMessage("");
      setCreatedPost(null);

      try {
        const newPost = await createPost(data);

        setCreatedPost(newPost);

        // Success when we receive an object with `id`
        if (newPost && "id" in newPost) {
          // start on-chain flow
          setStatus("onchain");
          setOnChainStatusMessage("Submitting to blockchain...");
          try {
            const submitResp = await submitToBlockchain(newPost.id);
            setOnChainSubmitResp(submitResp);
            setOnChainStatusMessage(
              "Processing IPFS and verifying on-chain..."
            );

            try {
              const processResp = await processIpfs(newPost.id);
              setOnChainProcessResp(processResp);
              setOnChainStatusMessage("On-chain processing completed.");
              setStatus("completed");
            } catch (procErr) {
              const friendly = handleKonthoKoshError(procErr);
              setOnChainStatusMessage(friendly);
              setStatus("error");
            }
          } catch (submitErr) {
            const friendly = handleKonthoKoshError(submitErr);
            setOnChainStatusMessage(friendly);
            setStatus("error");
          }
        } else {
          setErrorMessage(handleKonthoKoshError({ status: 409 }));
          setStatus("error");
        }
      } catch (error) {
        const friendly = handleKonthoKoshError(error);
        setErrorMessage(friendly);
        setStatus("error");
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

  // Reset all submission related states when dialog is closed
  const handleSuccessDialogOpenChange = useCallback(
    (value: React.SetStateAction<boolean>) => {
      setIsSuccessDialogOpen((prev) => {
        const newOpen =
          typeof value === "function"
            ? (value as (p: boolean) => boolean)(prev)
            : value;
        if (!newOpen) {
          setStatus("idle");
          setCreatedPost(null);
          setErrorMessage("");
          setOnChainSubmitResp(null);
          setOnChainProcessResp(null);
          setOnChainStatusMessage("");
        }
        return newOpen;
      });
    },
    []
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
                isSubmitting={status === "submitting" || status === "onchain"}
              />
            </div>

            <PostStatusDialog
              isOpen={isSuccessDialogOpen}
              onOpenChange={handleSuccessDialogOpenChange}
              createdPost={createdPost as PostResponse}
              onChainSubmit={onChainSubmitResp}
              onChainProcess={onChainProcessResp}
              status={status}
              statusMessage={onChainStatusMessage || errorMessage}
            />
          </div>
        </main>
      </Background>
    </ProtectedRoute>
  );
}
