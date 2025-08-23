"use client";

import { Icons } from "@/components/common/Icons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { POST_STRINGS } from "@/constants/post";
import type React from "react";

type Props = {
  title: string;
  onTitleChange: (v: string) => void;
  errors: Record<string, string>;
  tags: string[];
  tagInput: string;
  setTagInput: (v: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onTagInputKeyDown: (e: React.KeyboardEvent) => void;
  onTagBlur: () => void;
  isDraft?: boolean;
};

const PostFormHeader = ({
  title,
  onTitleChange,
  errors,
  tags,
  tagInput,
  setTagInput,
  onAddTag,
  onRemoveTag,
  onTagInputKeyDown,
  onTagBlur,
  isDraft = false,
}: Props) => {
  return (
    <Card className="bg-card/70 dark:bg-primary/5 backdrop-blur-md rounded-2xl shadow-lg border-none">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Icons.Edit className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-lg font-semibold">
              {isDraft ? POST_STRINGS.editDraft : POST_STRINGS.createNewPost}
            </div>
            <div className="text-sm text-muted-foreground">
              {POST_STRINGS.titleLabel}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            {POST_STRINGS.titleLabel}
          </Label>
          <Input
            id="title"
            placeholder={POST_STRINGS.titlePlaceholder}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className={
              errors.title
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {title.length}/200 {POST_STRINGS.characters}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags" className="text-sm font-medium">
            {POST_STRINGS.tagsLabel}
          </Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80"
                onClick={() => onRemoveTag(tag)}
              >
                <Icons.Tag className="h-3 w-3" />
                {tag}
                <Icons.Close className="h-3 w-3 ml-1 hover:text-destructive" />
              </Badge>
            ))}
          </div>
          <Input
            id="tags"
            placeholder={POST_STRINGS.tagsPlaceholder}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagInputKeyDown}
            onBlur={onTagBlur}
          />
          <p className="text-xs text-muted-foreground">
            {POST_STRINGS.tagsHelp}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { PostFormHeader };
