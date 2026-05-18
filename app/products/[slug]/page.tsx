import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton"; // 🚀 IMPORT THE NEW CLIENT BUTTON

interface ProductViewProps {
  params: Promise<{ slug: string }>;
}

async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
  });
}

export default async function SingleProductPage({ params }: ProductViewProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound(); 
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <Link href="/products" className="text-xs font-semibold text-gray-500 hover:text-gray-950 transition-colors">
          &larr; Back to Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Gallery Window */}
        <div className="bg-gray-50 aspect-square rounded-2xl overflow-hidden border border-gray-100">
          <img
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Informational Breakdown Action Center */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
            <h1 className="text-3xl font-black tracking-tight text-gray-950 mt-1">{product.name}</h1>
            {/* Convert Prisma Decimal to number safely for representation */}
            <p className="text-2xl font-black text-gray-950 mt-2">${Number(product.price).toFixed(2)}</p>
          </div>

          <div className="border-t border-b border-gray-100 py-4">
            <h3 className="text-xs font-bold uppercase text-gray-400 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Availability Status:</span>
              <span className={`font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                {product.stock > 0 ? `${product.stock} units left in inventory` : "Out of Stock"}
              </span>
            </div>

            {/* 🚀 REPLACED: Static button is swapped with the reactive client component */}
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}