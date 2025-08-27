"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { POST_TAGS } from "@/types";
import type { FC } from "react";

type Props = {
  searchInput: string;
  setSearchInput: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  selectedTag?: string;
  setSelectedTag?: (t: string) => void;
  loading?: boolean;
  placeholder?: string;
  loadingText?: string;
  buttonText?: string;
};

const SearchBar: FC<Props> = ({
  searchInput,
  setSearchInput,
  onSearch,
  selectedTag,
  setSelectedTag,
  loading,
  placeholder,
  loadingText,
  buttonText,
}) => {
  return (
    <section className="w-full mb-8 flex justify-center">
      <form onSubmit={onSearch} className="w-full max-w-3xl">
        <div className="relative flex items-center gap-4">
          {/* Tag selector */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Select
              value={selectedTag}
              onValueChange={(v) =>
                setSelectedTag && setSelectedTag(v === "__ALL__" ? "" : v)
              }
            >
              <SelectTrigger size="sm" className="mr-2">
                <SelectValue>{selectedTag || "ট্যাগ"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__ALL__">সব</SelectItem>
                {POST_TAGS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={placeholder}
            className="px-16 py-4 h-full rounded-full shadow-lg font-bengali text-base border-none focus:ring-2 focus:ring-primary bg-card/80 backdrop-blur-md text-foreground"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icons.Search className="h-5 w-5" />
          </div>
          <Button
            type="submit"
            className="rounded-full px-6 py-2 text-base font-bengali shadow-md"
            disabled={loading}
          >
            {loading ? loadingText : buttonText}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
