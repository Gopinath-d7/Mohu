"use client";

import React from "react";

export default function Banner() {
  return (
    <div className="relative bg-gray-950 overflow-hidden my-6 rounded-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-sm">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-gray-400 rounded-full blur-3xl"></div>
      </div>

      {/* Content Layout */}
      <div className="relative max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-gray-950 uppercase tracking-wider">
            Limited Time Only
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            The Design Essentials Collection
          </h2>
          <p className="max-w-xl text-sm text-gray-300 leading-relaxed">
            Upgrade your daily workspace architecture. Get up to <span className="text-white font-bold">20% off</span> our premium minimalist tech accessories and leather carrying goods this week.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="flex-shrink-0">
          <button 
            onClick={() => alert("Redirecting to collection...")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-gray-950 bg-white hover:bg-gray-100 transition-colors shadow-sm focus:outline-none"
          >
            Explore Collection
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}