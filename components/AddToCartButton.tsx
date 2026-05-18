"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

// Define what properties this client button needs from the Prisma product row
interface AddToCartButtonProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: any; // Handles Prisma Decimal safely
    images: string[];
    stock: number;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    // Sanitize the database payload to match your CartContext requirements exactly
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: Number(product.price),
      image: product.images && product.images[0] ? product.images[0] : "/placeholder.jpg",
      stock: product.stock,
    });
  };

  return (
    <button
      type="button"
      disabled={product.stock === 0}
      onClick={handleAdd}
      className="w-full bg-gray-950 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer active:scale-[0.99] transition-transform"
    >
      {product.stock > 0 ? "Add to Shopping Cart" : "Item Sold Out"}
    </button>
  );
}