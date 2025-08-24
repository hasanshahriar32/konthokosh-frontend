"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";
import type { FC } from "react";

type Props = {
  error: string;
  onRetry: () => void;
  retryLabel?: string;
};

const ErrorBanner: FC<Props> = ({ error, onRetry, retryLabel }) => {
  if (!error) return null;

  return (
    <div className="rounded-2xl bg-destructive/10 p-5 mb-6 w-full shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive shadow-md">
          <Icons.X className="h-6 w-6 text-destructive-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-base font-bengali text-destructive">{error}</p>
          <div className="mt-2">
            <Button variant="outline" size="sm" className="font-bengali rounded-full" onClick={onRetry}>
              {retryLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
