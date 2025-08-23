"use client";

import { PostFormActions } from "@/components/post/PostFormActions";
import { PostFormEditor } from "@/components/post/PostFormEditor";
import { PostFormHeader } from "@/components/post/PostFormHeader";
import { POST_STRINGS } from "@/constants/post";
import { type PostFormData } from "@/types/post";
import type React from "react";
import { useCallback, useState } from "react";

type PostFormProps = {
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  onSaveDraft?: (data: PostFormData) => Promise<void>;
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
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData.title || "",
    content: initialData.content || "",
    tags: initialData.tags || [],
    visibility: initialData.visibility || "public",
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = POST_STRINGS.titleRequired;
    }

    if (!formData.content.trim()) {
      newErrors.content = POST_STRINGS.contentRequired;
    }

    if (formData.title.length > 200) {
      newErrors.title = POST_STRINGS.titleTooLong;
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

  const handleAddTag = useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim().toLowerCase();
      if (trimmedTag && !formData.tags.includes(trimmedTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmedTag],
        }));
      }
      setTagInput("");
    },
    [formData.tags]
  );

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
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

  const handleContentChange = useCallback(
    (markdown: string) => {
      setFormData((prev) => ({
        ...prev,
        content: markdown,
      }));

      // Clear content error when user starts typing
      if (errors.content && markdown.trim()) {
        setErrors((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { content, ...rest } = prev;
          return rest;
        });
      }
    },
    [errors.content]
  );
  return (
    <div className="space-y-6">
      <PostFormHeader
        title={formData.title}
        onTitleChange={(v) => setFormData((prev) => ({ ...prev, title: v }))}
        errors={errors}
        tags={formData.tags}
        tagInput={tagInput}
        setTagInput={setTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onTagInputKeyDown={handleTagInputKeyDown}
        onTagBlur={() => tagInput && handleAddTag(tagInput)}
        isDraft={isDraft}
      />

      <PostFormEditor
        content={formData.content}
        onChange={handleContentChange}
        errors={errors}
      />

      <PostFormActions
        onSubmit={handleSubmit}
        onSaveDraft={onSaveDraft ? handleSaveDraft : undefined}
        isSubmitting={isSubmitting}
        isDraft={isDraft}
        title={formData.title}
        content={formData.content}
      />
    </div>
  );
};

export { PostForm };
