import React from "react";
import FaqAccordion from "@/components/FaqAccordion";
import Link from "next/link";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 py-20 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        
        {/* Title Block Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white border px-2.5 py-1 rounded-full shadow-sm">
            Help Center
          </span>
          <h1 className="text-3xl font-black text-gray-950 tracking-tight mt-3">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-gray-500 mt-1.5 max-w-md mx-auto">
            Got questions about orders, secure checkouts, or catalog updates? Find your answers below.
          </p>
        </div>

        {/* Render Accordion Component */}
        <FaqAccordion />

        {/* Contact Footer Alternative */}
        <div className="text-center mt-12 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Still looking for clarification instances?{" "}
            <Link href="/contact" className="text-gray-950 font-bold hover:underline">
              Contact Support Interface &rarr;
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}