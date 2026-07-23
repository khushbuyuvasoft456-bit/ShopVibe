"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, MapPin, CheckCircle, Receipt, Copy } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";
import ProtectedRoute from "@/components/ProtectedRoute";

const profileSchema = z.object({
  name: z.string().min(1, { message: "Full Name is required." }),
  phone: z.string().optional(),
});

const addressSchema = z.object({
  fullName: z.string().min(1, { message: "Contact Name is required." }),
  phone: z.string().min(1, { message: "Contact Phone is required." }),
  street: z.string().min(1, { message: "Street Address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  zipCode: z.string().min(1, { message: "ZIP Code is required." }),
  country: z.string().default("United States"),
});

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile, updateAddress } =
    useAuthStore();

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);
  const [shippingSuccess, setShippingSuccess] = useState(false);

  const [isUpdatingBilling, setIsUpdatingBilling] = useState(false);
  const [billingSuccess, setBillingSuccess] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(false);

  // Forms setup
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, touchedFields: profileTouched },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
    }
  });

  const {
    register: registerShipping,
    handleSubmit: handleShippingSubmit,
    reset: resetShipping,
    getValues: getShippingValues,
    formState: { errors: shippingErrors, touchedFields: shippingTouched },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    }
  });

  const {
    register: registerBilling,
    handleSubmit: handleBillingSubmit,
    reset: resetBilling,
    formState: { errors: billingErrors, touchedFields: billingTouched },
  } = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    }
  });

  // Sync profile states
  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name || "",
        phone: user.phone || "",
      });
      if (user.shippingAddress) {
        resetShipping({
          fullName: user.shippingAddress.fullName || "",
          phone: user.shippingAddress.phone || "",
          street: user.shippingAddress.street || "",
          city: user.shippingAddress.city || "",
          state: user.shippingAddress.state || "",
          zipCode: user.shippingAddress.zipCode || "",
          country: user.shippingAddress.country || "United States",
        });
      }
      if (user.billingAddress) {
        resetBilling({
          fullName: user.billingAddress.fullName || "",
          phone: user.billingAddress.phone || "",
          street: user.billingAddress.street || "",
          city: user.billingAddress.city || "",
          state: user.billingAddress.state || "",
          zipCode: user.billingAddress.zipCode || "",
          country: user.billingAddress.country || "United States",
        });
      }
    }
  }, [user, resetProfile, resetShipping, resetBilling]);

  const onProfileUpdate = async (data) => {
    setIsUpdatingProfile(true);
    setProfileSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 650));
    updateProfile({ name: data.name, phone: data.phone });
    setIsUpdatingProfile(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const onShippingUpdate = async (data) => {
    setIsUpdatingShipping(true);
    setShippingSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 650));
    updateAddress("shipping", data);
    if (sameAsShipping) {
      updateAddress("billing", data);
      resetBilling(data);
    }
    setIsUpdatingShipping(false);
    setShippingSuccess(true);
    setTimeout(() => setShippingSuccess(false), 3000);
  };

  const onBillingUpdate = async (data) => {
    setIsUpdatingBilling(true);
    setBillingSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 650));
    updateAddress("billing", data);
    setIsUpdatingBilling(false);
    setBillingSuccess(true);
    setTimeout(() => setBillingSuccess(false), 3000);
  };

  const handleCopyShippingToBilling = () => {
    const shippingValues = getShippingValues();
    resetBilling(shippingValues);
    setSameAsShipping(true);
  };

  return (
    <ProtectedRoute>
      <div className="pb-20">
        <Breadcrumb items={[{ label: "User Profile" }]} />

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight mt-2">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Left column: Profile details edit (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" /> Personal Details
              </h3>

              {profileSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900 text-xs font-bold rounded-xl flex items-center gap-1.5 animate-scale-in">
                  <CheckCircle className="w-4 h-4" /> Personal info updated!
                </div>
              )}

              <form onSubmit={handleProfileSubmit(onProfileUpdate)} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Name"
                  error={profileErrors.name?.message}
                  success={profileTouched.name && !profileErrors.name}
                  required
                  {...registerProfile("name")}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Email"
                  value={user?.email || ""}
                  disabled
                                      className="bg-slate-50 dark:bg-zinc-855 text-slate-400 cursor-not-allowed border-dashed"
                />

                <Input
                  label="Phone Number"
                  type="text"
                  placeholder="Phone number"
                  error={profileErrors.phone?.message}
                  success={profileTouched.phone && !profileErrors.phone}
                  leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                  {...registerProfile("phone")}
                />

                <Button
                  type="submit"
                  isLoading={isUpdatingProfile}
                  className="w-full py-2.5 text-sm"
                >
                  Save Account Changes
                </Button>
              </form>
            </div>
          </div>

          {/* Right column: Address Settings (Shipping + Billing forms) (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Shipping Address Container */}
            <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" /> Default Shipping Address
              </h3>
              {shippingSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-455 border border-emerald-100 dark:border-emerald-900 text-xs font-bold rounded-xl flex items-center gap-1.5 animate-scale-in">
                  <CheckCircle className="w-4 h-4" /> Shipping address updated successfully!
                </div>
              )}

              <form onSubmit={handleShippingSubmit(onShippingUpdate)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Contact Name"
                    placeholder="e.g. Jane Doe"
                    error={shippingErrors.fullName?.message}
                    success={shippingTouched.fullName && !shippingErrors.fullName}
                    required
                    {...registerShipping("fullName")}
                  />

                  <Input
                    label="Contact Phone"
                    placeholder="e.g. +1 (555) 019-2834"
                    error={shippingErrors.phone?.message}
                    success={shippingTouched.phone && !shippingErrors.phone}
                    required
                    {...registerShipping("phone")}
                  />
                </div>

                <Input
                  label="Street Address"
                  placeholder="e.g. 123 Market Street, Apt 4B"
                  error={shippingErrors.street?.message}
                  success={shippingTouched.street && !shippingErrors.street}
                  required
                  {...registerShipping("street")}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    placeholder="San Francisco"
                    error={shippingErrors.city?.message}
                    success={shippingTouched.city && !shippingErrors.city}
                    required
                    {...registerShipping("city")}
                  />

                  <Input
                    label="State"
                    placeholder="CA"
                    error={shippingErrors.state?.message}
                    success={shippingTouched.state && !shippingErrors.state}
                    required
                    {...registerShipping("state")}
                  />

                  <Input
                    label="ZIP Code"
                    placeholder="94103"
                    error={shippingErrors.zipCode?.message}
                    success={shippingTouched.zipCode && !shippingErrors.zipCode}
                    required
                    {...registerShipping("zipCode")}
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isUpdatingShipping}
                  className="w-full py-2.5 text-sm"
                >
                  Save Shipping Address
                </Button>
              </form>
            </div>

            {/* Billing Address Container */}
            <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-indigo-600" /> Billing Address Form
                </h3>
                <button
                  type="button"
                  onClick={handleCopyShippingToBilling}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy from shipping address
                </button>
              </div>

              {billingSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-455 border border-emerald-100 dark:border-emerald-900 text-xs font-bold rounded-xl flex items-center gap-1.5 animate-scale-in">
                  <CheckCircle className="w-4 h-4" /> Billing address updated successfully!
                </div>
              )}

              <form onSubmit={handleBillingSubmit(onBillingUpdate)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Jane Doe"
                    error={billingErrors.fullName?.message}
                    success={billingTouched.fullName && !billingErrors.fullName}
                    required
                    {...registerBilling("fullName")}
                  />

                  <Input
                    label="Phone Number"
                    placeholder="e.g. +1 (555) 019-2834"
                    error={billingErrors.phone?.message}
                    success={billingTouched.phone && !billingErrors.phone}
                    required
                    {...registerBilling("phone")}
                  />
                </div>

                <Input
                  label="Street Address"
                  placeholder="e.g. 123 Market Street, Apt 4B"
                  error={billingErrors.street?.message}
                  success={billingTouched.street && !billingErrors.street}
                  required
                  {...registerBilling("street")}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    placeholder="San Francisco"
                    error={billingErrors.city?.message}
                    success={billingTouched.city && !billingErrors.city}
                    required
                    {...registerBilling("city")}
                  />

                  <Input
                    label="State / Region"
                    placeholder="CA"
                    error={billingErrors.state?.message}
                    success={billingTouched.state && !billingErrors.state}
                    required
                    {...registerBilling("state")}
                  />

                  <Input
                    label="ZIP Code"
                    placeholder="94103"
                    error={billingErrors.zipCode?.message}
                    success={billingTouched.zipCode && !billingErrors.zipCode}
                    required
                    {...registerBilling("zipCode")}
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isUpdatingBilling}
                  className="w-full py-2.5 text-sm"
                >
                  Save Billing Address
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
