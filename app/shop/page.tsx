import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard"; // 🚀 Clean reuse implementation

// Fetch all items from your Neon database pool
async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: "asc" }, // Organizes products alphabetically
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    return [];
  }
}

export default async function ShopAllPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Section Title */}
        <div className="border-b border-gray-200 pb-5 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Shop All Products
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Showing our complete curated collection of premium goods ({products.length} items).
          </p>
        </div>

        {/* Product Catalog Display Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-500">No products found in the catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              /* 
                🚀 FIXED: Replaced the entire broken manual HTML block 
                with your strongly-typed reusable component.
              */
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}