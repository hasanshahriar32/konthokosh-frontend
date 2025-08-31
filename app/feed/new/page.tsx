"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Background from "@/components/common/Background";
import { PostForm } from "@/components/post/PostForm";
import PostStatusDialog from "@/components/post/PostStatusDialog";
import { editorStrings } from "@/constants/editor";
import { POST_STRINGS } from "@/constants/post";
import {
  PostErrorResponse,
  type BlockchainProcessResponse,
  type CreatePostRequest,
  type CoverImage,
  type OnChainSubmitResponse,
  type PostResponse,
} from "@/types/post";
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

  const { createPost, submitToBlockchain, processIpfs, getPostCovers, updatePost } =
    useKonthoKoshApi();

  const [onChainSubmitResp, setOnChainSubmitResp] =
    useState<OnChainSubmitResponse | null>(null);
  const [onChainProcessResp, setOnChainProcessResp] =
    useState<BlockchainProcessResponse | null>(null);
  const [generatedCovers, setGeneratedCovers] =
    useState<CoverImage[] | null>(null);
  const [selectedCoverKeys, setSelectedCoverKeys] = useState<string[]>([]);
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
          setOnChainStatusMessage(POST_STRINGS.steps.submitToChain.loadingMessage);
          try {
            const submitResp = await submitToBlockchain(newPost.id);
            setOnChainSubmitResp(submitResp);
            setOnChainStatusMessage(POST_STRINGS.steps.chainProcessing.loadingMessage);

            try {
              const processResp = await processIpfs(newPost.id);
              setOnChainProcessResp(processResp);
              setOnChainStatusMessage(POST_STRINGS.steps.chainProcessing.successMessage);

              // fetch generated covers
              try {
                const covers = await getPostCovers(newPost.id);
                setGeneratedCovers(covers.images ?? []);
                setSelectedCoverKeys([]);
                setOnChainStatusMessage(POST_STRINGS.generatedCoversLabel + " - " + POST_STRINGS.steps.imageGeneration.successMessage);
                setStatus("completed");
              } catch (coverErr) {
                // if fetching covers fails, continue but inform user
                const friendly = handleKonthoKoshError(coverErr);
                setOnChainStatusMessage(friendly || POST_STRINGS.steps.imageGeneration.errorMessage);
                setStatus("completed");
              }
            } catch (procErr) {
              const friendly = handleKonthoKoshError(procErr);
              setOnChainStatusMessage(friendly || POST_STRINGS.steps.chainProcessing.errorMessage);
              setStatus("error");
            }
          } catch (submitErr) {
            const friendly = handleKonthoKoshError(submitErr);
            setOnChainStatusMessage(friendly || POST_STRINGS.steps.submitToChain.errorMessage);
            setStatus("error");
          }
        } else {
          setErrorMessage(handleKonthoKoshError({ status: 409 }));
          setStatus("error");
        }
      } catch (error) {
  const friendly = handleKonthoKoshError(error);
  setErrorMessage(friendly || POST_STRINGS.steps.creation.errorMessage);
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
          setGeneratedCovers(null);
          setSelectedCoverKeys([]);
        }
        return newOpen;
      });
    },
    []
  );

  const handleToggleCoverKey = useCallback((key: string) => {
    setSelectedCoverKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }, []);

  const handleApplyCovers = useCallback(async () => {
    if (!createdPost || !("id" in createdPost)) return;
    if (!selectedCoverKeys || selectedCoverKeys.length === 0) return;

      try {
      await updatePost(createdPost.id, {
        images: (generatedCovers ?? []).filter((c) =>
          selectedCoverKeys.includes(c.key)
        ),
      });
      setOnChainStatusMessage("Covers applied successfully.");
    } catch (err) {
      const friendly = handleKonthoKoshError(err);
      setOnChainStatusMessage(friendly);
    }
  }, [createdPost, selectedCoverKeys, generatedCovers, updatePost]);

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
              generatedCovers={generatedCovers}
              selectedCoverKeys={selectedCoverKeys}
              onToggleCoverKey={handleToggleCoverKey}
              onApplyCovers={handleApplyCovers}
            />
          </div>
        </main>
      </Background>
    </ProtectedRoute>
  );
}
