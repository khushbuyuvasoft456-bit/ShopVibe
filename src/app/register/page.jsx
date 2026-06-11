"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await register(name.trim(), email.trim(), password);
      if (result.success) {
        router.push("/profile");
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

  return (
    <div className="pb-20 max-w-md mx-auto">
      <Breadcrumb items={[{ label: "Register" }]} />

      <div className="border border-slate-105 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 mt-4 shadow-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
            Create Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-450 font-medium">
            Register now to track your purchases, earn rewards, and secure
            custom checkouts.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-400 border border-rose-100 dark:border-rose-900 text-xs font-bold rounded-xl animate-scale-in">
            {error}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="e.g. Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4.5 h-4.5" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4.5 h-4.5" />}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4.5 h-4.5" />}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4.5 h-4.5" />}
            required
          />

          <Button
            type="submit"
            isLoading={loading}
            className="w-full py-3 mt-2"
            rightIcon={<ArrowRight className="w-4.5 h-4.5" />}
          >
            Create Account
          </Button>
        </form>

        <div className="text-center text-xs font-semibold text-slate-450 dark:text-zinc-500 pt-2 border-t border-slate-50 dark:border-zinc-850">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-655 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
