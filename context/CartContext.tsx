"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 🚀 UPDATED: This matches the sanitized object structure coming from your card button
export interface SanitizedProduct {
  id: string;
  slug: string;
  name: string;
  price: number; 
  image: string;
  stock: number;
}

export interface CartItem {
  product: SanitizedProduct; // Uses the clean format
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: SanitizedProduct) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("mohu_custom_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed parsing cart storage:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mohu_custom_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Action: Add Item
  const addToCart = (product: SanitizedProduct) => {
    setCartItems((prevItems) => {
      // 🚀 FIXED: Safely matches the item ID keys
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  // Action: Remove Item
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  // Action: Update Quantity
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  // 🚀 FIXED: Dynamically calculates metrics without needing Prisma casting steps here
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}