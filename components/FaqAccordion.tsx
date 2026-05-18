"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What are your standard shipping and delivery timelines?",
    answer: "We offer complimentary standard delivery on all domestic orders. Orders are typically processed within 1-2 business days, and shipping takes anywhere between 3-5 business days depending on your location.",
  },
  {
    question: "How can I track my package or modify my shipping address?",
    answer: "Once your items ship, an automated delivery confirmation with a secure tracking link will hit your inbox. If you need to update an incorrect delivery matrix address, please contact our support desk immediately before processing completion.",
  },
  {
    question: "What is your baseline returns and workspace exchange policy?",
    answer: "We accept returns on all premium items within 30 days of receipt, provided they are unused, unaltered, and retained inside their original customized packaging. Return shipping labels are completely free.",
  },
  {
    question: "Are payment instances handled securely through your platform?",
    answer: "Absolutely. All transactions run through end-to-end encrypted gateways. We never save or store raw financial records or credit card details directly inside our application database.",
  },
];

export default function FaqAccordion() {
  // Track which accordion panel index is currently expanded (null means all are collapsed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {faqData.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-200"
          >
            {/* Accordion Header / Trigger Button */}
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-gray-950 hover:bg-gray-50/50 transition-colors cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="pr-4 tracking-tight">{faq.question}</span>
              <span
                className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-gray-950" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>

            {/* Accordion Content Panel */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-xs text-gray-500 leading-relaxed antialiased">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}