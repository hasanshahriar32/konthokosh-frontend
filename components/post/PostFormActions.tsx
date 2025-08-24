"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import type React from "react";
import { POST_STRINGS } from "@/constants/post";

type Props = {
  onSubmit: () => Promise<void> | void;
  onSaveDraft?: () => Promise<void> | void;
  isSubmitting?: boolean;
  isDraft?: boolean;
  title: string;
  content: string;
};

const PostFormActions = ({ onSubmit, onSaveDraft, isSubmitting = false, isDraft = false, title, content }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end items-center w-full">
      <div className="flex-1" />
      {onSaveDraft && (
        <Button variant="outline" onClick={onSaveDraft} disabled={isSubmitting} className="order-2 sm:order-1 rounded-full px-6 py-2 shadow-sm">
          <Icons.Save className="mr-2 h-4 w-4" />
          {POST_STRINGS.saveDraft}
        </Button>
      )}

      <Button onClick={onSubmit} disabled={isSubmitting || !title.trim() || !content.trim()} className="order-1 sm:order-2 rounded-full px-6 py-2 shadow-md">
        {isSubmitting ? (
          <>
            <div className="animate-heartbeat mr-2">
              <Icons.Shield className="h-4 w-4" />
            </div>
            {isDraft ? POST_STRINGS.publishing : POST_STRINGS.creating}
          </>
        ) : (
          <>
            <Icons.Send className="mr-2 h-4 w-4" />
            {isDraft ? POST_STRINGS.publishPost : POST_STRINGS.createPost}
          </>
        )}
      </Button>
    </div>
  );
};

export { PostFormActions };
