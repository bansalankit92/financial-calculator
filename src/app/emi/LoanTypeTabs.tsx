'use client';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Home Loan', href: ROUTES.EMI_HOME_LOAN },
  { name: 'Car Loan', href: ROUTES.EMI_CAR_LOAN },
  { name: 'Educational Loan', href: ROUTES.EMI_EDU_LOAN },
  { name: 'Personal Loan', href: ROUTES.EMI_PERSONAL_LOAN },
];

export default function LoanTypeTabs() {
  const pathname = usePathname();
  return (
    <div className="relative mb-6">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max border-b border-gray-200 pb-2">
          {tabs.map(tab => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 py-2 text-sm sm:text-base rounded-t-lg font-medium transition-colors duration-150 whitespace-nowrap ${
                pathname === tab.href 
                  ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 