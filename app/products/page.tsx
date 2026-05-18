import React from "react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60; 

// 🚀 FIXED: Update data fetching function to optionally filter by title, description, or category
async function getProducts(searchQuery?: string) {
  return await prisma.product.findMany({
    where: searchQuery
      ? {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            { category: { contains: searchQuery, mode: "insensitive" } },
          ],
        }
      : {}, // Returns all items if search parameter doesn't exist
    orderBy: { createdAt: "desc" },
  });
}

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

// 🚀 FIXED: Next.js pages can read incoming layout params directly via Server Component parameters
export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentSearch = resolvedSearchParams.search;
  
  const products = await getProducts(currentSearch);

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-gray-950">
          {currentSearch ? `Search Results for "${currentSearch}"` : "Our Collection"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {currentSearch 
            ? `Found ${products.length} item(s) matching your description query keywords.` 
            : "Explore our modular dynamic catalog selection."}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">No items match your query criteria in the system database right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}