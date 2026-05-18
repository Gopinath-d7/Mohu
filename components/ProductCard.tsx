"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@prisma/client";
import { useCart } from "../context/CartContext"; 

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const productUrl = `/products/${product.slug}`;

  // 🚀 CUSTOM WRAPPER TO DIAGNOSE & EXECUTE SAFE ADD TO CART ACTIONS
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Completely stop any parent element links from intercepting the button tap
    e.preventDefault();
    e.stopPropagation();

    try {
      /* 
        2. SANITIZE INTERNALS: Prisma 7 Decimal values or null fields can sometimes crash state reducers.
        We format the product payload here so it perfectly satisfies standard cart expectations.
      */
      const sanitizedProduct = {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(product.price), // Force format decimals explicitly to javascript floating numbers
        image: product.images && product.images[0] ? product.images[0] : "/placeholder.jpg",
        stock: product.stock,
      };

      console.log("🛒 Sending sanitized item payload to engine:", sanitizedProduct);
      
      // @ts-ignore - Temporary pass if your Context types are tightly strict
      addToCart(sanitizedProduct);
      
    } catch (error) {
      console.error("❌ Add to cart failed execution context:", error);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      
      {/* Product Image Link Frame */}
      <Link 
        href={productUrl} 
        className="aspect-square w-full bg-gray-50 relative overflow-hidden block cursor-pointer"
      >
        <img
          src={product.images && product.images[0] ? product.images[0] : "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
            OUT OF STOCK
          </span>
        )}
      </Link>

      {/* Product Content Meta Box */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
          {product.category}
        </span>
        
        {/* Title Text Navigation Link */}
        <h3 className="mt-1 text-sm font-bold text-gray-950 line-clamp-2">
          <Link href={productUrl} className="hover:underline cursor-pointer">
            {product.name}
          </Link>
        </h3>
        
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
        
        {/* Bottom Interactive Area */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-base font-black text-gray-950">
            ${Number(product.price).toFixed(2)}
          </p>
          
          {/* 🚀 FIXED HARDENED CLICK ACTION HANDLER */}
          <button 
            type="button"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className="text-xs bg-gray-950 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer shadow-sm active:scale-95 relative z-30"
          >
            {product.stock > 0 ? "Add" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}