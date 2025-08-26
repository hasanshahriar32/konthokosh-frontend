"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FC } from "react";
type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
  pageLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
};

// using chevrons from lucide-react for consistent iconography across the app

const Pagination: FC<Props> = ({
  page,
  totalPages,
  onPrev,
  onNext,
  disabled = false,
  pageLabel = "Page",
  previousLabel = "Prev",
  nextLabel = "Next",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="relative w-full mt-8">
      <div className="mx-auto max-w-md bg-card/70 backdrop-blur-sm rounded-full shadow-md px-6 py-3 flex items-center justify-center">
        {/* Prev button placed at left edge */}
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={page <= 1 || disabled}
          aria-label={"Previous page"}
          className="font-bengali rounded-full px-3 py-2 absolute left-3 flex items-center gap-2 hover:scale-[1.02] transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">{previousLabel}</span>
        </Button>

        {/* Centered page indicator */}
        <div className="text-sm text-muted-foreground font-bengali flex items-center gap-2">
          <span className="hidden sm:inline">{pageLabel}</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/20 text-sm font-medium">
            <span className="font-bengali">{page}</span>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{totalPages}</span>
          </span>
        </div>

        {/* Next button placed at right edge */}
        <Button
          variant="default"
          size="sm"
          onClick={onNext}
          disabled={page >= totalPages || disabled}
          aria-label={"Next page"}
          className="font-bengali rounded-full px-3 py-2 absolute right-3 flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
        >
          <span className="sr-only">{nextLabel}</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
