'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'SIP Calculator', href: '/' },
  { name: 'EMI Calculator', href: '/emi' },
  { name: 'Old vs New Regime Income Tax', href: '/tax-comparison' },
  { name: '(New Regime) Income Tax', href: '/new-regime-income-tax/2024-25' },
  { name: '(Old Regime) Income Tax', href: '/old-regime-income-tax' },
  { name: 'Salary Calculator', href: '/salary' },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    }

    // Only add the event listener if the sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) {
      onToggle();
    }
  }, [pathname, onToggle, isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden z-20" 
          aria-hidden="true"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        id="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Close button - only show on mobile */}
          <div className="px-4 h-16 flex items-center justify-between lg:hidden">
            <button
              type="button"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={onToggle}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2 text-sm rounded-lg",
                  pathname === item.href
                    ? "bg-gray-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 