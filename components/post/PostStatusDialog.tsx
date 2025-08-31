"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { paths } from "@/constants";
import { editorStrings } from "@/constants/editor";
import { POST_STRINGS } from "@/constants/post";
import type {
  BlockchainProcessResponse,
  CoverImage,
  OnChainSubmitResponse,
  PostErrorResponse,
  PostResponse,
} from "@/types/post";
import Link from "next/link";
import { Dispatch, SetStateAction, type FC } from "react";
import Spinner from "../ui/spinner";
import PostErrorBlock from "./PostErrorBlock";
import PostStatusBlock from "./PostStatusBlock";
import PostSuccessBlock from "./PostSuccessBlock";

type SubmitStatus = "idle" | "submitting" | "onchain" | "completed" | "error";

export type UnifiedDialogProps = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  createdPost: PostResponse | PostErrorResponse | null;
  onChainSubmit?: OnChainSubmitResponse | null;
  onChainProcess?: BlockchainProcessResponse | null;
  statusMessage?: string;
  status: SubmitStatus;
  generatedCovers?: CoverImage[] | null;
  selectedCoverKeys?: string[];
  onToggleCoverKey?: (key: string) => void;
  onApplyCovers?: () => Promise<void> | void;
};

const PostStatusDialog: FC<UnifiedDialogProps> = ({
  isOpen,
  onOpenChange,
  createdPost,
  onChainSubmit,
  onChainProcess,
  statusMessage,
  status,
  generatedCovers = null,
  selectedCoverKeys = [],
  onToggleCoverKey,
  onApplyCovers,
}) => {
  const isProcessing = status === "submitting" || status === "onchain";

  const postError =
    createdPost && "similarityPercentage" in createdPost
      ? (createdPost as PostErrorResponse)
      : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-2xl max-h-[70vh] p-0 rounded-3xl bg-card/95 dark:bg-card/90 backdrop-blur-xl shadow-2xl border border-border/50 overflow-hidden flex flex-col"
      >
        {/* Header - Fixed */}
        <div className="relative p-6 pb-4 border-b border-border/30">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {editorStrings.statusTitle}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed">
                {editorStrings.statusDescription}
              </DialogDescription>
            </div>

            {/* Status indicator */}
            {isProcessing && (
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Spinner
                  size="sm"
                  className="text-primary"
                  ariaLabel={POST_STRINGS.popover.loading}
                />
                <span className="text-sm font-medium text-primary">
                  Processing...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="relative flex-1 min-h-0 overflow-y-auto">
          {/* Gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          <div className="relative p-6 space-y-6">
            {/* Success block */}
            {createdPost && "id" in createdPost && (
              <PostSuccessBlock
                createdPost={createdPost as PostResponse}
                isProcessing={isProcessing}
              />
            )}

            {/* Status block */}
            <PostStatusBlock
              status={status}
              statusMessage={statusMessage}
              onChainSubmit={onChainSubmit}
              onChainProcess={onChainProcess}
              generatedCovers={generatedCovers}
              selectedCoverKeys={selectedCoverKeys}
              onToggleCoverKey={onToggleCoverKey}
              onApplyCovers={onApplyCovers}
            />

            {/* Error block */}
            {(status === "error" || postError) && postError && (
              <PostErrorBlock postError={postError} />
            )}
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="relative p-6 pt-4 border-t border-border/30 bg-card/95 dark:bg-card/90 backdrop-blur-xl">
          <div className="flex items-center justify-end gap-3">
            {isProcessing ? (
              <Button
                size="sm"
                className="rounded-full px-6 opacity-50 cursor-not-allowed"
                disabled
              >
                {editorStrings.goNow}
              </Button>
            ) : (
              <Button
                size="sm"
                className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href={paths["my-post"]}>{editorStrings.goNow}</Link>
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full px-6 border-border/50 hover:bg-muted/50 transition-all duration-200"
              disabled={isProcessing}
            >
              {editorStrings.close}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostStatusDialog;
