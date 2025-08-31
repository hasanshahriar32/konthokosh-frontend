import type { Post } from "./types";

const toBanglaDigits = (num: string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]);
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formatted = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  return toBanglaDigits(formatted);
};
