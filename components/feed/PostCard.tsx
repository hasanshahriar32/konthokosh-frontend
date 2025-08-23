"use client";

import { Icons } from "@/components/common/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  APPROVED,
  COMMENT,
  ID_LABEL,
  LIKE,
  PENDING,
  POSTS_COUNT_SUFFIX,
  SHARE,
  USER_FALLBACK,
} from "@/constants/feed";
import type { KonthoKoshFeedPost } from "@/types/konthokosh-api";
import { Heart, MessageCircle, Share2 } from "lucide-react";

type Props = {
  post: KonthoKoshFeedPost;
  totalCount?: number;
};

const PostCard = ({ post, totalCount = 0 }: Props) => {
  return (
    <article className="relative">
      <Card className="overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-primary/5 backdrop-blur-2xl border-none py-0">
        <CardContent className="px-8 py-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-12 w-12 bg-secondary overflow-hidden shadow-md">
                {post.userImageUrl ? (
                  <AvatarImage
                    src={post.userImageUrl}
                    alt={post.userFirstName || USER_FALLBACK}
                  />
                ) : (
                  <AvatarFallback className="flex items-center justify-center">
                    <Icons.User className="h-7 w-7 text-secondary-foreground" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-lg md:text-xl font-kalpurush font-bold text-foreground">
                    {post.userFirstName || USER_FALLBACK}{" "}
                    {post.userLastName || ""}
                  </h3>
                  <p className="text-xs mt-1 font-bengali text-muted-foreground">
                    {new Date(post.createdAt).toLocaleString("bn-BD")}
                  </p>
                </div>
                <div className="text-xs font-bengali text-muted-foreground text-right">
                  <div>
                    {ID_LABEL} {post.id}
                  </div>
                  <div className="mt-1">
                    {post.isApproved ? APPROVED : PENDING}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="font-bengali text-base leading-relaxed whitespace-pre-wrap break-words text-foreground">
            {post.post}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="font-bengali rounded-full px-4 py-2 text-muted-foreground hover:bg-primary/10"
              >
                <Heart className="h-5 w-5 mr-2" />
                <span>{LIKE}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="font-bengali rounded-full px-4 py-2 text-muted-foreground hover:bg-primary/10"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>{COMMENT}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="font-bengali rounded-full px-4 py-2 text-muted-foreground hover:bg-primary/10"
              >
                <Share2 className="h-5 w-5 mr-2" />
                <span>{SHARE}</span>
              </Button>
            </div>
            <div className="text-xs text-muted-foreground font-bengali">
              {totalCount ? `${totalCount}${POSTS_COUNT_SUFFIX}` : ""}
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default PostCard;
