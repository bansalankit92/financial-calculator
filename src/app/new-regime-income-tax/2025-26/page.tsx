import NewRegimeIncomeTaxCalculatorFY2025_26 from '@/components/NewRegimeIncomeTaxCalculatorFY2025_26';
import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';

export const metadata: Metadata = getMetadata({
    title: 'New Tax Regime Calculator FY 2025-26 | Next Year',
    description: 'Calculate your income tax under the new tax regime for FY 2025-26. Includes standard deduction of ₹75,000, NPS deduction under 80CCD(2), and tax rebate up to ₹60,000 for income up to ₹12L.',
    keywords: [
        'income tax calculator 2025-26',
        'new tax regime calculator',
        'tax calculator FY 2025-26',
        'income tax india',
        'standard deduction calculator',
        'NPS tax calculator',
        'section 80CCD(2)',
        'tax rebate calculator',
        'salary tax calculator',
        'income tax slabs 2025-26',
        'tax planning',
        'education cess calculation'
    ],
    canonicalUrl: '/new-regime-income-tax/2025-26',
    pageType: 'calculator',
    calculatorType: 'TAX'
});

export default function TaxCalculatorPage() {
    return <NewRegimeIncomeTaxCalculatorFY2025_26 />;
} 