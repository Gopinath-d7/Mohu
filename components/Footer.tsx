"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Top Section: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-100">
          
          {/* Column 1: Brand Intro */}
          <div className="space-y-4">
            <h3 className="text-sm font-black tracking-widest text-gray-950">MOHU</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Crafting a curated marketplace for premium minimalist lifestyle goods. Engineered for simplicity and quality.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-950 uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/products" className="hover:text-gray-950 transition-colors">All Products</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-gray-950 transition-colors">New Arrivals</Link></li>
              <li><Link href="/categories" className="hover:text-gray-950 transition-colors">Featured Collections</Link></li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-950 uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="#" className="hover:text-gray-950 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-gray-950 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-gray-950 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Field */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-gray-950 uppercase tracking-wider">Join our Newsletter</h4>
            <p className="text-xs text-gray-500">Subscribe to get special offers and first looks.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-gray-50 text-xs px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-gray-400 focus:bg-white transition-all"
              />
              <button className="bg-gray-950 text-white text-xs px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section: Copyright & Payment Graphics */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-400">
            &copy; {new Date().getFullYear()} MONO.SHOP. All rights reserved. Built with Next.js, Prisma 7 & Neon.
          </p>
          
          {/* Payment Badges Placeholder row */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-[10px] uppercase font-mono tracking-wider border border-gray-200 px-1.5 py-0.5 rounded bg-gray-50">Visa</span>
            <span className="text-[10px] uppercase font-mono tracking-wider border border-gray-200 px-1.5 py-0.5 rounded bg-gray-50">Mastercard</span>
            <span className="text-[10px] uppercase font-mono tracking-wider border border-gray-200 px-1.5 py-0.5 rounded bg-gray-50">Stripe</span>
          </div>
        </div>

      </div>
    </footer>
  );
}