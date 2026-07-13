"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";

const registerSchema = z.object({
  name: z.string().min(1, { message: "Full Name is required." }),
  email: z.string()
    .min(1, { message: "Email Address is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string()
    .min(1, { message: "Please confirm your password." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register: authRegister, isAuthenticated } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Set document title for SEO
  useEffect(() => {
    document.title = "Create Account | ShopVibe";
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = searchParams.get("redirect") || "/profile";
      router.push(redirectPath);
    }
  }, [isAuthenticated, router, searchParams]);

  // React Hook Form for register
  const {
    register: registerField,
    handleSubmit: handleRegisterSubmit,
    watch,
    trigger,
    formState: { errors: registerErrors, touchedFields: registerTouched },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onRegisterSubmit = async (data) => {
    setError(null);
    setLoading(true);

    try {
      const result = await authRegister(data.name.trim(), data.email.trim(), data.password);
      if (result.success) {
        const redirectPath = searchParams.get("redirect") || "/profile";
        router.push(redirectPath);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred during registration.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Password checklist helpers
  const passwordValue = watch("password") || "";
  const hasMinLength = passwordValue.length >= 6;
  const hasNumber = /\d/.test(passwordValue);
  const hasUppercase = /[A-Z]/.test(passwordValue);

  return (
    <div className="pb-20 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: "Register" }]} />

      <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-3xl mt-4 shadow-xl md:grid md:grid-cols-12 overflow-hidden min-h-[520px]">
        {/* Left Visual panel */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-indigo-900 via-purple-950 to-zinc-950 text-white overflow-hidden select-none">
          {/* Glow effects */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse duration-[6000ms]" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse duration-[8000ms]" />

          {/* Brand / Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <span className="font-extrabold text-lg text-white">S</span>
            </div>
            <span className="font-extrabold tracking-tight text-lg">ShopVibe</span>
          </div>

          {/* Central Illustration / Text */}
          <div className="relative z-10 my-auto py-8 flex flex-col items-center text-center">
            <div className="relative w-24 h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl mb-6 group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="w-10 h-10 text-indigo-300 group-hover:text-white transition-colors animate-pulse" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight mb-2">Unlock Exclusive Perks</h2>
            <p className="text-xs text-indigo-200/90 max-w-[240px] leading-relaxed">
              Create your free account today to track shipping, view invoice details, and unlock membership rewards.
            </p>
          </div>

          {/* Footer info */}
          <div className="relative z-10 text-[10px] text-indigo-300/80 font-medium">
            &copy; {new Date().getFullYear()} ShopVibe. All rights reserved.
          </div>
        </div>

        {/* Right Form side */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-zinc-900">
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-450 font-medium">
                Register now to track your purchases, earn rewards, and secure custom checkouts.
              </p>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-400 border border-rose-100 dark:border-rose-900 text-xs font-bold rounded-xl animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4" noValidate>
              <Input
                label="Full Name"
                type="text"
                id="register-name"
                placeholder="e.g. Jane Doe"
                leftIcon={<User className="w-4.5 h-4.5" />}
                error={registerErrors.name?.message}
                success={registerTouched.name && !registerErrors.name}
                required
                {...registerField("name")}
              />

              <Input
                label="Email Address"
                type="email"
                id="register-email"
                placeholder="e.g. jane@example.com"
                leftIcon={<Mail className="w-4.5 h-4.5" />}
                error={registerErrors.email?.message}
                success={registerTouched.email && !registerErrors.email}
                required
                {...registerField("email")}
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                id="register-password"
                placeholder="Min. 6 characters"
                leftIcon={<Lock className="w-4.5 h-4.5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="focus:outline-none text-slate-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    id="register-toggle-password"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                }
                error={registerErrors.password?.message}
                success={registerTouched.password && !registerErrors.password}
                required
                {...registerField("password", {
                  onChange: () => {
                    if (registerTouched.confirmPassword) {
                      trigger("confirmPassword");
                    }
                  }
                })}
              />

              {/* Password Strength Checklist */}
              {passwordValue.length > 0 && (
                <div className="p-3 bg-slate-50 dark:bg-zinc-850/50 rounded-xl border border-slate-100 dark:border-zinc-800 space-y-1.5 text-xs animate-scale-in">
                  <p className="font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                    Password Strength Checklist:
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                        hasMinLength
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 dark:bg-zinc-800 text-slate-400"
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span
                      className={`transition-colors ${
                        hasMinLength
                          ? "text-emerald-600 dark:text-emerald-400 font-medium"
                          : "text-slate-500 dark:text-zinc-500"
                      }`}
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                        hasNumber
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 dark:bg-zinc-800 text-slate-400"
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span
                      className={`transition-colors ${
                        hasNumber
                          ? "text-emerald-600 dark:text-emerald-400 font-medium"
                          : "text-slate-500 dark:text-zinc-500"
                      }`}
                    >
                      Contains at least one number
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                        hasUppercase
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 dark:bg-zinc-800 text-slate-400"
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span
                      className={`transition-colors ${
                        hasUppercase
                          ? "text-emerald-600 dark:text-emerald-400 font-medium"
                          : "text-slate-500 dark:text-zinc-500"
                      }`}
                    >
                      Contains at least one uppercase letter
                    </span>
                  </div>
                </div>
              )}

              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="register-confirm-password"
                placeholder="Re-enter password"
                leftIcon={<Lock className="w-4.5 h-4.5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="focus:outline-none text-slate-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    id="register-toggle-confirm-password"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4.5 h-4.5" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </button>
                }
                error={registerErrors.confirmPassword?.message}
                success={registerTouched.confirmPassword && !registerErrors.confirmPassword}
                required
                {...registerField("confirmPassword")}
              />

              <Button
                type="submit"
                id="register-submit"
                isLoading={loading}
                className="w-full py-3 mt-2"
                rightIcon={<ArrowRight className="w-4.5 h-4.5" />}
              >
                Create Account
              </Button>
            </form>

             <div className="text-center text-xs font-semibold text-slate-450 dark:text-zinc-500 pt-4 border-t border-slate-50 dark:border-zinc-850">
              Already have an account?{" "}
              <Link
                href={searchParams.get("redirect") ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect"))}` : "/login"}
                id="register-login-link"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-650 border-t-transparent rounded-full animate-spin" /></div>}>
      <RegisterContent />
    </Suspense>
  );
}
