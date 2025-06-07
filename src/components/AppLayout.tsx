'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 1024;
    setIsSidebarOpen(isLargeScreen);

    function handleResize() {
      const isLarge = window.innerWidth >= 1024;
      setIsSidebarOpen(isLarge);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
} 