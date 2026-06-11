"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, MapPin, CheckCircle, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile, updateAddress } =
    useAuthStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Edit Forms States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Shipping Address States
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);
  const [shippingSuccess, setShippingSuccess] = useState(false);

  // Sync profile states
  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
      if (user.shippingAddress) {
        setShippingAddress(user.shippingAddress);
      }
    }
  }, [user]);

  if (!user || !isAuthenticated) {
    return (
      <div className="py-20 max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-955/20 text-rose-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
          Access Denied
        </h2>
        <p className="text-slate-500">
          Please sign in to view your profile panel dashboard.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 px-5 py-2.5 bg-indigo-650 text-white font-bold rounded-xl"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileSuccess(false);

    // Simulate API update
    await new Promise((resolve) => setTimeout(resolve, 650));
    updateProfile({ name, phone });
    setIsUpdatingProfile(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleShippingUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingShipping(true);
    setShippingSuccess(false);

    // Simulate API update
    await new Promise((resolve) => setTimeout(resolve, 650));
    updateAddress("shipping", shippingAddress);
    updateAddress("billing", shippingAddress); // Keep in sync for simple profile management
    setIsUpdatingShipping(false);
    setShippingSuccess(true);
    setTimeout(() => setShippingSuccess(false), 3000);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
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

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Email"
                value={user.email}
                disabled
                className="bg-slate-50 dark:bg-zinc-850 text-slate-400 cursor-not-allowed border-dashed"
              />

              <Input
                label="Phone Number"
                type="text"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
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

            <form onSubmit={handleShippingUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Name"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleShippingChange}
                  placeholder="e.g. Jane Doe"
                  required
                />

                <Input
                  label="Contact Phone"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleShippingChange}
                  placeholder="e.g. +1 (555) 019-2834"
                  required
                />
              </div>

              <Input
                label="Street Address"
                name="street"
                value={shippingAddress.street}
                onChange={handleShippingChange}
                placeholder="e.g. 123 Market Street, Apt 4B"
                required
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                  placeholder="San Francisco"
                  required
                />

                <Input
                  label="State"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleShippingChange}
                  placeholder="CA"
                  required
                />

                <Input
                  label="ZIP Code"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleShippingChange}
                  placeholder="94103"
                  required
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
  );
}
