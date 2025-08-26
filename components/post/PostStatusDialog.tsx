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
import type {
  PostResponse,
  OnChainSubmitResponse,
  BlockchainProcessResponse,
  PostErrorResponse,
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

type SubmitStatus = "idle" | "submitting" | "onchain" | "completed" | "error";

export type UnifiedDialogProps = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  createdPost: PostResponse | PostErrorResponse | null;
  onChainSubmit?: OnChainSubmitResponse | null;
  onChainProcess?: BlockchainProcessResponse | null;
  statusMessage?: string;
  status: SubmitStatus;
};

const PostStatusDialog: FC<UnifiedDialogProps> = ({
  isOpen,
  onOpenChange,
  createdPost,
  onChainSubmit,
  onChainProcess,
  statusMessage,
  status,
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
                <svg
                  className="h-5 w-5 animate-spin text-slate-600 dark:text-slate-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
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
                      {copied ? "Copied" : "Copy ID"}
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
                    ? editorStrings.statusSubmittingLabel
                    : status === "onchain"
                    ? editorStrings.statusOnchainLabel
                    : status === "completed"
                    ? editorStrings.statusCompletedLabel
                    : status === "error"
                    ? editorStrings.statusErrorLabel
                    : editorStrings.statusNotSubmittedLabel}
                </div>
                <div className="mt-1">
                  {status === "submitting" ? (
                    <div
                      className="flex items-center gap-2"
                      role="status"
                      aria-live="polite"
                    >
                      <svg
                        className="h-4 w-4 animate-spin text-slate-700 dark:text-slate-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      <span>Submitting post... {statusMessage ?? ""}</span>
                    </div>
                  ) : status === "onchain" ? (
                    <div
                      className="flex items-center gap-2"
                      role="status"
                      aria-live="polite"
                    >
                      <svg
                        className="h-4 w-4 animate-spin text-slate-700 dark:text-slate-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      <span>Processing on-chain: {statusMessage ?? "..."}</span>
                    </div>
                  ) : status === "error" ? (
                    <span className="text-rose-600">
                      {statusMessage ?? "An error occurred."}
                    </span>
                  ) : status === "completed" ? (
                    <span>{statusMessage ?? "Completed."}</span>
                  ) : (
                    <span>Not submitted to blockchain.</span>
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
              <Button size="xs" className="rounded-full px-4 opacity-50" disabled>
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
