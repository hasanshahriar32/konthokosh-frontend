"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { editorStrings } from "@/constants/editor";
import type { PostErrorResponse } from "@/types/api";
import { Dispatch, SetStateAction, useMemo, type FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type ErrorMessageProps = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  message: string;
  postError?: PostErrorResponse | null;
};

const ErrorMessage: FC<ErrorMessageProps> = ({
  isOpen,
  onOpenChange,
  message,
  postError,
}) => {
  const filteredMatches = useMemo(() => {
    if (!postError) return [];
    const others = postError.allMatches?.filter((m) =>
      postError.matchedPost ? m.id !== postError.matchedPost?.id : true
    );
    return others ?? [];
  }, [postError]);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6 shadow-lg border border-transparent dark:border-slate-800 backdrop-blur">
        <div className="flex-1 min-w-0">
          <div>
            <DialogTitle className="text-lg font-semibold leading-tight text-slate-900 dark:text-slate-100">
              {editorStrings.postCreateFailedTitle}
            </DialogTitle>
            <DialogDescription>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {message}
              </p>

              {postError && (
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
                            {postError.similarityPercentage}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">
                          {editorStrings.thresholdLabel}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">
                            {postError.thresholdPercentage}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">
                          {editorStrings.totalMatchesLabel}
                        </div>
                        <div className="text-sm font-medium">
                          {postError.totalMatches}
                        </div>
                      </div>
                    </div>

                    {postError.matchedPost && (
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
              )}
            </DialogDescription>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <Button
              size="xs"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {editorStrings.close}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorMessage;
