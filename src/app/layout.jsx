import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/store/StoreProvider";
import Script from "next/script";

export const metadata = {
  title: "ShopVibe - Premium E-commerce Shopping Experience",
  description:
    "Explore top brand electronics, fashion, beauty, sports equipment, and minimalist home kitchen items with premium quality and swift delivery.",
  keywords: [
    "e-commerce",
    "shopping",
    "electronics",
    "fashion",
    "beauty",
    "sports",
    "home kitchen",
  ],
  openGraph: {
    title: "ShopVibe - Premium E-commerce Shopping Experience",
    description:
      "Explore top brand electronics, fashion, beauty, sports equipment, and minimalist home kitchen items.",
    url: "https://shopvibe-example.com",
    siteName: "ShopVibe",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-250" suppressHydrationWarning>
        <StoreProvider>
          <Suspense
            fallback={
              <div className="h-16 border-b border-slate-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80" />
            }
          >
            <Navbar />
          </Suspense>
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {children}
          </main>
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
}

