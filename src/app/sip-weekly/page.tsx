import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';
import SIPCalculator from '@/components/calculators/SIPCalculator';
import SIPTabs from '@/components/calculators/SIPTabs';

export const metadata: Metadata = getMetadata({
  title: 'Weekly SIP Calculator',
  description: 'Calculate your weekly Systematic Investment Plan (SIP) returns with our easy-to-use calculator. Plan your investments and understand the power of compounding with mutual fund SIP calculations.',
  keywords: [
    'weekly SIP calculator',
    'mutual fund calculator',
    'investment calculator',
    'systematic investment plan',
    'financial planning',
    'investment returns',
    'compound interest',
    'wealth calculator',
  ],
  canonicalUrl: '/sip-weekly',
  pageType: 'calculator',
  calculatorType: 'SIP'
});

export default function WeeklySIPCalculatorPage() {
  return (
    <div className="space-y-6">
      <SIPTabs />
      <SIPCalculator frequency="weekly" />
    </div>
  );
} 