import { COMMENT, LIKE, SHARE } from "@/constants/feed";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "../ui/button";

const Actions = () => {
  return (
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
  );
};

export default Actions;
