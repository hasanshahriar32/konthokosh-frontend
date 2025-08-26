"use client";

import { Icons } from "@/components/common/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ACTIVE_LABEL,
  APPROVED,
  ID_LABEL,
  INACTIVE_LABEL,
  PENDING,
  USER_FALLBACK,
} from "@/constants/feed";
import type { KonthoKoshFeedPost } from "@/types/api";
import Actions from "./Actions";
import PostCardMenu from "./PostCardMenu";
import PostContent from "./PostContent";

type Props = {
  post: KonthoKoshFeedPost;
  showMenu?: boolean;
  showActions?: boolean;
};

const PostCard = ({ post, showMenu = false, showActions = false }: Props) => {
  // normalize tags from different payload shapes (array, comma string, generatedTags)
  const rawTags = (post as any).tags ?? (post as any).generatedTags ?? [];
  const normalizedTags: string[] = (() => {
    if (!rawTags) return [];
    if (typeof rawTags === "string") {
      return rawTags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    }
    if (Array.isArray(rawTags)) return rawTags.map((t) => String(t));
    return [];
  })();

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
                        {post.isActive ? ACTIVE_LABEL : INACTIVE_LABEL}
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

          <div className="flex items-center justify-between gap-4">
            {normalizedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {normalizedTags.map((t) => (
                  <Badge
                    key={t}
                    asChild={false}
                    className="text-[10px] rounded-full px-1.5 py-0.5 bg-secondary/90"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            )}
            {showActions && <Actions />}
            {showMenu && (
              <PostCardMenu postId={post.id} isPending={!post.isApproved} />
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default PostCard;
