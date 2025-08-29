"use client";

import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { POST_TAGS } from "@/types";
import type { FC } from "react";

type Props = {
  searchInput: string;
  setSearchInput: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  selectedTags?: string[];
  setSelectedTags?: (t: string[]) => void;
  loading?: boolean;
  placeholder?: string;
  loadingText?: string;
  buttonText?: string;
};

const SearchBar: FC<Props> = ({
  searchInput,
  setSearchInput,
  onSearch,
  selectedTags,
  setSelectedTags,
  loading,
  placeholder,
  loadingText,
  buttonText,
}) => {
  return (
    <section className="w-full mb-8 flex justify-center">
      <form onSubmit={onSearch} className="w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={placeholder}
              className="pl-12 pr-36 py-4 h-full rounded-full shadow-lg font-bengali text-base border-none focus:ring-2 focus:ring-primary bg-card/80 backdrop-blur-md text-foreground"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Icons.Search className="h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="h-12 flex items-center gap-2 px-3 py-2 rounded-full text-sm text-foreground/80 transition cursor-pointer">
                <Icons.Tag className="h-4 w-4 opacity-80" />
                <div className="max-w-xs truncate">
                  {selectedTags && selectedTags.length > 0 ? (
                    <div className="flex gap-2">
                      {selectedTags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          {t}
                        </span>
                      ))}
                      {selectedTags.length > 2 && (
                        <span className="px-2 py-0.5 bg-muted/20 rounded-full text-xs">
                          +{selectedTags.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    "ট্যাগ"
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[12rem] max-h-60 overflow-auto">
                <DropdownMenuCheckboxItem
                  checked={!selectedTags || selectedTags.length === 0}
                  onCheckedChange={() => setSelectedTags && setSelectedTags([])}
                >
                  সব
                </DropdownMenuCheckboxItem>
                {POST_TAGS.map((t) => (
                  <DropdownMenuCheckboxItem
                    key={t}
                    checked={!!selectedTags && selectedTags.includes(t)}
                    onCheckedChange={(checked) => {
                      if (!setSelectedTags) return;
                      const cur = selectedTags ?? [];
                      if (checked) {
                        if (!cur.includes(t)) setSelectedTags([...cur, t]);
                      } else {
                        setSelectedTags(cur.filter((x) => x !== t));
                      }
                    }}
                  >
                    {t}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              type="submit"
              className="rounded-full px-6 py-2 text-base font-bengali shadow-md bg-primary hover:bg-primary/70"
              disabled={loading}
            >
              {loading ? loadingText : buttonText}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
