import NewRegimeIncomeTaxCalculatorFY2024_25 from '@/components/NewRegimeIncomeTaxCalculatorFY2024_25';
import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/components/common/PageMetadata';

export const metadata: Metadata = getMetadata({
    title: 'New Tax Regime Calculator FY 2024-25 | Current Year',
    description: 'Calculate your income tax under the new tax regime for FY 2024-25. Includes standard deduction of ₹75,000, NPS deduction under 80CCD(2), and tax rebate up to ₹25,000 for income up to ₹7L.',
    keywords: [
        'income tax calculator 2024-25',
        'new tax regime calculator',
        'tax calculator FY 2024-25',
        'income tax india',
        'standard deduction calculator',
        'NPS tax calculator',
        'section 80CCD(2)',
        'tax rebate calculator',
        'salary tax calculator',
        'income tax slabs 2024-25',
        'tax planning',
        'education cess calculation'
    ],
    canonicalUrl: '/new-regime-income-tax/2024-25',
    pageType: 'calculator',
    calculatorType: 'TAX'
});

export default function TaxCalculatorPage() {
    return <NewRegimeIncomeTaxCalculatorFY2024_25 />;
} 