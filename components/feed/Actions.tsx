import { COMMENT, LIKE, SHARE } from "@/constants/feed";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useMemo } from "react";
import { Textarea } from "../ui/textarea";
import CommentsDialog from "./CommentsDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Comment } from "@/types/comment";
import { useKonthoKoshApi } from "@/utils/konthokosh-api";
import { PageLoader } from "@/components/common/PageLoader";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

type Props = {
  postId?: number | string;
  initialCommentsCount?: number;
};

const Actions = ({ postId, initialCommentsCount = 0 }: Props) => {
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="font-bengali rounded-full px-4 py-2 text-muted-foreground hover:bg-primary/10"
        >
          <Heart className="h-5 w-5 mr-2" />
          <span>{LIKE}</span>
        </Button>

        <CommentsDialog
          postId={postId}
          initialCommentsCount={commentsCount}
          onCommentsCountChange={(c) => setCommentsCount(c)}
          trigger={(
            <Button
              variant="ghost"
              size="sm"
              className="font-bengali rounded-full px-4 py-2 text-muted-foreground hover:bg-primary/10 flex items-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span>{COMMENT}</span>
              <span className="ml-2 text-[10px] text-muted-foreground">{commentsCount}</span>
            </Button>
          )}
        />

        <Button
          variant="ghost"
          size="sm"
          className="font-bengali rounded-full px-4 py-2 text-muted-foreground hover:bg-primary/10"
        >
          <Share2 className="h-5 w-5 mr-2" />
          <span>{SHARE}</span>
        </Button>
      </div>


    </div>
  );
};

export default Actions;
