'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const calculators = [
  { name: 'Home', href: ROUTES.HOME },
  { name: 'Blog', href: ROUTES.BLOG },
  { name: 'Old vs New Regime', href: ROUTES.OLD_VS_NEW_REGIME },
  { name: 'New Tax Regime (2025-26)', href: ROUTES.NEW_TAX_REGIME_2025_26 },
  { name: 'Old Tax Regime', href: ROUTES.OLD_TAX_REGIME },
  { name: 'SIP Calculator', href: ROUTES.SIP },
  { name: 'Step-Up SIP Calculator', href: ROUTES.STEP_UP_SIP },
  { name: 'EMI Calculator', href: ROUTES.EMI },
  { name: 'Salary Calculator', href: ROUTES.SALARY },
  { name: 'Contact / Feedback', href: ROUTES.CONTACT },
];

export default function Navbar() {
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
                <Menu.Items className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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