"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React, { useCallback, type FC } from "react";

/**
 * Error message dialog component 🚨
 *
 * @param {boolean} open - whether the dialog is open
 * @param {string} title - title shown in the dialog
 * @param {string} message - the friendly error message to show to the user
 * @param {() => void} onClose - called when the user dismisses the dialog
 * @param {string} tryAgainLabel - label for the dismiss button
 */
export type ErrorMessageProps = {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  tryAgainLabel?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({
  open,
  title = "Error",
  message,
  onClose,
  tryAgainLabel = "Try again",
}) => {
  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md w-full rounded-2xl p-6 bg-white/95 dark:bg-slate-900/95 shadow-lg border border-transparent dark:border-slate-800 backdrop-blur">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/20 shadow-sm">
              <Icons.X className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="text-lg font-semibold leading-tight text-slate-900 dark:text-slate-100">
                  {title}
                </DialogTitle>
                <DialogDescription>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {message}
                  </p>
                </DialogDescription>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Button onClick={handleClose} className="rounded-full">
                {tryAgainLabel}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorMessage;
