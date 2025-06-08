import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = getMetadata({
  title: 'Free Financial Calculators for Tax, SIP, EMI & Salary',
  description: 'Comprehensive suite of financial calculators for Indian taxpayers. Calculate income tax under new regime, SIP returns, EMI payments, and in-hand salary with our easy-to-use tools.',
  keywords: [
    'financial calculator',
    'income tax calculator',
    'new tax regime calculator',
    'SIP calculator',
    'EMI calculator',
    'salary calculator',
    'tax planning india',
    'investment calculator',
    'loan EMI calculator',
    'mutual fund calculator',
    'NPS calculator',
    'standard deduction calculator',
    'tax rebate calculator'
  ],
  canonicalUrl: '/',
  pageType: 'homepage'
});

export default function HomePage() {
  return <HomeContent />;
}
