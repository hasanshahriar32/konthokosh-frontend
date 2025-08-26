"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useKonthoKoshApi } from "@/utils/konthokosh-api";
import { Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { POST_STRINGS } from "@/constants/post";
import ReactMarkdown from "react-markdown";
import { PageLoader } from "@/components/common/PageLoader";

type Props = {
  postId: string | number;
};

const PostExplainSummaryPopover = ({ postId }: Props) => {
  const { getPostSummary, getPostExplain } = useKonthoKoshApi();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [explain, setExplain] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | undefined>(undefined);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPostSummary(postId);
      setSummary((res as any).summary || JSON.stringify(res));
    } catch (err) {
      setSummary((err as Error).message || POST_STRINGS.popover.error);
    } finally {
      setLoading(false);
    }
  }, [getPostSummary, postId]);

  const fetchExplain = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPostExplain(postId);
      setExplain((res as any).explanation || JSON.stringify(res));
    } catch (err) {
      setExplain((err as Error).message || POST_STRINGS.popover.error);
    } finally {
      setLoading(false);
    }
  }, [getPostExplain, postId]);

  type AccordionInfoItemProps = {
    value: "summary" | "explain";
    title: string;
    content: string | null;
    loading: boolean;
  };

  const AccordionInfoItem = ({
    value,
    title,
    content,
    loading,
  }: AccordionInfoItemProps) => (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-sm font-bengali text-foreground text-left w-full px-3 py-2 rounded-md hover:bg-muted/50 cursor-pointer">
        {title}
      </AccordionTrigger>
      <AccordionContent className="mt-2 text-sm font-bengali text-muted-foreground">
        {openId === value && loading && !content ? (
          <PageLoader compact message={POST_STRINGS.popover.loading as string} />
        ) : content ? (
          <ReactMarkdown>{content}</ReactMarkdown>
        ) : (
          POST_STRINGS.popover.nothing
        )}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label={POST_STRINGS.popover.headerTitle}
          className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900 dark:to-violet-800 rounded-full shadow-sm hover:shadow-md transform-gpu hover:scale-105 transition-all duration-150 focus:outline-none cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-300" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-96 max-w-[90vw] p-0 overflow-hidden rounded-lg shadow-lg border border-muted/30 bg-popover/90 backdrop-blur-md text-popover-foreground">
        <div className="flex flex-col gap-3 p-4 w-full max-h-[60vh]">
          <div className="flex items-start gap-3">
            <div className="flex-none p-2 bg-violet-50 dark:bg-violet-900 rounded-full">
              <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-300" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground font-bengali">
                {POST_STRINGS.popover.headerTitle}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 font-bengali">
                {POST_STRINGS.popover.headerSubtitle}
              </div>
            </div>
          </div>

          <div className="w-full border-t border-muted/30" />

          <div className="overflow-y-auto">
            <Accordion
              type="single"
              collapsible
              value={openId}
              onValueChange={(v) => {
                setOpenId(v ?? undefined);
                if (v === "summary") fetchSummary();
                if (v === "explain") fetchExplain();
              }}
            >
              <AccordionInfoItem
                value="summary"
                title={POST_STRINGS.popover.summaryTitle}
                content={summary}
                loading={loading}
              />

              <AccordionInfoItem
                value="explain"
                title={POST_STRINGS.popover.explainTitle}
                content={explain}
                loading={loading}
              />
            </Accordion>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostExplainSummaryPopover;
