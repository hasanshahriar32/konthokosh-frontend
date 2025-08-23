import { POST_STRINGS, VISIBILITY_OPTIONS } from "@/constants/post";
import React from "react";

import { PostFormData } from "@/types";
import { Icons } from "../common/Icons";
import { Label } from "../ui/label";

type PostVisibilityProps = {
  formData: PostFormData;
  setFormData: React.Dispatch<React.SetStateAction<PostFormData>>;
};

const PostVisibility = ({ formData, setFormData }: PostVisibilityProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        {POST_STRINGS.visibilityLabel}
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {VISIBILITY_OPTIONS.map(
          (option: (typeof VISIBILITY_OPTIONS)[number]) => {
            const IconComponent = Icons[
              option.icon
            ] as unknown as React.ComponentType<any>;
            const isSelected = formData.visibility === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    visibility: option.value,
                  }))
                }
                className={`
											p-3 rounded-lg border transition-all duration-200 text-left cursor-pointer
											${
                        isSelected
                          ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                      }
										`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
												flex h-8 w-8 items-center justify-center rounded-full
												${isSelected ? "bg-primary/20" : "bg-muted"}
											`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default PostVisibility;
