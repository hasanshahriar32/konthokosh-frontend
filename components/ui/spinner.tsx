"use client"

import * as React from "react";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
};

const sizeMap: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-2",
};

const Spinner = ({ size = "sm", className = "", ariaLabel = "loading" }: SpinnerProps) => {
  const classes = `${sizeMap[size]} ${className} rounded-full border-t-transparent animate-spin inline-block`;
  return <span role="status" aria-label={ariaLabel} className={classes} />;
};

export { Spinner };
export default Spinner;
