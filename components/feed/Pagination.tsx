"use client";

import { Button } from "@/components/ui/button";
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

const Pagination: FC<Props> = ({
  page,
  totalPages,
  onPrev,
  onNext,
  disabled,
  pageLabel,
  previousLabel,
  nextLabel,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between bg-card/80 backdrop-blur-md p-4 rounded-full shadow-lg mt-8 w-full">
      <div className="text-base text-muted-foreground font-bengali">
        {pageLabel} {page} / {totalPages}
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={page <= 1 || disabled}
          className="font-bengali rounded-full px-6 py-2"
        >
          {previousLabel}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={page >= totalPages || disabled}
          className="font-bengali rounded-full px-6 py-2"
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
