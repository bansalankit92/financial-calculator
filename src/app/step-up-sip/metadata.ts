import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';

export const metadata: Metadata = getMetadata({
  title: 'Step-Up SIP Calculator',
  description: 'Calculate your Step-Up Systematic Investment Plan (SIP) returns with our easy-to-use calculator. Plan your investments with yearly or monthly step-ups to maximize returns with mutual fund SIP calculations.',
  keywords: [
    'step-up SIP calculator',
    'step up SIP',
    'mutual fund calculator',
    'investment calculator',
    'systematic investment plan',
    'financial planning',
    'investment returns',
    'compound interest',
    'wealth calculator',
    'step-up investment',
    'annual step-up SIP',
    'monthly step-up SIP',
  ],
  canonicalUrl: '/step-up-sip',
  pageType: 'calculator',
  calculatorType: 'SIP'
});
