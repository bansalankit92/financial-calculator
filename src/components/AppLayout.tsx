'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto p-4 lg:p-8 w-full">{children}</main>
      <Footer />
    </div>
  );
} 