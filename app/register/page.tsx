"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send payload to our backend registration API worker
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong during registration.");
      }

      // If registration succeeds, forward them straight to the login page
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-center text-3xl font-black tracking-tight text-gray-950">MONO.SHOP</h2>
          <p className="mt-2 text-center text-sm text-gray-500">Create your new store account</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-xs text-red-500 p-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-gray-50 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-gray-400 focus:bg-white transition-all"
            />
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Password</label>
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

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-gray-950 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* Link back to Login */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-gray-950 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}