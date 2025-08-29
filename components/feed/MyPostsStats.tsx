"use client";

import {
  APPROVED_LABEL,
  PENDING_LABEL,
  TOTAL_POSTS_LABEL,
} from "@/constants/feed";
import { Eye, FileText, Heart } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  totalCount: number;
  publishedPosts: Array<{ id: number; isApproved: boolean }>;
  pendingPosts: Array<{ id: number; isApproved: boolean }>;
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
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 truncate">
          {value}
        </p>
        <p className="font-bengali text-sm text-slate-500 dark:text-slate-300 truncate">
          {label}
        </p>
      </div>
    </div>
  );
};

const MyPostsStats = ({ totalCount, publishedPosts, pendingPosts }: Props) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="w-full bg-transparent rounded-2xl !shadow-none overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-4 p-4">
            <StatItem
              icon={
                <FileText className="h-6 w-6 text-sky-600 dark:text-sky-200" />
              }
              fromClass="from-sky-50 dark:from-sky-700"
              toClass="to-sky-100 dark:to-sky-800"
              label={TOTAL_POSTS_LABEL}
              value={totalCount}
            />

            <StatItem
              icon={
                <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-200" />
              }
              fromClass="from-emerald-50 dark:from-emerald-700"
              toClass="to-emerald-100 dark:to-emerald-800"
              label={APPROVED_LABEL}
              value={publishedPosts.length}
            />

            <StatItem
              icon={
                <Heart className="h-6 w-6 text-amber-600 dark:text-amber-300" />
              }
              fromClass="from-amber-50 dark:from-amber-700"
              toClass="to-amber-100 dark:to-amber-800"
              label={PENDING_LABEL}
              value={pendingPosts.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostsStats;
