'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIPFrequency } from '@/types/calculator';

const tabs: { label: string; href: string; frequency: SIPFrequency }[] = [
  { label: 'Monthly', href: '/sip', frequency: 'monthly' },
  { label: 'Weekly', href: '/sip-weekly', frequency: 'weekly' },
  { label: 'Quarterly', href: '/sip-quarterly', frequency: 'quarterly' },
  { label: 'Yearly', href: '/sip-yearly', frequency: 'yearly' },
];

export default function SIPTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 