"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, Check } from "lucide-react";
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
  
  // Real-time validation states
  const [fieldErrors, setFieldErrors] = useState({});
  const [successFields, setSuccessFields] = useState({});
  const [touched, setTouched] = useState({});
  
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
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  // Real-time validation logic
  const validateField = (fieldName, value, currentPasswordState = password) => {
    let errorMsg = null;
    let isValid = false;

    if (fieldName === "name") {
      if (!value.trim()) {
        errorMsg = "Full Name is required.";
      } else {
        isValid = true;
      }
    } else if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMsg = "Email Address is required.";
      } else if (!emailRegex.test(value.trim())) {
        errorMsg = "Please enter a valid email address.";
      } else {
        isValid = true;
      }
    } else if (fieldName === "password") {
      if (!value) {
        errorMsg = "Password is required.";
      } else if (value.length < 6) {
        errorMsg = "Password must be at least 6 characters.";
      } else {
        isValid = true;
      }
    } else if (fieldName === "confirmPassword") {
      if (!value) {
        errorMsg = "Please confirm your password.";
      } else if (value !== currentPasswordState) {
        errorMsg = "Passwords do not match.";
      } else {
        isValid = true;
      }
    }

    setFieldErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    setSuccessFields((prev) => ({ ...prev, [fieldName]: isValid }));
    return isValid;
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    if (fieldName === "name") validateField("name", name);
    if (fieldName === "email") validateField("email", email);
    if (fieldName === "password") {
      validateField("password", password);
      if (confirmPassword) validateField("confirmPassword", confirmPassword, password);
    }
    if (fieldName === "confirmPassword") validateField("confirmPassword", confirmPassword, password);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Mark all fields as touched to trigger full validation
    const allTouched = { name: true, email: true, password: true, confirmPassword: true };
    setTouched(allTouched);

    const isNameValid = validateField("name", name);
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);
    const isConfirmPasswordValid = validateField("confirmPassword", confirmPassword, password);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
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

  // Password checklist helpers
  const hasMinLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

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

            <form onSubmit={handleRegisterSubmit} className="space-y-4" noValidate>
              <Input
                label="Full Name"
                type="text"
                id="register-name"
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => {
                  const val = e.target.value;
                  setName(val);
                  if (touched.name) {
                    validateField("name", val);
                  }
                }}
                onBlur={() => handleBlur("name")}
                leftIcon={<User className="w-4.5 h-4.5" />}
                error={touched.name && fieldErrors.name}
                success={touched.name && successFields.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                id="register-email"
                placeholder="e.g. jane@example.com"
                value={email}
                onChange={(e) => {
                  const val = e.target.value;
                  setEmail(val);
                  if (touched.email) {
                    validateField("email", val);
                  }
                }}
                onBlur={() => handleBlur("email")}
                leftIcon={<Mail className="w-4.5 h-4.5" />}
                error={touched.email && fieldErrors.email}
                success={touched.email && successFields.email}
                required
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                id="register-password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  if (touched.password) {
                    validateField("password", val, val);
                  }
                  if (touched.confirmPassword) {
                    validateField("confirmPassword", confirmPassword, val);
                  }
                }}
                onBlur={() => handleBlur("password")}
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
                error={touched.password && fieldErrors.password}
                success={touched.password && successFields.password}
                required
              />

              {/* Password Strength Checklist */}
              {password.length > 0 && (
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
                value={confirmPassword}
                onChange={(e) => {
                  const val = e.target.value;
                  setConfirmPassword(val);
                  if (touched.confirmPassword) {
                    validateField("confirmPassword", val, password);
                  }
                }}
                onBlur={() => handleBlur("confirmPassword")}
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
                error={touched.confirmPassword && fieldErrors.confirmPassword}
                success={touched.confirmPassword && successFields.confirmPassword}
                required
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
                href="/login"
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
