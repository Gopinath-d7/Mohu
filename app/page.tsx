import { prisma } from "@/lib/prisma";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch (error) {
    console.error("HOMEPAGE_FETCH_ERROR:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO BANNER */}
        <Banner />

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No products found. Did the database seed successfully?
            </p>
          </div>
        ) : (
          /* Clean, optimized product grid matching your Tailwind layout specifications */
          <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              /* 
                🚀 FIXED: Replaced the old broken manual HTML card with your 
                reusable component that cleanly reads product.images[0]
              */
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}