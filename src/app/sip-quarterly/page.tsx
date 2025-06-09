import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';
import SIPCalculator from '@/components/calculators/SIPCalculator';
import SIPTabs from '@/components/calculators/SIPTabs';

export const metadata: Metadata = getMetadata({
  title: 'Quarterly SIP Calculator',
  description: 'Calculate your quarterly Systematic Investment Plan (SIP) returns with our easy-to-use calculator. Plan your investments and understand the power of compounding with mutual fund SIP calculations.',
  keywords: [
    'quarterly SIP calculator',
    'mutual fund calculator',
    'investment calculator',
    'systematic investment plan',
    'financial planning',
    'investment returns',
    'compound interest',
    'wealth calculator',
  ],
  canonicalUrl: '/sip-quarterly',
  pageType: 'calculator',
  calculatorType: 'SIP'
});

export default function QuarterlySIPCalculatorPage() {
  return (
    <div className="space-y-6">
      <SIPTabs />
      <SIPCalculator frequency="quarterly" />
    </div>
  );
} 