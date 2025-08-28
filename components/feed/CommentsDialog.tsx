"use client";

import { PageLoader } from "@/components/common/PageLoader";
import { Button } from "@/components/ui/button";
import CommentCard from "./CommentCard";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
    avatarAltUser,
    avatarFallbackChar,
    cancelLabel,
    commentPlaceholder,
    commentsLabel,
    commentsTitle,
    guestLabel,
    loadingMoreAriaLabel,
    loadMoreText,
    mainSubmittingText,
    noCommentsFound,
    replyLabel,
    replyPlaceholder,
    replySendingText,
    replySentError,
    replySentSuccess,
    sendText
} from "@/constants/comment";
import type { Comment } from "@/types/comment";
import { useKonthoKoshApi } from "@/utils/konthokosh-api";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Props = {
  postId?: number | string;
  initialCommentsCount?: number;
  trigger: React.ReactElement;
  onCommentsCountChange?: (count: number) => void;
};

const CommentsDialog = ({
  postId,
  initialCommentsCount = 0,
  trigger,
  onCommentsCountChange,
}: Props) => {
  const { createComment, getCommentsForPost } = useKonthoKoshApi();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const onSubmit = async () => {
    if (!postId) return;
    if (!content.trim()) return;
    try {
      setSubmitting(true);
      const payload = { postId: Number(postId), content };
      const created = await createComment(payload);
      setContent("");
      setOpen(false);
      setCommentsCount((c) => c + 1);
      if (typeof onCommentsCountChange === "function")
        onCommentsCountChange(commentsCount + 1);
      toast.success("মন্তব্য যোগ করা হয়েছে");
      setPage(1);
      await loadComments();
      return created;
    } catch (err) {
      console.error(err);
      toast.error("মন্তব্য যোগ করা যায়নি। অনুগ্রহ করে পরে চেষ্টা করুন।");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const loadComments = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await getCommentsForPost(postId, { page, size });
      if (res?.pagination?.totalCount !== undefined) {
        setCommentsCount(res.pagination.totalCount);
        if (typeof onCommentsCountChange === "function")
          onCommentsCountChange(res.pagination.totalCount);
      }
      if (Array.isArray(res?.comments)) {
        if (page === 1) setComments(res.comments);
        else setComments((prev) => [...prev, ...res.comments]);
        if (res.pagination) {
          setHasMore(res.pagination.page < res.pagination.totalPages);
        } else {
          setHasMore(res.comments.length === size);
        }
      }
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    if (open) loadComments();
  }, [open, page]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) loadComments();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="!w-full !max-w-[50vw] bg-background/85 backdrop-blur-lg">
        <DialogHeader className="flex items-start justify-between gap-4">
          <div>
            <DialogTitle className="text-lg font-semibold">
              {commentsTitle}
            </DialogTitle>
            <div className="text-sm text-muted-foreground mt-1 font-bengali">
              {commentsCount} {commentsLabel}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-3 max-h-[50vh] overflow-y-auto space-y-3 pr-2">
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <PageLoader compact />
            </div>
          ) : comments.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground font-bengali">
                {noCommentsFound}
              </div>
            </div>
          ) : (
            comments.map((c) => (
              <CommentCard
                key={c.id}
                comment={c}
                onReplyClick={() => {
                  setReplyingTo(c.id);
                  setReplyContent("");
                }}
              >
                {replyingTo === c.id && (
                  <div className="mt-3">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={replyPlaceholder}
                      className="min-h-[56px] rounded-md"
                    />
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent("");
                        }}
                      >
                        {cancelLabel}
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="rounded-full"
                        onClick={async () => {
                          if (!replyContent.trim() || !postId) return;
                          try {
                            setSubmitting(true);
                            await createComment({
                              postId: Number(postId),
                              content: replyContent,
                              parentId: c.id,
                            });
                            setReplyingTo(null);
                            setReplyContent("");
                            toast.success(replySentSuccess);
                            setPage(1);
                            await loadComments();
                          } catch (err) {
                            console.error(err);
                            toast.error(replySentError);
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                        disabled={submitting || !replyContent.trim()}
                      >
                        {submitting ? replySendingText : sendText}
                      </Button>
                    </div>
                  </div>
                )}
              </CommentCard>
            ))
          )}

          {hasMore && (
            <div className="flex justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  setLoadingMore(true);
                  try {
                    setPage((p) => p + 1);
                    await loadComments();
                  } finally {
                    setLoadingMore(false);
                  }
                }}
              >
                {loadingMore ? (
                  <Spinner
                    size="sm"
                    className="border-muted-foreground"
                    ariaLabel={loadingMoreAriaLabel}
                  />
                ) : (
                  loadMoreText
                )}
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t border-input">
          <div className="w-full">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={commentPlaceholder}
              className="mb-2 min-h-[64px] rounded-lg"
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                {cancelLabel}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onSubmit}
                disabled={submitting || !content.trim()}
              >
                {submitting ? mainSubmittingText : sendText}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
