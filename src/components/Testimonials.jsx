"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Rating from "./Rating";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Alex Thompson",
    role: "Tech Enthusiast",
    quote:
      "The Pro Wireless Headphones blew my expectations away. Fast delivery, perfect noise isolation, and a deep bass that doesn't overwhelm. The dark mode theme of this website is incredibly smooth too!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "test-2",
    name: "Sarah Miller",
    role: "Verified Buyer",
    quote:
      "I bought the Ceramic Mug Set and the Organic Vitamin C Serum. Both products arrived in pristine packaging. Customer service helped me update my shipping address instantly. Highly professional site.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "test-3",
    name: "Marcus Aurelius",
    role: "Fitness Coach",
    quote:
      "The alignment lines on the Yoga Mat are a game changer. The TPE material is truly non-slip, even during sweaty sessions. Ordering was a breeze with the 1-click add to cart buttons.",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "test-4",
    name: "Jessica Chen",
    role: "Lifestyle Blogger",
    quote:
      "The shipping was incredibly fast, and the packaging was super premium. The fitness tracker matches all my styling choices perfectly. I'll definitely be buying my summer gifts from here!",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "test-5",
    name: "David Vance",
    role: "Audio Producer",
    quote:
      "I tested the soundstage on the Pro Wireless ANC headphones. For this price, the response curve is exceptionally flat, providing excellent mids. The website's search filters make shopping efficient.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "test-6",
    name: "Sophia Rodriguez",
    role: "Home Stylist",
    quote:
      "Minimalist aesthetics at its best! The Espresso Machine and Ceramic Mug Set are now beautiful statement pieces on my counter. Excellent checkout experience with instant details validation.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop width
  const timerRef = useRef(null);

  // Sync window width on mount/resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getVisibleCards = () => {
    if (windowWidth >= 1024) return 3; // lg
    if (windowWidth >= 768) return 2; // md
    return 1; // sm/xs
  };

  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCards);

  // Keep currentIndex in bounds if visible cards changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (!isHovered && maxIndex > 0) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, currentIndex, maxIndex]);

  return (
    <section className="py-12 sm:py-16 overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
          What our customers say
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
          Real feedback from verified purchasers about our products and shopping
          experience.
        </p>
      </div>

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden py-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="shrink-0 px-3"
                style={{
                  width: `${100 / visibleCards}%`,
                }}
              >
                <div className="h-full flex flex-col p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative">
                  {/* Rating */}
                  <Rating value={test.rating} size={15} className="mb-4" />

                  {/* Quote */}
                  <p className="text-sm italic text-slate-600 dark:text-zinc-300 leading-relaxed flex-1">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  {/* Author Details */}
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-zinc-850">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-100 dark:border-zinc-800">
                      <Image
                        src={test.avatar}
                        alt={test.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-150">
                        {test.name}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-zinc-500">
                        {test.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {maxIndex > 0 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-2 sm:-left-4  top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-indigo-650 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 shadow-md transition-all z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-2   top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-indigo-650 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 shadow-md transition-all z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-indigo-600 dark:bg-indigo-500"
                  : "w-2 bg-slate-200 dark:bg-zinc-850"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
