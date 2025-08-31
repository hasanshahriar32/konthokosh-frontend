"use client";

import { Button } from "@/components/ui/button";
import { editorStrings } from "@/constants/editor";
import { POST_STRINGS } from "@/constants/post";
import type { PostResponse } from "@/types/post";
import { useState, type FC } from "react";

type PostSuccessBlockProps = {
  createdPost: PostResponse;
  isProcessing: boolean;
};

const PostSuccessBlock: FC<PostSuccessBlockProps> = ({
  createdPost,
  isProcessing,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyId = async () => {
    if (createdPost.id == null) return;
    try {
      await navigator.clipboard.writeText(String(createdPost.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Failed to copy post ID:", err);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-sm" />
      <div className="relative p-6 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-200/30 dark:border-green-800/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Post Created Successfully
                </span>
                <div className="text-xs text-muted-foreground mt-1">
                  Your content has been published
                </div>
              </div>
            </div>

            <div className="space-y-3 pl-13">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide min-w-[60px]">
                  {editorStrings.idLabel}
                </span>
                <span className="text-sm font-mono bg-background/50 px-3 py-1 rounded-lg text-foreground border border-border/30">
                  {createdPost.id}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide min-w-[60px]">
                  {editorStrings.approvedLabel}
                </span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full border ${
                  createdPost.isApproved
                    ? 'bg-green-100/50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200/50'
                    : 'bg-amber-100/50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50'
                }`}>
                  {createdPost.isApproved ? editorStrings.yes : editorStrings.no}
                </span>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopyId}
            disabled={isProcessing}
            className="rounded-full hover:bg-muted/50 transition-colors duration-200 shrink-0"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? POST_STRINGS.copied : POST_STRINGS.copyId}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostSuccessBlock;
