'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Home Loan', href: '/emi/home-loan' },
  { name: 'Car Loan', href: '/emi/car-loan' },
  { name: 'Educational Loan', href: '/emi/edu-loan' },
  { name: 'Personal Loan', href: '/emi/personal-loan' },
];

export default function LoanTypeTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200">
      {tabs.map(tab => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors duration-150 ${pathname === tab.href ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
} 