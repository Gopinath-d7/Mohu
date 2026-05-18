"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CustomCartPage() {
  const { cartItems, updateCartQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className="min-h-screen bg-gray-50 p-12 text-xs font-semibold text-gray-400">Syncing checkout instance...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50/60 py-12 px-4 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-black text-gray-950 tracking-tight mb-8">Shopping Bag</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-400 mb-4">Your personalized cart matrix is currently completely clean.</p>
          <Link href="/" className="text-xs bg-gray-950 text-white px-4 py-2.5 rounded-xl font-bold">
            Explore Storefront
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              /* 
                🚀 DEFENSIVE RESOLUTION: Extract the image path safely.
                Checks for item.product.image first, then falls back to check if an array named images exists,
                before finally falling back to a global online placeholder asset if all else fails.
              */
              const displayImage = 
                item.product.image || 
                (item.product as any).images?.[0] || 
                "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80";

              return (
                <div key={item.product.id} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 items-center shadow-sm">
                  
                  {/* 🚀 UPDATED WITH BULLETPROOF FALLBACK */}
                  <img
                    src={displayImage}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-50 border flex-shrink-0"
                    onError={(e) => {
                      // Final safety valve: If the image source breaks or 404s, replace it with a valid placeholder
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=200&q=80";
                    }}
                  />
                  
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-bold text-gray-950 truncate hover:underline">
                      <Link href={`/products/${item.product.slug}`}>
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-sm font-black text-gray-950 mt-0.5">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Operations Interface Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs font-black hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-950">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs font-black hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              );
            })}
            
            <div className="pt-2">
              <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors cursor-pointer">
                Reset Custom Bag State
              </button>
            </div>
          </div>

          {/* Balance Summary Card */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6">
            <h2 className="text-base font-black text-gray-950 tracking-tight border-b pb-3">Checkout Balance</h2>
            <div className="space-y-2.5 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-950">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="text-emerald-600 font-bold uppercase tracking-wider">Complementary</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 flex justify-between text-sm font-black text-gray-950">
              <span>Grand Estimated Total</span>
              <span className="text-base font-black">${totalPrice.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-gray-950 text-white py-3 rounded-xl text-xs font-bold hover:bg-gray-900 transition-colors uppercase tracking-wider shadow-sm">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}