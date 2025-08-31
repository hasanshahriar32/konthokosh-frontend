"use client";

import { Button } from "@/components/ui/button";
import { POST_STRINGS } from "@/constants/post";
import type {
  BlockchainProcessResponse,
  CoverImage,
  OnChainSubmitResponse,
} from "@/types/post";
import { type FC } from "react";
import Spinner from "../ui/spinner";

type SubmitStatus = "idle" | "submitting" | "onchain" | "completed" | "error";

type PostStatusBlockProps = {
  status: SubmitStatus;
  statusMessage?: string;
  onChainSubmit?: OnChainSubmitResponse | null;
  onChainProcess?: BlockchainProcessResponse | null;
  generatedCovers?: CoverImage[] | null;
  selectedCoverKeys?: string[];
  onToggleCoverKey?: (key: string) => void;
  onApplyCovers?: () => Promise<void> | void;
};

const PostStatusBlock: FC<PostStatusBlockProps> = ({
  status,
  statusMessage,
  onChainSubmit,
  onChainProcess,
  generatedCovers = null,
  selectedCoverKeys = [],
  onToggleCoverKey,
  onApplyCovers,
}) => {
  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${
          status === "completed" ? "bg-green-500" :
          status === "error" ? "bg-destructive" :
          status === "submitting" || status === "onchain" ? "bg-primary animate-pulse" :
          "bg-muted-foreground"
        }`} />
        <span className="text-lg font-semibold text-foreground">
          {status === "submitting"
            ? POST_STRINGS.statuses.submittingLabel
              : status === "onchain"
              ? POST_STRINGS.statuses.onchainLabel
              : status === "completed"
              ? POST_STRINGS.statuses.completedLabel
              : status === "error"
              ? POST_STRINGS.statuses.errorLabel
              : POST_STRINGS.statuses.notSubmittedLabel}
          </span>
        </div>

        {/* Status Message */}
        <div className="mb-6">
          {status === "submitting" ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5">
              <Spinner
                size="sm"
                className="text-primary"
                ariaLabel={POST_STRINGS.steps.creation.loadingMessage}
              />
              <span className="text-foreground">
                {POST_STRINGS.steps.creation.loadingMessage} {statusMessage ?? ""}
              </span>
            </div>
          ) : status === "onchain" ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5">
              <Spinner
                size="sm"
                className="text-primary"
                ariaLabel={POST_STRINGS.steps.submitToChain.loadingMessage}
              />
              <span className="text-foreground">
                {POST_STRINGS.steps.submitToChain.loadingMessage} {statusMessage ?? "..."}
              </span>
            </div>
          ) : status === "error" ? (
            <div className="p-4 rounded-xl bg-gradient-to-r from-destructive/10 to-destructive/5">
              <span className="text-destructive font-medium">
                {statusMessage ?? POST_STRINGS.statuses.errorLabel}
              </span>
            </div>
          ) : status === "completed" ? (
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5">
              <span className="text-green-700 dark:text-green-300 font-medium">
                {statusMessage ?? POST_STRINGS.statuses.completedLabel}
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10">
              <span className="text-muted-foreground">
                {POST_STRINGS.statuses.notSubmittedLabel}
              </span>
            </div>
          )}
        </div>

        {/* Blockchain Details */}
        {(onChainSubmit || onChainProcess) && (
          <div className="space-y-4">
            {onChainSubmit && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10">
                <h4 className="text-sm font-medium text-foreground mb-3">Transaction Details</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Txn Hash:</span>
                    <code className="bg-background/80 px-3 py-2 rounded-lg text-foreground font-mono break-all">
                      {onChainSubmit.transactionHash}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">OnChain ID:</span>
                    <code className="bg-background/80 px-3 py-2 rounded-lg text-foreground font-mono break-all">
                      {onChainSubmit.onChainId}
                    </code>
                  </div>
                </div>
              </div>
            )}

            {onChainProcess && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-muted/20 to-muted/10">
                <h4 className="text-sm font-medium text-foreground mb-3">IPFS Details</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">IPFS Hash:</span>
                    <code className="bg-background/80 px-3 py-2 rounded-lg text-foreground font-mono break-all">
                      {onChainProcess.ipfsHash}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-muted-foreground">Similarity:</span>
                    <span className="bg-background/80 px-3 py-2 rounded-lg text-foreground font-medium">
                      {onChainProcess.similarityScore}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generated Covers */}
        {generatedCovers && generatedCovers.length > 0 && (
          <div className="pt-6">
            <h4 className="text-sm font-medium text-foreground mb-4">
              {POST_STRINGS.generatedCoversLabel}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {generatedCovers.map((c) => {
                const selected = selectedCoverKeys?.includes(c.key);
                return (
                  <div
                    key={c.key}
                    className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selected
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-border/30 hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={c.publicUrl}
                      alt={c.key}
                      className="w-full h-24 object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <label className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm rounded-full p-1.5 border border-border/30">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onToggleCoverKey?.(c.key)}
                        className="w-3 h-3 text-primary border-border rounded focus:ring-primary/20"
                      />
                    </label>
                    {selected && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                disabled={!selectedCoverKeys || selectedCoverKeys.length === 0}
                onClick={() => onApplyCovers?.()}
                className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
              >
                {POST_STRINGS.applySelectedCovers}
              </Button>
            </div>
          </div>
        )}
    </div>
  );
};

export default PostStatusBlock;
