"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  avatarAltUser,
  avatarFallbackChar,
  guestLabel,
  replyLabel,
} from "@/constants/comment";
import type { Comment } from "@/types/comment";
import { useKonthoKoshApi } from "@/utils/konthokosh-api";
import React, { useCallback, useState } from "react";

type Props = {
  comment: Comment;
  onReplyClick?: () => void;
  children?: React.ReactNode;
  showRepliesButton?: boolean;
};

const CommentCard = ({
  comment,
  onReplyClick,
  children,
  showRepliesButton = true,
}: Props) => {
  const { getReplies } = useKonthoKoshApi();
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Comment[] | null>(null);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const handleToggleReplies = useCallback(async () => {
    if (showReplies) {
      setShowReplies(false);
      return;
    }

    if (replies !== null) {
      setShowReplies(true);
      return;
    }

    try {
      // show the replies area immediately so the spinner below it can appear
      setShowReplies(true);
      setLoadingReplies(true);
      const fetched = await getReplies(comment.id);
      console.log("Fetched replies:", fetched);
      setReplies(fetched || []);
      setShowReplies(true);
    } catch (err) {
      setReplies([]);
      setShowReplies(true);
    } finally {
      setLoadingReplies(false);
    }
  }, [showReplies, replies, getReplies, comment.id]);

  return (
    <Card className="rounded-lg border-0 shadow-none p-0 border-input bg-transparent">
      <CardContent>
        <div className="flex gap-4 items-start">
          <Avatar className="size-10 shadow-sm shrink-0">
            {comment.user?.profileImageUrl ? (
              <AvatarImage
                src={comment.user.profileImageUrl}
                alt={comment.user?.username || avatarAltUser}
              />
            ) : (
              <AvatarFallback className="bg-primary/5 text-primary">
                {(comment.user?.username || avatarFallbackChar).charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <div className="py-2 px-4 rounded-lg bg-primary/5">
              <div className="w-full flex items-start justify-between gap-2">
                <div className="w-full flex justify-between items-center gap-4">
                  <div className="font-medium font-kalpurush">
                    {comment.user?.username || guestLabel}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleString("bn-BD")}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground" />
              </div>

              <div className="mt-3 text-sm text-muted-foreground font-bengali">
                {comment.content}
              </div>
            </div>

            {showRepliesButton && (
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <Button
                    size="2xs"
                    variant="ghost-text"
                    onClick={onReplyClick}
                  >
                    {replyLabel}
                  </Button>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  <Button
                    size="2xs"
                    variant="ghost-text"
                    onClick={handleToggleReplies}
                    aria-expanded={showReplies}
                  >
                    <span>{comment.repliesCount}</span>
                    <span>{replyLabel}</span>
                  </Button>
                </div>
              </div>
            )}

            {children}

            {showReplies && (
              <div className="my-3 ml-10 space-y-2">
                {replies && replies.length > 0 ? (
                  replies.map((r) => (
                    <CommentCard
                      key={r.id}
                      comment={r}
                      showRepliesButton={false}
                    />
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground font-bengali">
                    No replies
                  </div>
                )}

                {loadingReplies && (
                  <div className="mt-2 flex justify-center">
                    <Spinner size="md" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
