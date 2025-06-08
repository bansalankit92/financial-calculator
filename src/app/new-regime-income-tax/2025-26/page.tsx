import NewRegimeIncomeTaxCalculatorFY2025_26 from '@/components/NewRegimeIncomeTaxCalculatorFY2025_26';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New Tax Regime Calculator FY 2025-26 | Next Year',
    description: 'Calculate your income tax under the new tax regime for FY 2025-26. Includes standard deduction of ₹75,000 and tax rebate up to ₹60,000 for income up to ₹12L.',
};

export default function TaxCalculator2025_26Page() {
    return <NewRegimeIncomeTaxCalculatorFY2025_26 />;
} 