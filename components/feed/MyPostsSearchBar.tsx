"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FC } from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading?: boolean;
  placeholder?: string;
  loadingText?: string;
  buttonText?: string;
};

const MyPostsSearchBar: FC<Props> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  loading,
  placeholder = "পোস্ট খুঁজুন...",
  loadingText = "খুঁজছি...",
  buttonText = "খুঁজুন",
}) => {
  return (
    <form onSubmit={onSearch} className="w-full">
      <div className="relative flex items-center gap-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-36 py-4 h-full rounded-full shadow-lg font-bengali text-base border-none focus:ring-2 focus:ring-primary bg-card/80 backdrop-blur-md text-foreground"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icons.Search className="h-5 w-5" />
        </div>
        <Button
          type="submit"
          className="rounded-full px-6 py-2 text-base font-bengali shadow-md bg-primary hover:bg-primary/70"
          disabled={loading}
        >
          {loading ? loadingText : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default MyPostsSearchBar;
