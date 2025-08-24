"use client";

import MyPostsSearchBar from "@/components/feed/MyPostsSearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ALL_LABEL, APPROVED_LABEL, PENDING_LABEL } from "@/constants/feed";
import React from "react";

type MyPostsFilterProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isApproved: boolean | null;
  setIsApproved: (isApproved: boolean | null) => void;
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
  setIsApproved,
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

          <div className="flex gap-2 mt-3 md:mt-0">
            <Button
              variant={isApproved === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => {
                setIsApproved(null);
                void loadPosts(1, searchTerm, null);
              }}
              className="font-bengali"
            >
              {ALL_LABEL}
            </Button>
            <Button
              variant={isApproved === true ? "secondary" : "outline"}
              size="sm"
              onClick={() => {
                setIsApproved(true);
                void loadPosts(1, searchTerm, true);
              }}
              className="font-bengali"
            >
              {APPROVED_LABEL}
            </Button>
            <Button
              variant={isApproved === false ? "secondary" : "outline"}
              size="sm"
              onClick={() => {
                setIsApproved(false);
                void loadPosts(1, searchTerm, false);
              }}
              className="font-bengali"
            >
              {PENDING_LABEL}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyPostsFilter;
