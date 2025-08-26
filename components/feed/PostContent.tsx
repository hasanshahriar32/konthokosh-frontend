import Image from "next/image";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import type { KonthoKoshFeedPost } from "@/types/api";
import type { PostTag } from "@/types/post";
import { SHOW_LESS, SHOW_MORE } from "@/constants/feed";

type Props = {
  post: KonthoKoshFeedPost & { tags?: (string | PostTag)[] | string };
};

const PostContent: React.FC<Props> = ({ post }) => {
  const { title, post: body, imagesId } = post;

  const normalizedBody =
    typeof body === "string" ? body.replace(/\\r\\n|\\r|\\n/g, "\n") : body;

  // Show only first N lines initially, allow expand/shrink
  const [expanded, setExpanded] = useState(false);
  const LINES_PREVIEW = 5;

  const { lines, needsToggle, preview } = useMemo(() => {
    const txt = typeof normalizedBody === "string" ? normalizedBody : "";
    const l = txt.split("\n");
    const needs = l.length > LINES_PREVIEW;
    const p = needs ? l.slice(0, LINES_PREVIEW).join("\n") : txt;
    return { lines: l, needsToggle: needs, preview: p };
  }, [normalizedBody]);
  return (
    <div className="text-foreground">
      <h3 className="heading-quaternary mb-3">{title}</h3>
      <div className="text-x16 mb-3">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {expanded || !needsToggle ? normalizedBody : preview}
        </ReactMarkdown>

        {needsToggle && (
          <div className="mt-2">
            <Button
              type="button"
              size="xs"
              variant={"ghost"}
              onClick={() => setExpanded((s) => !s)}
              className="text-primary"
            >
              {expanded ? SHOW_LESS : SHOW_MORE}
            </Button>
          </div>
        )}
      </div>

      {imagesId && imagesId.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {imagesId.map((image) => (
            <Image
              key={image}
              src={image}
              alt={`Image ${image}`}
              width={500}
              height={300}
              className="rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContent;
