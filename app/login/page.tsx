"use client";

import React, { useState, Suspense, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Reactive local state tracker
  const router = useRouter();
  
  const searchParams = useSearchParams();

  // Explicitly listen to URL param shifts on render mounting
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Account created successfully! Please sign in below.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Clear validation flags on new submission

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div>
        <h2 className="text-center text-3xl font-black tracking-tight text-gray-950">MONO.SHOP</h2>
        <p className="mt-2 text-center text-sm text-gray-500">Sign in to your dashboard account</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        
        {/* Dynamic Registration Success Banner */}
        {successMessage && (
          <div className="text-xs text-emerald-600 p-3 bg-emerald-50 rounded-lg mb-4 font-semibold border border-emerald-100">
            {successMessage}
          </div>
        )}

        {/* Dynamic Error Banner */}
        {error && (
          <div className="text-xs text-red-500 p-3 bg-red-50 rounded-lg mb-4 font-semibold border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 focus:bg-white transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 focus:bg-white transition-all"
          />
        </div>

        <button 
          type="submit" 
          className="w-full mt-4 bg-gray-950 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Sign In
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-950 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
      {/* Drop this right between password tracking or beneath submission button inside app/login/page.tsx */}
<div className="text-right">
  <Link href="/forgot-password" className="text-xs font-medium text-gray-500 hover:text-gray-950 hover:underline">
    Forgot password?
  </Link>
</div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<div className="text-sm text-gray-500 animate-pulse">Loading interface...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}