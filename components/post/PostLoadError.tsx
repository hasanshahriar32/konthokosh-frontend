import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RETRY_BUTTON } from "@/constants/feed";
import { POST_STRINGS } from "@/constants/post";
import { useCallback } from "react";

type Props = {
  error: string;
  loadPosts: (page: number, searchTerm: string, isApproved: boolean) => void;
  page: number;
  searchTerm: string;
  isApproved: boolean | null;
};

const PostLoadError = ({
  error,
  loadPosts,
  page,
  searchTerm,
  isApproved = false,
}: Props) => {
  const handleRetry = useCallback(() => {
    void loadPosts(page, searchTerm, isApproved || false);
  }, [loadPosts, page, searchTerm, isApproved]);

  return (
    <Card
      className="relative overflow-hidden mb-6 rounded-lg border border-border bg-card"
      aria-live="polite"
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-2"
        style={{
          background:
            "linear-gradient(180deg,var(--color-destructive),color-mix(in oklch,var(--color-destructive) 60%,transparent))",
        }}
      />

      <CardContent className="p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="flex-shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-md">
              <Icons.X className="h-6 w-6" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="heading-tertiary text-left font-kalpurush">
              {POST_STRINGS.noPostsAvailable}
            </h3>
            <p className="mt-1 text-x16 text-muted-foreground break-words font-bengali">
              {error || POST_STRINGS.loadErrorFallback}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                onClick={handleRetry}
                className="rounded-full font-bengali"
              >
                {RETRY_BUTTON}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="font-bengali text-muted-foreground"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {POST_STRINGS.goToTop}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostLoadError;
