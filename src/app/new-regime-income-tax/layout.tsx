'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ShareIcon } from '@heroicons/react/24/outline';

const tabs = [
    { name: 'FY 2024-25 (AY Current)', href: '/new-regime-income-tax/2024-25' },
    { name: 'FY 2025-26 (AY Next Year)', href: '/new-regime-income-tax/2025-26' },
];

export default function TaxCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `New Tax Regime Calculator ${pathname.includes('2024-25') ? 'FY 2024-25' : 'FY 2025-26'}`,
                url: window.location.href,
            });
        }
    };

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="border-b border-gray-200 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex -mb-px">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`py-4 px-6 text-sm font-medium ${
                                    pathname === tab.href
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>
                    <button
                        onClick={handleShare}
                        className="p-2 text-gray-400 hover:text-gray-500"
                        title="Share"
                    >
                        <ShareIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="py-6">
                {children}
            </div>
        </main>
    );
} 