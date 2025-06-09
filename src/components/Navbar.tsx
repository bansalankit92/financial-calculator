'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const calculators = [
  { name: 'Home', href: '/' },
  { name: 'SIP Calculator', href: '/sip' },
  { name: 'EMI Calculator', href: '/emi' },
  { name: 'New Tax Regime', href: '/new-regime-income-tax/2024-25' },
  { name: 'Old Tax Regime', href: '/old-regime-income-tax' },
  { name: 'Old vs New Regime', href: '/tax-comparison' },
  { name: 'Salary Calculator', href: '/salary' },
];

export default function Navbar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Financial Calculator
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {calculators.map((calculator) => (
                      <Menu.Item key={calculator.href}>
                        {({ active }) => (
                          <Link
                            href={calculator.href}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                          >
                            {calculator.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}

function getPageTitle(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/sip':
      return 'SIP Calculator';
    case '/emi':
      return 'EMI Calculator';
    case '/tax-comparison':
      return 'Old vs New Regime Income Tax';
    case '/new-regime-income-tax/2024-25':
      return 'New Tax Regime Calculator FY 2024-25';
    case '/new-regime-income-tax/2025-26':
      return 'New Tax Regime Calculator FY 2025-26';
    case '/old-tax':
      return 'Old Regime Income Tax';
    case '/salary':
      return 'Salary Calculator';
    default:
      return 'Financial Calculator';
  }
} 