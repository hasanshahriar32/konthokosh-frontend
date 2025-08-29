"use client";

import MyPostsSearchBar from "@/components/feed/MyPostsSearchBar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type MyPostsFilterProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isApproved: boolean | null;
  loadPosts: (
    page: number,
    searchTerm: string,
    isApproved: boolean | null
  ) => Promise<void>;
  loading: boolean;
  setPage: (page: number) => void;
};

const MyPostsFilter: React.FC<MyPostsFilterProps> = ({
  searchTerm,
  setSearchTerm,
  isApproved,
  loadPosts,
  loading,
  setPage,
}) => {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-transparent backdrop-blur-sm mb-6 border-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex flex-col gap-6 items-center justify-between">
          <div className="w-full md:flex-1">
            <MyPostsSearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={(e) => {
                e.preventDefault();
                setPage(1);
                void loadPosts(1, searchTerm, isApproved);
              }}
              loading={loading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyPostsFilter;
