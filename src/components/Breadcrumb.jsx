import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center flex-wrap gap-2 text-sm text-slate-500 dark:text-zinc-400 font-medium py-4">
      {/* Home Link */}
      <Link
        href="/"
        className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-slate-400 dark:text-zinc-600 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-zinc-100 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
export default Breadcrumb;
