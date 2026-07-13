"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, MapPin, CheckCircle, ShieldAlert } from "lucide-react";
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
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    reset: resetAddress,
    formState: { errors: addressErrors, touchedFields: addressTouched },
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
        resetAddress({
          fullName: user.shippingAddress.fullName || "",
          phone: user.shippingAddress.phone || "",
          street: user.shippingAddress.street || "",
          city: user.shippingAddress.city || "",
          state: user.shippingAddress.state || "",
          zipCode: user.shippingAddress.zipCode || "",
          country: user.shippingAddress.country || "United States",
        });
      }
    }
  }, [user, resetProfile, resetAddress]);


  const onProfileUpdate = async (data) => {
    setIsUpdatingProfile(true);
    setProfileSuccess(false);

    // Simulate API update
    await new Promise((resolve) => setTimeout(resolve, 650));
    updateProfile({ name: data.name, phone: data.phone });
    setIsUpdatingProfile(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const onAddressUpdate = async (data) => {
    setIsUpdatingShipping(true);
    setShippingSuccess(false);

    // Simulate API update
    await new Promise((resolve) => setTimeout(resolve, 650));
    updateAddress("shipping", data);
    updateAddress("billing", data); // Keep in sync for simple profile management
    setIsUpdatingShipping(false);
    setShippingSuccess(true);
    setTimeout(() => setShippingSuccess(false), 3000);
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
            <div className="border border-slate-105 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-650" /> Personal Details
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

          {/* Right column: Default address settings (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="border border-slate-105 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-650" /> Default Address
              </h3>

              {shippingSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-455 border border-emerald-105 dark:border-emerald-900 text-xs font-bold rounded-xl flex items-center gap-1.5 animate-scale-in">
                  <CheckCircle className="w-4 h-4" /> Address updated
                  successfully!
                </div>
              )}

              <form onSubmit={handleAddressSubmit(onAddressUpdate)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Contact Name"
                    placeholder="e.g. Jane Doe"
                    error={addressErrors.fullName?.message}
                    success={addressTouched.fullName && !addressErrors.fullName}
                    required
                    {...registerAddress("fullName")}
                  />

                  <Input
                    label="Contact Phone"
                    placeholder="e.g. +1 (555) 019-2834"
                    error={addressErrors.phone?.message}
                    success={addressTouched.phone && !addressErrors.phone}
                    required
                    {...registerAddress("phone")}
                  />
                </div>

                <Input
                  label="Street Address"
                  placeholder="e.g. 123 Market Street, Apt 4B"
                  error={addressErrors.street?.message}
                  success={addressTouched.street && !addressErrors.street}
                  required
                  {...registerAddress("street")}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    placeholder="San Francisco"
                    error={addressErrors.city?.message}
                    success={addressTouched.city && !addressErrors.city}
                    required
                    {...registerAddress("city")}
                  />

                  <Input
                    label="State"
                    placeholder="CA"
                    error={addressErrors.state?.message}
                    success={addressTouched.state && !addressErrors.state}
                    required
                    {...registerAddress("state")}
                  />

                  <Input
                    label="ZIP Code"
                    placeholder="94103"
                    error={addressErrors.zipCode?.message}
                    success={addressTouched.zipCode && !addressErrors.zipCode}
                    required
                    {...registerAddress("zipCode")}
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isUpdatingShipping}
                  className="w-full py-2.5 text-sm"
                >
                  Save Address Info
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
