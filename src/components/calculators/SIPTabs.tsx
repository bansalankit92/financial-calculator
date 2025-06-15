'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIPFrequency } from '@/types/calculator';
import { ROUTES } from '@/constants/routes';

const tabs: { label: string; href: string; frequency: SIPFrequency }[] = [
  { label: 'Daily', href: ROUTES.SIP_DAILY, frequency: 'daily' },
  { label: 'Weekly', href: ROUTES.SIP_WEEKLY, frequency: 'weekly' },
  { label: 'Monthly', href: ROUTES.SIP_MONTHLY, frequency: 'monthly' },
  { label: 'Quarterly', href: ROUTES.SIP_QUARTERLY, frequency: 'quarterly' },
  { label: 'Yearly', href: ROUTES.SIP_YEARLY, frequency: 'yearly' },
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