import React from "react";
import { Loader2 } from "lucide-react";

export const Loader = ({ fullScreen = false, size = "md", text }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={`animate-spin text-indigo-600 dark:text-indigo-400 ${sizeClasses[size]}`}
      />
      {text && (
        <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 w-full">
      {content}
    </div>
  );
};
export default Loader;
