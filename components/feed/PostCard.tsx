"use client";

import React from "react";
import { Icons } from "@/components/common/Icons";
import { Badge } from "@/components/ui/badge";
import { POST_UI } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { APPROVED, ID_LABEL, PENDING, USER_FALLBACK } from "@/constants/feed";
import type { KonthoKoshFeedPost } from "@/types/konthokosh-api";
import Actions from "./Actions";
import PostContent from "./PostContent";
import PostCardMenu from "./PostCardMenu";

type Props = {
  post: KonthoKoshFeedPost;
  showMenu?: boolean;
  showActions?: boolean;
};

const PostCard = ({ post, showMenu = false, showActions = false }: Props) => {
  console.log(post);

  // Use the reusable PostCardMenu for item actions (view/edit/delete)

  return (
    <article className="relative">
      <Card className="overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-card/70 dark:bg-primary/5 backdrop-blur-2xl border-none py-0">
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
                <div className="text-xs font-bengali text-muted-foreground text-right flex items-start gap-3">
                  <div>
                    <div>
                      {ID_LABEL} {post.id}
                    </div>
                    <div className="mt-1.5 flex items-end gap-1">
                      <Badge
                        asChild={false}
                        variant={post.isApproved ? "default" : "destructive"}
                        className="text-[10px] rounded-full px-2 py-1"
                      >
                        {post.isApproved ? APPROVED : PENDING}
                      </Badge>

                      <Badge
                        asChild={false}
                        variant={post.isActive ? "secondary" : "outline"}
                        className="text-[10px] rounded-full px-2 py-1"
                      >
                        {post.isActive ? POST_UI.ACTIVE : POST_UI.INACTIVE}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Separator className="my-4" /> */}
          <div className="py-6">
            <PostContent post={post} />
          </div>
          {/* <Separator className="my-4" /> */}

          <div className="flex items-center justify-end gap-4">
            {showActions && <Actions />}
            {showMenu && <PostCardMenu postId={post.id} />}
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default PostCard;
