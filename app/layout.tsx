import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import Footer from "../components/Footer"; // Import the new Footer component

export const metadata = {
  title: "MOHU | Curated Minimalist Store",
  description: "Next-generation e-commerce platform built with Next.js & Prisma 7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>
          {/* The Header stays fixed at the top of every page */}
          <Header />
          
          {/* Padding prevents content from hiding behind the sticky header */}
          <div className="pt-16 min-h-[calc(100vh-4rem)]"> 
            {children}
          </div>
          
          <Footer />
        </Providers>
      </body>
    </html>
  );
}