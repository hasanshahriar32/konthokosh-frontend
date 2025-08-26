"use client";

import React, { useContext, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Eye, Edit, Trash2, Play } from "lucide-react";
import MyPostsContext from "@/context/MyPostsContext";
import PostStatusDialog from "@/components/post/PostStatusDialog";
import {
  useKonthoKoshApi,
  handleKonthoKoshError,
} from "@/utils/konthokosh-api";
import {
  PROCESS_BUTTON,
  PROCESS_SUBMITTING,
  PROCESS_IPFS_PROCESSING,
  PROCESS_COMPLETED,
  PROCESS_SUCCESS,
  PROCESS_IN_PROGRESS,
  NO_DELETE_HANDLER,
} from "@/constants/feed";
import {
  DELETING,
  VIEW_BUTTON,
  EDIT_BUTTON,
  DELETE_BUTTON,
  DELETE_CONFIRM_TITLE,
  DELETE_CONFIRM,
  CANCEL_BUTTON,
} from "@/constants/feed";

type Props = {
  postId: number;
  isPending: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: (id: number) => Promise<void>;
};

const PostCardMenu: React.FC<Props> = ({
  postId,
  isPending,
  onView,
  onEdit,
  onDelete,
}) => {
  const ctx: any = useContext(MyPostsContext as any);
  const deleteFn = onDelete ?? ctx?.deletePost;
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "onchain" | "completed" | "error"
  >("idle");
  const [onChainSubmitResp, setOnChainSubmitResp] = useState<any | null>(null);
  const [onChainProcessResp, setOnChainProcessResp] = useState<any | null>(
    null
  );

  const { submitToBlockchain, processIpfs } = useKonthoKoshApi();

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (deleteFn) await deleteFn(postId);
      else console.warn("No delete handler provided for PostCardMenu");
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = useCallback(async () => {
    setDialogOpen(true);
    setProcessing(true);
    setProcessStatus("");
    setOnChainSubmitResp(null);
    setOnChainProcessResp(null);
    setSubmitStatus("submitting");
    try {
      setProcessStatus(PROCESS_SUBMITTING);
      const submitResp = await submitToBlockchain(postId);
      setOnChainSubmitResp(submitResp ?? null);

      setSubmitStatus("onchain");
      setProcessStatus(PROCESS_IPFS_PROCESSING);
      const procResp = await processIpfs(postId);
      setOnChainProcessResp(procResp ?? null);

      setSubmitStatus("completed");
      setProcessStatus(PROCESS_COMPLETED);
    } catch (err) {
      const friendly = handleKonthoKoshError(err);
      setProcessStatus(friendly);
      setSubmitStatus("error");
    } finally {
      setProcessing(false);
      // keep dialog visible so user can inspect details; clear transient message later
      setTimeout(() => setProcessStatus(""), 2500);
    }
  }, [postId, submitToBlockchain, processIpfs]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="font-bengali"
          onSelect={(e) => {
            e.preventDefault();
            onView?.();
          }}
        >
          <Eye className="h-4 w-4 mr-2" /> {VIEW_BUTTON}
        </DropdownMenuItem>

        <DropdownMenuItem
          className="font-bengali"
          onSelect={(e) => {
            e.preventDefault();
            onEdit?.();
          }}
        >
          <Edit className="h-4 w-4 mr-2" /> {EDIT_BUTTON}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isPending && (
          <DropdownMenuItem
            className="font-bengali"
            onSelect={(e) => {
              e.preventDefault();
              if (!processing) void handleProcess();
            }}
          >
            {/* simple status feedback in the label */}
            <Play className="h-4 w-4 mr-2" />{" "}
            {processing ? PROCESS_IN_PROGRESS : PROCESS_BUTTON}
          </DropdownMenuItem>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="font-bengali text-red-600 focus:text-red-600"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 className="h-4 w-4 mr-2" />{" "}
              {loading ? DELETING : DELETE_BUTTON}
            </DropdownMenuItem>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-kalpurush">
                {DELETE_CONFIRM_TITLE}
              </AlertDialogTitle>
              <AlertDialogDescription className="font-bengali">
                {DELETE_CONFIRM}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="font-bengali">
                {CANCEL_BUTTON}
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 font-bengali"
                onClick={() => void handleDelete()}
                disabled={loading}
              >
                {loading ? DELETING : DELETE_BUTTON}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
      {/* Status dialog shown while processing or after to display progress/results */}
      <PostStatusDialog
        isOpen={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setSubmitStatus("idle");
            setProcessStatus("");
            setOnChainSubmitResp(null);
            setOnChainProcessResp(null);
          }
        }}
        createdPost={null}
        onChainSubmit={onChainSubmitResp}
        onChainProcess={onChainProcessResp}
        statusMessage={processStatus}
        status={submitStatus}
      />
    </DropdownMenu>
  );
};

export default PostCardMenu;
