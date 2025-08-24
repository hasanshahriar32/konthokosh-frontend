"use client";

import React, { useContext, useState } from "react";
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
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import MyPostsContext from "@/context/MyPostsContext";
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
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: (id: number) => Promise<void>;
};

const PostCardMenu: React.FC<Props> = ({ postId, onView, onEdit, onDelete }) => {
  const ctx: any = useContext(MyPostsContext as any);
  const deleteFn = onDelete ?? ctx?.deletePost;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (deleteFn) await deleteFn(postId);
      else console.warn("No delete handler provided for PostCardMenu");
    } finally {
      setLoading(false);
    }
  };

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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="font-bengali text-red-600 focus:text-red-600" onSelect={(e) => e.preventDefault()}>
              <Trash2 className="h-4 w-4 mr-2" /> {loading ? DELETING : DELETE_BUTTON}
            </DropdownMenuItem>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-kalpurush">{DELETE_CONFIRM_TITLE}</AlertDialogTitle>
              <AlertDialogDescription className="font-bengali">{DELETE_CONFIRM}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="font-bengali">{CANCEL_BUTTON}</AlertDialogCancel>
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
    </DropdownMenu>
  );
};

export default PostCardMenu;
