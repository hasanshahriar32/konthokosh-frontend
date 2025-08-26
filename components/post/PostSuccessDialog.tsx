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
import type { PostResponse } from "@/types/api";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  createdPost: PostResponse | null;
};

const PostSuccessDialog = ({ isOpen, onOpenChange, createdPost }: Props) => {
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
