
import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';

export const metadata: Metadata = getMetadata({
  title: 'Yearly SIP Calculator',
  description: 'Calculate your yearly Systematic Investment Plan (SIP) returns with our easy-to-use calculator. Plan your investments and understand the power of compounding with mutual fund SIP calculations.',
  keywords: [
    'yearly SIP calculator',
    'mutual fund calculator',
    'investment calculator',
    'systematic investment plan',
    'financial planning',
    'investment returns',
    'compound interest',
    'wealth calculator',
  ],
  canonicalUrl: '/sip-yearly',
  pageType: 'calculator',
  calculatorType: 'SIP'
}); 