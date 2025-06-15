'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-4 lg:p-8">{children}</main>
      <Footer />
    </div>
  );
} 