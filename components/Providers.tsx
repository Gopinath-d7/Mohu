"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext"; // 🚀 Import your custom cart engine

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* 🛒 Nested custom cart layout engine wrapper */}
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}