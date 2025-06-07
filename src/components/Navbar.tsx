'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onMenuClick?: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="px-4 md:px-8 h-16 flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
          aria-controls="sidebar"
          aria-expanded={isSidebarOpen}
        >
          <span className="sr-only">{isSidebarOpen ? "Close menu" : "Open menu"}</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
    </nav>
  );
}

function getPageTitle(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'SIP Calculator';
    case '/emi':
      return 'EMI Calculator';
    case '/tax-comparison':
      return 'Old vs New Regime Income Tax';
    case '/new-tax':
      return 'New Regime Income Tax';
    case '/old-tax':
      return 'Old Regime Income Tax';
    case '/salary':
      return 'Salary Calculator';
    default:
      return 'Financial Calculator';
  }
} 