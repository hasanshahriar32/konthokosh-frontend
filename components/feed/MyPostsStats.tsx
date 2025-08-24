"use client";

// using a single fluid container layout instead of individual Card components
import {
  ACTIVE_LABEL,
  APPROVED_LABEL,
  PENDING_LABEL,
  TOTAL_POSTS_LABEL,
} from "@/constants/feed";
import { Eye, FileText, Heart, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  totalCount: number;
  publishedPosts: Array<{ id: number; isApproved: boolean }>;
  pendingPosts: Array<{ id: number; isApproved: boolean }>;
  posts: Array<{ id: number; isActive: boolean }>;
};

type StatItemProps = {
  icon: ReactNode;
  fromClass: string;
  toClass: string;
  label: string;
  value: number;
};

const StatItem = ({
  icon,
  fromClass,
  toClass,
  label,
  value,
}: StatItemProps) => {
  return (
    <div className="flex-1 flex items-center gap-4 min-w-0 py-3 px-3 rounded-lg">
      <div
        className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br ${fromClass} ${toClass}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex flex-col gap-1.5">
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 truncate">
          {value}
        </p>
        <p className="font-bengali text-sm text-slate-500 truncate">{label}</p>
      </div>
    </div>
  );
};

const MyPostsStats = ({
  totalCount,
  publishedPosts,
  pendingPosts,
  posts,
}: Props) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="w-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-md overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-4 p-4">
            <StatItem
              icon={<FileText className="h-6 w-6 text-sky-600" />}
              fromClass="from-sky-50"
              toClass="to-sky-100"
              label={TOTAL_POSTS_LABEL}
              value={totalCount}
            />

            <StatItem
              icon={<Eye className="h-6 w-6 text-emerald-600" />}
              fromClass="from-emerald-50"
              toClass="to-emerald-100"
              label={APPROVED_LABEL}
              value={publishedPosts.length}
            />

            <StatItem
              icon={<Heart className="h-6 w-6 text-amber-600" />}
              fromClass="from-amber-50"
              toClass="to-amber-100"
              label={PENDING_LABEL}
              value={pendingPosts.length}
            />

            <StatItem
              icon={<MessageCircle className="h-6 w-6 text-violet-600" />}
              fromClass="from-violet-50"
              toClass="to-violet-100"
              label={ACTIVE_LABEL}
              value={posts.filter((p) => p.isActive).length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostsStats;
