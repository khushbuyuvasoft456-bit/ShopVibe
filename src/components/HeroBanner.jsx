import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl my-6 sm:my-8 shadow-xl">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

      {/* Main Grid Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="inline-flex items-center self-center lg:self-start gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            Summer Season Sale
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            Level Up Your <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0">
            Discover cutting-edge audio tech, luxury streetwear, performance
            gear, and premium beauty items. Redesigning everyday convenience
            with visuals that wow.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-700/20 transition-all transform active:scale-98"
            >
              Shop Collection <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/products?category=Electronics"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
            >
              Explore Tech Deals
            </Link>
          </div>
        </div>

        {/* Featured Image Section */}
        <div className="relative flex justify-center items-center lg:justify-end">
          {/* Decorative Backdrop Glow */}
          <div className="absolute w-72 sm:w-80 h-72 sm:h-80 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full opacity-20 blur-xl animate-pulse" />

          <div className="relative w-80 sm:w-96 aspect-square max-w-full rounded-2xl overflow-hidden border border-slate-850 bg-slate-900/40 backdrop-blur-md p-4 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="Wireless Headphones"
              width={500}
              height={500}
              priority
              className="object-cover rounded-xl w-full h-full transform hover:scale-105 transition-transform duration-500"
            />

            {/* Absolute Glassmorphism Tag */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-300 font-semibold uppercase">
                  Featured
                </p>
                <p className="text-sm font-bold text-white">Pro Wireless ANC</p>
              </div>
              <p className="text-base font-extrabold text-white">$189.99</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Icons Footer Bar */}
      <div className="relative bg-slate-950/60 border-t border-slate-850/80 py-6 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <Truck className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">
              Free Global Shipping
            </h4>
            <p className="text-xs text-slate-400">
              On all store orders over $150
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start border-y sm:border-y-0 sm:border-x border-slate-850/60 py-4 sm:py-0 sm:px-6">
          <RotateCcw className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">
              30-Day Easy Returns
            </h4>
            <p className="text-xs text-slate-400">
              Hassle-free refunds & exchanges
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">
              Secure Encrypted Payments
            </h4>
            <p className="text-xs text-slate-400">
              Guaranteed 256-bit safe checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
