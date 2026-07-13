"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "./Loader";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      // Encode the current path to redirect back to it after successful login
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isInitialized, isAuthenticated, pathname, router]);

  // Show fullscreen loader while checking authentication state or loading page data
  if (!isInitialized || !isAuthenticated) {
    return <Loader fullScreen text="Verifying your session..." />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
