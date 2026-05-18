import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard"; // 🚀 Clean reuse implementation

async function getNewArrivals() {
  try {
    // Fetch the 10 newest products based on creation timestamp
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
    return [];
  }
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-gray-200 pb-5 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            New Arrivals
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Freshly added premium essentials to upgrade your collection.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-gray-100">
            <p className="text-lg text-gray-500">No new arrivals at the moment.</p>
          </div>
        ) : (
          /* Optimized UI layout framework matching the rest of the store grid instances */
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              /* 
                🚀 FIXED: Dropped the broken manual layout and passed your 
                strongly-typed schema straight into the reusable component.
              */
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}