import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';
import SIPCalculatorClient from './SIPCalculatorClient';

export const metadata: Metadata = getMetadata({
  title: 'SIP Calculator',
  description: 'Calculate your Systematic Investment Plan (SIP) returns with our easy-to-use calculator. Plan your investments and understand the power of compounding with mutual fund SIP calculations.',
  keywords: [
    'SIP calculator',
    'mutual fund calculator',
    'investment calculator',
    'systematic investment plan',
    'financial planning',
    'investment returns',
    'compound interest',
    'wealth calculator',
  ],
  canonicalUrl: '/sip',
  pageType: 'calculator',
  calculatorType: 'SIP'
});

export default function SIPCalculatorPage() {
  return <SIPCalculatorClient />;
} 