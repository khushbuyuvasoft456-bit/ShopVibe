"use client";

import React from "react";
import { Star } from "lucide-react";

export const Rating = ({
  value,
  max = 5,
  size = 16,
  onChange,
  readonly = true,
  className = "",
}) => {
  const stars = [];

  const handleStarClick = (index) => {
    if (!readonly && onChange) {
      onChange(index);
    }
  };

  for (let i = 1; i <= max; i++) {
    if (i <= value) {
      // Full star
      stars.push(
        <Star
          key={i}
          size={size}
          className={`fill-amber-400 text-amber-400 ${
            readonly
              ? ""
              : "cursor-pointer transition-transform hover:scale-110"
          }`}
          onClick={() => handleStarClick(i)}
        />,
      );
    } else if (i - 0.5 <= value) {
      // Half star
      stars.push(
        <div key={i} className="relative inline-block">
          <Star size={size} className="text-slate-200 dark:text-zinc-700" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star size={size} className="fill-amber-400 text-amber-400" />
          </div>
        </div>,
      );
    } else {
      // Empty star
      stars.push(
        <Star
          key={i}
          size={size}
          className={`text-slate-200 dark:text-zinc-700 ${
            readonly
              ? ""
              : "cursor-pointer transition-transform hover:scale-110"
          }`}
          onClick={() => handleStarClick(i)}
        />,
      );
    }
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>{stars}</div>
  );
};
export default Rating;
