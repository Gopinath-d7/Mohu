"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const token = searchParams.get("token");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password.");

      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <div>
        <h2 className="text-center text-2xl font-black tracking-tight text-gray-950">Choose a New Password</h2>
        <p className="mt-2 text-center text-sm text-gray-500">Update your account credentials safely</p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {success && (
          <div className="text-xs text-emerald-600 p-3 bg-emerald-50 rounded-lg">
            Password updated successfully! Redirecting to login...
          </div>
        )}
        {error && <div className="text-xs text-red-500 p-3 bg-red-50 rounded-lg">{error}</div>}

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">New Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 focus:bg-white transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">Confirm New Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 focus:bg-white transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="w-full mt-4 bg-gray-950 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={<div className="text-sm text-gray-500 animate-pulse">Loading secure session...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}