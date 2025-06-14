import SalaryCalculator from '@/components/SalaryCalculator';
import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';
import Link from 'next/link';

export const metadata: Metadata = getMetadata({
  title: 'Salary Calculator (In-Hand & Take Home) | FY 2025-26',
  description: 'Calculate your in-hand and take home salary after tax and deductions for both old and new regimes. Includes standard deduction, PF, EPF, gratuity, professional tax, and more. Updated for FY 2025-26.',
  keywords: [
    'salary calculator',
    'in-hand salary',
    'take home salary',
    'ctc to in hand',
    'income tax calculator',
    'new regime salary',
    'old regime salary',
    'standard deduction',
    'professional tax',
    'PF',
    'EPF',
    'gratuity',
    'tax planning',
    'salary breakup',
    'salary structure',
    'financial calculator',
    'FY 2025-26',
    'AY 2026-27'
  ],
  canonicalUrl: '/salary-calculator',
  pageType: 'calculator',
  calculatorType: 'TAX'
});

export default function SalaryCalculatorPage() {
  return (
    <>
      <SalaryCalculator />
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-blue-50 rounded-lg text-gray-800 text-base">
        <h2 className="text-xl font-semibold mb-2">About the Salary Calculator</h2>
        <p className="mb-2">
          This salary calculator helps you estimate your in-hand and take home salary after all statutory deductions and income tax, for both the old and new tax regimes. It considers standard deduction, PF, EPF, gratuity, professional tax, and employer NPS (for new regime).
        </p>
        <p className="mb-2">
          <b>How to use:</b> Enter your CTC, select the tax regime, and fill in any applicable deductions. The calculator will show your gross, take home, and in-hand salary, along with a detailed breakdown.
        </p>
        <p className="mb-2">
          <b>Tip:</b> If you want to compare your tax and take home under both regimes, try our{' '}
          <Link href="/old-vs-new-regime-income-tax-calculator" className="text-blue-700 underline font-semibold">Old vs New Regime Calculator</Link>.
        </p>
        <p>
          Updated for FY 2025-26 as per latest Budget. For more details on tax rules, see the official <a href="https://incometaxindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Income Tax India</a> website.
        </p>
      </div>
    </>
  );
} 