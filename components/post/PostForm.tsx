"use client";

import { PostFormActions } from "@/components/post/PostFormActions";
import { PostFormEditor } from "@/components/post/PostFormEditor";
import { PostFormHeader } from "@/components/post/PostFormHeader";
import { POST_STRINGS } from "@/constants/post";
import { CreatePostRequest } from "@/types";
import { PostTag } from "@/types/post";
import type React from "react";
import { useCallback, useState } from "react";

type PostFormProps = {
  initialData?: Partial<CreatePostRequest>;
  onSubmit: (data: CreatePostRequest) => Promise<void>;
  onSaveDraft?: (data: CreatePostRequest) => Promise<void>;
  isSubmitting?: boolean;
  isDraft?: boolean;
};

const PostForm = ({
  initialData = {},
  onSubmit,
  onSaveDraft,
  isSubmitting = false,
  isDraft = false,
}: PostFormProps) => {
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: initialData.title || "",
    post: initialData.post || "",
    tags: initialData.tags || [],
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData?.post || !formData.post.trim()) {
      newErrors.post = POST_STRINGS.postRequired;
    }

    if (!formData?.tags || formData.tags.length === 0) {
      formData.tags = [];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting post:", error);
      // Handle error (show toast, etc.)
    }
  }, [formData, onSubmit, validateForm]);

  const handleSaveDraft = useCallback(async () => {
    if (!onSaveDraft) return;

    try {
      await onSaveDraft(formData);
    } catch (error) {
      console.error("Error saving draft:", error);
      // Handle error (show toast, etc.)
    }
  }, [formData, onSaveDraft]);

  const handleAddTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) {
      setTagInput("");
      return;
    }

    // Validate against PostTag enum values
    const match = (Object.values(PostTag) as string[]).find((t) => t === trimmed);
    if (!match) {
      // invalid tag - ignore or could set an error/toast
      setTagInput("");
      return;
    }

    setFormData((prev) => {
      const prevTags = (prev.tags ?? []) as PostTag[];
      if (prevTags.includes(match as PostTag)) return prev;
      return {
        ...prev,
        tags: [...prevTags, match as PostTag],
      };
    });

    setTagInput("");
  }, []);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) ?? [],
    }));
  }, []);

  const handleTagInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        handleAddTag(tagInput);
      }
    },
    [tagInput, handleAddTag]
  );

  const handlePostChange = useCallback(
    (markdown: string) => {
      setFormData((prev) => ({
        ...prev,
        post: markdown,
      }));

      // Clear post error when user starts typing
      if (errors.post && markdown.trim()) {
        setErrors((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { post, ...rest } = prev;
          return rest;
        });
      }
    },
    [errors.post]
  );

  return (
    <div className="space-y-6">
      <PostFormHeader
        title={formData?.title || ""}
        onTitleChange={(v) => setFormData((prev) => ({ ...prev, title: v }))}
        errors={errors}
        tags={formData?.tags || []}
        tagInput={tagInput}
        setTagInput={setTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onTagInputKeyDown={handleTagInputKeyDown}
        onTagBlur={() => tagInput && handleAddTag(tagInput)}
        isDraft={isDraft}
      />

      <PostFormEditor
        post={formData.post}
        onChange={handlePostChange}
        errors={errors}
      />

      <PostFormActions
        onSubmit={handleSubmit}
        onSaveDraft={onSaveDraft ? handleSaveDraft : undefined}
        isSubmitting={isSubmitting}
        isDraft={isDraft}
        title={formData?.title || ""}
        post={formData.post}
      />
    </div>
  );
};

export { PostForm };
