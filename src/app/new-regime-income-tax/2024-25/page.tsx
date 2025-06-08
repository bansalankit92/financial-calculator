import NewRegimeIncomeTaxCalculatorFY2024_25 from '@/components/NewRegimeIncomeTaxCalculatorFY2024_25';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New Tax Regime Calculator FY 2024-25 | Current Year',
    description: 'Calculate your income tax under the new tax regime for FY 2024-25. Includes standard deduction of ₹75,000 and tax rebate up to ₹25,000 for income up to ₹7L.',
};

export default function TaxCalculator2024_25Page() {
    return <NewRegimeIncomeTaxCalculatorFY2024_25 />;
} 