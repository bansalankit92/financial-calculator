import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';

export const metadata: Metadata = getMetadata({
  title: 'Old Regime Income Tax Calculator India',
  description: 'Calculate your income tax under the Old Tax Regime with our comprehensive calculator. Includes all deductions, exemptions, and tax slabs as per Indian tax laws.',
  keywords: [
    'old regime calculator',
    'income tax calculator',
    'tax deductions',
    'HRA exemption',
    'section 80C',
    'tax planning',
    'indian tax calculator',
    'old tax regime',
    'tax slab calculator',
    'income tax india'
  ],
  canonicalUrl: '/old-regime-income-tax'
});

export default function OldRegimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 