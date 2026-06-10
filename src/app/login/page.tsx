"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";

export default function LoginPage() {
  const router = useRouter();
  const { login, forgotPassword, isAuthenticated } = useAuthStore();

  // Login form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState<{ success: boolean; text: string } | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        router.push("/profile");
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMessage(null);

    try {
      const result = await forgotPassword(forgotEmail.trim());
      setForgotMessage({ success: result.success, text: result.message });
      if (result.success) {
        setForgotEmail("");
      }
    } catch (err: any) {
      setForgotMessage({ success: false, text: err.message || "Something went wrong." });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="pb-20 max-w-md mx-auto">
      <Breadcrumb items={[{ label: "Login" }]} />

      <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 mt-4 shadow-sm space-y-6">
        {!forgotMode ? (
          <>
            <div className="space-y-1">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-450 font-medium">
                Log in to check your order updates, checkout swiftly, and manage wishlist items.
              </p>
            </div>

            {error && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900 text-xs font-bold rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                id="login-email"
                placeholder="e.g. jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4.5 h-4.5" />}
                required
              />
              <Input
                label="Password"
                type="password"
                id="login-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4.5 h-4.5" />}
                required
              />

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setForgotMode(true)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <Button
                type="submit"
                isLoading={loading}
                className="w-full py-3"
                rightIcon={<ArrowRight className="w-4.5 h-4.5" />}
              >
                Sign In
              </Button>
            </form>

            <div className="text-center text-xs font-semibold text-slate-450 dark:text-zinc-500 pt-2 border-t border-slate-50 dark:border-zinc-850">
              Don't have an account?{" "}
              <Link href="/register" className="text-indigo-650 hover:underline">
                Create account
              </Link>
            </div>
          </>
        ) : (
          <>
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
                    : "bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-455"
                }`}
              >
                {forgotMessage.text}
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                id="forgot-email"
                placeholder="e.g. jane@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                leftIcon={<Mail className="w-4.5 h-4.5" />}
                required
              />

              <Button type="submit" isLoading={forgotLoading} className="w-full py-3">
                Send Reset Link
              </Button>
            </form>

            <div className="text-center text-xs font-semibold text-slate-450 pt-2 border-t border-slate-50 dark:border-zinc-850">
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="text-indigo-650 hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
