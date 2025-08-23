"use client";

import { Icons } from "@/components/common/Icons";
import { MDXEditor } from "@/components/post/MDXEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { POST_STRINGS } from "@/constants/post";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import React from "react";

type Props = {
  content: string;
  onChange: (markdown: string) => void;
  errors: Record<string, string>;
};

const PostFormEditor = ({ content, onChange, errors }: Props) => {
  const editorRef = React.useRef<MDXEditorMethods | null>(null);

  return (
    <Card className="bg-card/90 backdrop-blur-md rounded-2xl shadow-lg border-none">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
            <Icons.FileText className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <div className="text-lg font-semibold">{POST_STRINGS.contentEditorTitle}</div>
            <div className="text-sm text-muted-foreground">{POST_STRINGS.postContentLabel}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Label htmlFor="content" className="sr-only">
            {POST_STRINGS.postContentLabel}
          </Label>
          <div className={errors.content ? "ring-2 ring-destructive/20 rounded-lg p-2" : "rounded-lg p-2 bg-card/80"}>
            <MDXEditor ref={editorRef} markdown={content} onChange={onChange} placeholder={POST_STRINGS.contentPlaceholder} />
          </div>
          {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{POST_STRINGS.contentSupport}</span>
            <span>{content.length} {POST_STRINGS.characters}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { PostFormEditor };
