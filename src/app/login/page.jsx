"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ArrowRight, ShoppingBag, Eye, EyeOff, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";

const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email Address is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." })
});

const forgotPasswordSchema = z.object({
  email: z.string()
    .min(1, { message: "Email Address is required." })
    .email({ message: "Please enter a valid email address." })
});

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, forgotPassword, isAuthenticated } = useAuthStore();

  // Login form states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Forgot password states
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState(null);

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Set document title for SEO
  useEffect(() => {
    document.title = "Sign In | ShopVibe";
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = searchParams.get("redirect") || "/profile";
      router.push(redirectPath);
    }
  }, [isAuthenticated, router, searchParams]);

  // React Hook Form for login
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, touchedFields: loginTouched },
    reset: resetLoginForm,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    }
  });

  // React Hook Form for forgot password
  const {
    register: registerForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors, touchedFields: forgotTouched },
    reset: resetForgotForm,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    }
  });

  const onLoginSubmit = async (data) => {
    setError(null);
    setLoading(true);

    try {
      const result = await login(data.email.trim(), data.password);
      if (result.success) {
        const redirectPath = searchParams.get("redirect") || "/profile";
        router.push(redirectPath);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const onForgotSubmit = async (data) => {
    setForgotMessage(null);
    setForgotLoading(true);

    try {
      const result = await forgotPassword(data.email.trim());
      setForgotMessage({ success: result.success, text: result.message });
      if (result.success) {
        resetForgotForm();
      }
    } catch (err) {
      setForgotMessage({
        success: false,
        text: err.message || "Something went wrong.",
      });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="pb-20 max-w-4xl mx-auto">
      <Breadcrumb items={[{ label: "Login" }]} />

      <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-3xl mt-4 shadow-xl md:grid md:grid-cols-12 overflow-hidden min-h-[520px]">
        {/* Left Visual panel */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-indigo-900 via-indigo-950 to-zinc-950 text-white overflow-hidden select-none">
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
              <ShoppingBag className="w-10 h-10 text-indigo-300 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight mb-2">Elevate Your Shopping</h2>
            <p className="text-xs text-indigo-200/90 max-w-[240px] leading-relaxed">
              Discover handpicked collections, customized recommendations, and swift checkouts.
            </p>
          </div>

          {/* Footer info */}
          <div className="relative z-10 text-[10px] text-indigo-300/80 font-medium">
            &copy; {new Date().getFullYear()} ShopVibe. All rights reserved.
          </div>
        </div>

        {/* Right Form side */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-zinc-900">
          {!forgotMode ? (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xs text-slate-500 dark:text-zinc-450 font-medium">
                  Log in to check your order updates, checkout swiftly, and manage wishlist items.
                </p>
              </div>

              {error && (
                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-400 border border-rose-100 dark:border-rose-900 text-xs font-bold rounded-xl animate-shake">
                  {error}
                </div>
              )}

              <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4" noValidate>
                <Input
                  label="Email Address"
                  type="email"
                  id="login-email"
                  placeholder="e.g. jane@example.com"
                  leftIcon={<Mail className="w-4.5 h-4.5" />}
                  error={loginErrors.email?.message}
                  success={loginTouched.email && !loginErrors.email}
                  required
                  {...registerLogin("email")}
                />

                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4.5 h-4.5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="focus:outline-none text-slate-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                      id="login-toggle-password"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4.5 h-4.5" />
                      ) : (
                        <Eye className="w-4.5 h-4.5" />
                      )}
                    </button>
                  }
                  error={loginErrors.password?.message}
                  success={loginTouched.password && !loginErrors.password}
                  required
                  {...registerLogin("password")}
                />

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    id="login-forgot-password-toggle"
                    onClick={() => {
                      setForgotMode(true);
                      setError(null);
                      resetLoginForm();
                    }}
                    className="text-xs font-bold text-indigo-650 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  id="login-submit"
                  isLoading={loading}
                  className="w-full py-3 mt-2"
                  rightIcon={<ArrowRight className="w-4.5 h-4.5" />}
                >
                  Sign In
                </Button>
              </form>

              <div className="text-center text-xs font-semibold text-slate-450 dark:text-zinc-500 pt-4 border-t border-slate-50 dark:border-zinc-850">
                Don't have an account?{" "}
                <Link
                  href={searchParams.get("redirect") ? `/register?redirect=${encodeURIComponent(searchParams.get("redirect"))}` : "/register"}
                  id="login-register-link"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
                  Reset Password
                </h1>
                <p className="text-xs text-slate-500 dark:text-zinc-450 font-medium">
                  Enter your email address and we'll send you a link to reset your account credentials.
                </p>
              </div>

              {forgotMessage && (
                <div
                  className={`p-3.5 border text-xs font-bold rounded-xl ${
                    forgotMessage.success
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-450"
                      : "bg-rose-50 border-rose-100 text-rose-650 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-400"
                  }`}
                >
                  {forgotMessage.text}
                </div>
              )}

              <form onSubmit={handleForgotSubmit(onForgotSubmit)} className="space-y-4" noValidate>
                <Input
                  label="Email Address"
                  type="email"
                  id="forgot-email"
                  placeholder="e.g. jane@example.com"
                  leftIcon={<Mail className="w-4.5 h-4.5" />}
                  error={forgotErrors.email?.message}
                  success={forgotTouched.email && !forgotErrors.email}
                  required
                  {...registerForgot("email")}
                />

                <Button
                  type="submit"
                  id="forgot-submit"
                  isLoading={forgotLoading}
                  className="w-full py-3 mt-2"
                >
                  Send Reset Link
                </Button>
              </form>

              <div className="text-center text-xs font-semibold text-slate-450 pt-4 border-t border-slate-50 dark:border-zinc-850">
                <button
                  type="button"
                  id="forgot-back-toggle"
                  onClick={() => {
                    setForgotMode(false);
                    setForgotMessage(null);
                    resetForgotForm();
                  }}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-650 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
