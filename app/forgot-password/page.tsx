"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setMessage("If an account exists, a reset link has been sent to your email.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-center text-2xl font-black tracking-tight text-gray-950">Reset Password</h2>
          <p className="mt-2 text-center text-sm text-gray-500">Enter your email to receive a recovery link</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {message && <div className="text-xs text-emerald-600 p-3 bg-emerald-50 rounded-lg">{message}</div>}
          {error && <div className="text-xs text-red-500 p-3 bg-red-50 rounded-lg">{error}</div>}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gray-950 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-gray-950 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}