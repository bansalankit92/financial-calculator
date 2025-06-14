import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';
import OldRegimeIncomeTaxCalculator from '@/components/OldRegimeIncomeTaxCalculator';

export const metadata: Metadata = getMetadata({
  title: 'Old Regime Income Tax Calculator | AY 2024-25',
  description: 'Calculate your income tax under the Old Tax Regime. This calculator includes all deductions like 80C, 80D, HRA, and more with detailed tax breakdown.',
  keywords: [
    'old regime tax calculator',
    'income tax calculator',
    'old tax regime',
    'section 80C deductions',
    'HRA exemption',
    'tax planning india',
    'tax calculator',
    'old vs new tax regime',
    'tax deductions calculator',
    'standard deduction calculator'
  ],
  canonicalUrl: '/old-regime-income-tax'
});

export default function OldRegimeTaxCalculatorPage() {
  return (
    <div className="container mx-auto py-6">
      <OldRegimeIncomeTaxCalculator />
    </div>
  );
} 