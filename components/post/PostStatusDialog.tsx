"use client";

import { Icons } from "@/components/common/Icons";
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
  PostResponse,
  OnChainSubmitResponse,
  BlockchainProcessResponse,
  PostErrorResponse,
  CoverImage,
} from "@/types/post";
import Link from "next/link";
import { Dispatch, SetStateAction, useState, useMemo, type FC } from "react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Spinner from "../ui/spinner";

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
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyId = async () => {
    if ((createdPost as PostResponse)?.id == null) return;
    try {
      await navigator.clipboard.writeText(
        String((createdPost as PostResponse).id)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Failed to copy post ID:", err);
    }
  };

  const isError =
    status === "error" ||
    (createdPost && "similarityPercentage" in createdPost);
  const isProcessing = status === "submitting" || status === "onchain";

  const postError =
    createdPost && "similarityPercentage" in createdPost
      ? (createdPost as PostErrorResponse)
      : null;

  const filteredMatches = useMemo(() => {
    if (!postError) return [] as any[];
    const others = postError.allMatches?.filter((m) =>
      postError.matchedPost ? m.id !== postError.matchedPost?.id : true
    );
    return others ?? [];
  }, [postError]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-lg p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm shadow-2xl border border-gray-100/60 dark:border-slate-700/40"
      >
        <div className="w-full">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">
                {editorStrings.statusTitle}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {editorStrings.statusDescription}
              </DialogDescription>
            </div>

            {/* Top-level spinner when submitting or processing on-chain */}
            {isProcessing ? (
              <div
                className="ml-4 flex items-center"
                role="status"
                aria-live="polite"
              >
                <Spinner
                  size="md"
                  className="text-slate-600 dark:text-slate-300"
                  ariaLabel={POST_STRINGS.popover.loading}
                />
              </div>
            ) : null}
          </div>

          {/* Success block (when we have a created post with id) */}
          {createdPost && "id" in createdPost && (
            <div className="mt-4">
              <div className="rounded-md border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/10 p-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-slate-800 dark:text-slate-100">
                    <div>
                      <span className="font-medium">
                        {editorStrings.idLabel}{" "}
                      </span>
                      <span className="ml-1">{createdPost.id}</span>
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">
                        {editorStrings.approvedLabel}{" "}
                      </span>
                      <span className="ml-1">
                        {createdPost.isApproved
                          ? editorStrings.yes
                          : editorStrings.no}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCopyId}
                      disabled={isProcessing}
                    >
                      {copied ? POST_STRINGS.copied : POST_STRINGS.copyId}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* On-chain / status block */}
          <div className="mt-4">
            <div className="rounded-md border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/10 p-3">
              <div className="text-sm text-slate-700 dark:text-slate-300">
                <div className="font-medium">
                  {status === "submitting"
                    ? POST_STRINGS.statuses.submittingLabel
                    : status === "onchain"
                    ? POST_STRINGS.statuses.onchainLabel
                    : status === "completed"
                    ? POST_STRINGS.statuses.completedLabel
                    : status === "error"
                    ? POST_STRINGS.statuses.errorLabel
                    : POST_STRINGS.statuses.notSubmittedLabel}
                </div>
                <div className="mt-1">
                  {status === "submitting" ? (
                    <div
                      className="flex items-center gap-2"
                      role="status"
                      aria-live="polite"
                    >
                      <Spinner
                        size="sm"
                        className="text-slate-700 dark:text-slate-300"
                        ariaLabel={POST_STRINGS.steps.creation.loadingMessage}
                      />
                      <span>
                        {POST_STRINGS.steps.creation.loadingMessage}{" "}
                        {statusMessage ?? ""}
                      </span>
                    </div>
                  ) : status === "onchain" ? (
                    <div
                      className="flex items-center gap-2"
                      role="status"
                      aria-live="polite"
                    >
                      <Spinner
                        size="sm"
                        className="text-slate-700 dark:text-slate-300"
                        ariaLabel={
                          POST_STRINGS.steps.submitToChain.loadingMessage
                        }
                      />
                      <span>
                        {POST_STRINGS.steps.submitToChain.loadingMessage}{" "}
                        {statusMessage ?? "..."}
                      </span>
                    </div>
                  ) : status === "error" ? (
                    <span className="text-rose-600">
                      {statusMessage ?? POST_STRINGS.statuses.errorLabel}
                    </span>
                  ) : status === "completed" ? (
                    <span>
                      {statusMessage ?? POST_STRINGS.statuses.completedLabel}
                    </span>
                  ) : (
                    <span>{POST_STRINGS.statuses.notSubmittedLabel}</span>
                  )}
                </div>

                {onChainSubmit && (
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <div>
                      <span className="font-medium">Txn:</span>{" "}
                      <span className="ml-1 block max-w-full break-all text-xs">
                        {onChainSubmit.transactionHash}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">OnChain ID:</span>{" "}
                      <span className="ml-1 block max-w-full break-all text-xs">
                        {onChainSubmit.onChainId}
                      </span>
                    </div>
                  </div>
                )}

                {onChainProcess && (
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <div>
                      <span className="font-medium">IPFS:</span>{" "}
                      <span className="ml-1 block max-w-full break-all text-xs">
                        {onChainProcess.ipfsHash}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Similarity:</span>{" "}
                      <span className="ml-1">
                        {onChainProcess.similarityScore}
                      </span>
                    </div>
                  </div>
                )}

                {/* Generated covers preview & selection */}
                {generatedCovers && generatedCovers.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs text-muted-foreground mb-2">
                      {POST_STRINGS.generatedCoversLabel}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {generatedCovers.map((c) => {
                        const selected = selectedCoverKeys?.includes(c.key);
                        return (
                          <div
                            key={c.key}
                            className={`relative rounded-md overflow-hidden border p-1 bg-white/70 dark:bg-slate-900/60 ${
                              selected ? "ring-2 ring-indigo-500" : ""
                            }`}
                          >
                            <img
                              src={c.publicUrl}
                              alt={c.key}
                              className="w-full h-28 object-cover rounded"
                            />
                            <label className="absolute top-2 left-2 bg-white/80 dark:bg-slate-800/70 rounded-full p-1">
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => onToggleCoverKey?.(c.key)}
                              />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 flex items-center justify-end gap-2">
                      <Button
                        size="xs"
                        disabled={
                          !selectedCoverKeys || selectedCoverKeys.length === 0
                        }
                        onClick={() => onApplyCovers?.()}
                      >
                        {POST_STRINGS.applySelectedCovers}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* When there's an error or similarity-based rejection, show full error card identical to ErrorMessageDialog */}
          {(status === "error" || postError) && (
            <div className="mt-4">
              <Card className="border-0 shadow-none">
                <CardHeader className="px-4 pt-4 pb-0">
                  <CardTitle className="text-sm">
                    {editorStrings.similarityAnalysis}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1">
                    {editorStrings.similarityResultsDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent className="w-full px-4 py-3 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-muted-foreground">
                        {editorStrings.similarityLabel}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
                          {postError?.similarityPercentage}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-muted-foreground">
                        {editorStrings.thresholdLabel}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">
                          {postError?.thresholdPercentage}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-xs text-muted-foreground">
                        {editorStrings.totalMatchesLabel}
                      </div>
                      <div className="text-sm font-medium">
                        {postError?.totalMatches}
                      </div>
                    </div>
                  </div>

                  {postError?.matchedPost && (
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-700">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">
                            {editorStrings.mostSimilarPostLabel}
                          </div>
                          <div className="mt-1 text-sm text-slate-800 dark:text-slate-100 leading-relaxed truncate">
                            {postError.matchedPost.contentPreview}
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {new Date(
                              postError.matchedPost.createdAt
                            ).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Badge variant="destructive">
                            {editorStrings.topMatchLabel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {filteredMatches.length > 0 && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {editorStrings.otherMatchesLabel}
                      </div>
                      <div className="grid gap-2 max-h-44 overflow-y-auto">
                        {filteredMatches.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between gap-3 p-3 bg-white/60 dark:bg-slate-900/60 rounded-lg border border-slate-100 dark:border-slate-700"
                          >
                            <div className="flex-1 text-sm text-slate-700 dark:text-slate-300 truncate">
                              {m.contentPreview}
                            </div>
                            <div className="ml-3 flex-shrink-0">
                              <Badge variant="secondary">
                                {m.similarityPercentage}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-5 flex items-center justify-end gap-3">
            {isProcessing ? (
              <Button
                size="xs"
                className="rounded-full px-4 opacity-50"
                disabled
              >
                {editorStrings.goNow}
              </Button>
            ) : (
              <Button size="xs" className="rounded-full px-4" asChild>
                <Link href={paths["my-post"]}>{editorStrings.goNow}</Link>
              </Button>
            )}
            <Button
              size="xs"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full px-4"
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
