import React from "react";
import Link from "next/link";

// Static mock categories layout pointing back to your main shop or future sub-routes
const categoriesList = [
  {
    id: "tech",
    name: "Workspace Tech",
    description: "Mechanical keyboards, audio accessories, and desk hardware setups.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "bags",
    name: "Carrying Goods",
    description: "Premium leather backpacks, travel organizers, and minimalist sleeves.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "lifestyle",
    name: "Minimalist Essentials",
    description: "Curated daily carry accessories designed for ultimate simplicity.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
  }
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="border-b border-gray-200 pb-5 mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Browse by Category
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Explore collections tailored around your everyday lifestyle.
          </p>
        </div>

        {/* Categories Grid Setup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoriesList.map((category) => (
            <Link 
              href="/shop" 
              key={category.id}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-end p-6 text-white"
            >
              {/* Background Image Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient tint fallback to make overlay texts easily readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/40 to-transparent" />
              </div>

              {/* Text Layout context layer */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-xl font-bold tracking-tight">{category.name}</h3>
                <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed">{category.description}</p>
                <span className="inline-flex items-center text-xs font-semibold pt-2 text-white group-hover:underline">
                  Browse Collection &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}