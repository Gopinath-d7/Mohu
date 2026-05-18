"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // 🚀 Import Next.js routing utilities
import { useSession, signOut } from "next-auth/react";
import { useCart } from "../context/CartContext"; 

export default function Header() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { totalItems } = useCart(); 
  
  // 🚀 FIXED: Initialize routing state hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // 🚀 FIXED: Trigger route switch when user submits search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/products"); // Reset if they clear the input box
    }
  };

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-black tracking-widest text-gray-950 hover:opacity-80 transition-opacity">
              MOHU
            </Link>
          </div>

          {/* 2. Main Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link href="/products" className="hover:text-gray-950 transition-colors">
              Shop All
            </Link>
            <Link href="/new-arrivals" className="hover:text-gray-950 transition-colors">
              New Arrivals
            </Link>
            <Link href="/categories" className="hover:text-gray-950 transition-colors">
              Categories
            </Link>
          </div>

          {/* 3. Global Search Bar Field */}
          {/* 🚀 FIXED: Wrapped input in a form tag to easily capture the "Enter" submit event */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state text live
                placeholder="Search premium goods..."
                className="w-full bg-gray-50 text-sm text-gray-900 pl-10 pr-4 py-2 rounded-full border border-gray-200 outline-none focus:border-gray-400 focus:bg-white transition-all"
              />
              <div className="absolute left-3.5 top-2.5 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>
          </form>

          {/* 4. Action Icons Panel (Cart & Profile) */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-950 transition-colors rounded-full hover:bg-gray-50 cursor-pointer block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm7.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-950 text-[10px] font-bold text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {status === "loading" ? (
              <div className="h-8 w-8 bg-gray-100 animate-pulse rounded-full" />
            ) : session ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="h-8 w-8 bg-gray-950 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm hover:bg-gray-800 focus:outline-none cursor-pointer">
                  {userInitial}
                </button>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account</p>
                        <p className="text-sm font-semibold text-gray-950 truncate">{session.user?.name || "User"}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                      </div>
                      <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium">
                        Dashboard Panel
                      </Link>
                      <button onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: "/login" }); }} className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium border-t border-gray-50 cursor-pointer">
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <Link href="/login" className="text-xs font-semibold text-gray-700 hover:text-gray-950 px-2.5 py-2 rounded-lg">Sign In</Link>
                <Link href="/register" className="hidden sm:inline-block text-xs font-semibold bg-gray-950 text-white hover:bg-gray-800 px-3 py-2 rounded-lg shadow-sm">Sign Up</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}