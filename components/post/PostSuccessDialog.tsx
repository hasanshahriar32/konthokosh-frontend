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
} from "@/types/api";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  createdPost: PostResponse | null;
  onChainSubmit?: OnChainSubmitResponse | null;
  onChainProcess?: BlockchainProcessResponse | null;
  onChainStatusMessage?: string;
  isOnChainProcessing?: boolean;
  isSubmitting?: boolean;
};

const PostSuccessDialog = ({
  isOpen,
  onOpenChange,
  createdPost,
  onChainSubmit,
  onChainProcess,
  onChainStatusMessage,
  isOnChainProcessing,
  isSubmitting,
}: Props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyId = async () => {
    if (createdPost?.id == null) return;
    try {
      await navigator.clipboard.writeText(String(createdPost.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Failed to copy post ID:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-lg p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm shadow-2xl border border-gray-100/60 dark:border-slate-700/40"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-green-400 to-green-600 shadow-md">
            <Icons.Check className="h-7 w-7 text-white" />
          </div>

          <div className="w-full">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-lg font-semibold">
                  {editorStrings.successTitle}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {editorStrings.successDescription}
                </DialogDescription>
              </div>

              {/* Top-level submit spinner when dialog opened and submission still in progress */}
              {isSubmitting ? (
                <div className="ml-4 flex items-center" role="status" aria-live="polite">
                  <svg
                    className="h-5 w-5 animate-spin text-slate-600 dark:text-slate-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
              ) : null}
            </div>

            {createdPost && (
              <div className="mt-4">
                <div className="rounded-md border border-green-100 dark:border-green-800/60 bg-green-50 dark:bg-green-900/10 p-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm text-green-800 dark:text-green-200">
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
                      <Button size="sm" variant="ghost" onClick={handleCopyId}>
                        {copied ? "Copied" : "Copy ID"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* On-chain status block */}
            <div className="mt-4">
              <div className="rounded-md border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/10 p-3">
                <div className="text-sm text-slate-700 dark:text-slate-300">
                  <div className="font-medium">On-chain status</div>
                  <div className="mt-1">
                    {isOnChainProcessing ? (
                      <div className="flex items-center gap-2" role="status" aria-live="polite">
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
                        <span>Processing on-chain: {onChainStatusMessage ?? "..."}</span>
                      </div>
                    ) : onChainStatusMessage ? (
                      <span>{onChainStatusMessage}</span>
                    ) : (
                      <span>Not submitted to blockchain.</span>
                    )}
                  </div>

                  {onChainSubmit && (
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      <div>
                        <span className="font-medium">Txn:</span>{" "}
                        <span className="ml-1 block max-w-full break-all text-xs">{onChainSubmit.transactionHash}</span>
                      </div>
                      <div>
                        <span className="font-medium">OnChain ID:</span>{" "}
                        <span className="ml-1 block max-w-full break-all text-xs">{onChainSubmit.onChainId}</span>
                      </div>
                    </div>
                  )}

                  {onChainProcess && (
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      <div>
                        <span className="font-medium">IPFS:</span>{" "}
                        <span className="ml-1 block max-w-full break-all text-xs">{onChainProcess.ipfsHash}</span>
                      </div>
                      <div>
                        <span className="font-medium">Similarity:</span>{" "}
                        <span className="ml-1">{onChainProcess.similarityScore}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <Button size="xs" className="rounded-full px-4" asChild>
                <Link href={paths["my-post"]}>{editorStrings.goNow}</Link>
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                }}
                className="rounded-full px-4"
              >
                {editorStrings.close}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostSuccessDialog;
