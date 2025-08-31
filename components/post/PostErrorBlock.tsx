"use client";

import { Badge } from "@/components/ui/badge";
import { editorStrings } from "@/constants/editor";
import type { PostErrorResponse } from "@/types/post";
import { toBanglaDigits, formatBanglaDate } from "@/lib/posts-data";
import { useMemo, type FC } from "react";

type PostErrorBlockProps = {
  postError: PostErrorResponse;
};

const PostErrorBlock: FC<PostErrorBlockProps> = ({ postError }) => {
  const filteredMatches = useMemo(() => {
    if (!postError) return [] as any[];
    const others = postError.allMatches?.filter((m) =>
      postError.matchedPost ? m.id !== postError.matchedPost?.id : true
    );
    return others ?? [];
  }, [postError]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-destructive/10 to-destructive/5 flex items-center justify-center">
          <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {editorStrings.similarityAnalysis}
          </h3>
          <p className="text-sm text-muted-foreground">
            {editorStrings.similarityResultsDescription}
          </p>
        </div>
      </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              {editorStrings.similarityLabel}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-destructive">
                {toBanglaDigits(postError?.similarityPercentage?.toString() || '0')}
              </div>
              <div className="w-2 h-8 bg-destructive/20 rounded-full overflow-hidden">
                <div
                  className="w-full bg-destructive transition-all duration-500"
                  style={{ height: `${Math.min(Number(postError?.similarityPercentage) || 0, 100)}` }}
                />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              {editorStrings.thresholdLabel}
            </div>
            <div className="text-xl font-semibold text-foreground">
              {toBanglaDigits(postError?.thresholdPercentage?.toString() || '0')}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              {editorStrings.totalMatchesLabel}
            </div>
            <div className="text-xl font-semibold text-foreground">
              {toBanglaDigits(postError?.totalMatches?.toString() || '0')}
            </div>
          </div>
        </div>

        {/* Most Similar Post */}
        {postError?.matchedPost && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-destructive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {editorStrings.mostSimilarPostLabel}
            </h4>
            <div className="p-5 rounded-xl bg-gradient-to-r from-destructive/5 to-destructive/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-foreground leading-relaxed mb-3">
                    {postError.matchedPost.contentPreview}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatBanglaDate(new Date(postError.matchedPost.createdAt))}
                  </div>
                </div>
                <Badge variant="destructive" className="bg-destructive text-destructive-foreground rounded-full px-3">
                  {editorStrings.topMatchLabel}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Other Matches */}
        {filteredMatches.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">
              {editorStrings.otherMatchesLabel}
            </h4>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {filteredMatches.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 hover:from-muted/30 hover:to-muted/20 transition-all duration-200"
                >
                  <div className="flex-1 text-sm text-foreground truncate">
                    {m.contentPreview}
                  </div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground rounded-full px-3">
                    {toBanglaDigits(m.similarityPercentage?.toString() || '0')}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default PostErrorBlock;
