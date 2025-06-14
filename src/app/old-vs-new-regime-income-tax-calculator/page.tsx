import OldVsNewRegimeCalculator from '@/components/OldVsNewRegimeCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Old vs New Regime Calculator - Indian Tax Calculator',
    description: 'Compare your income tax liability under old and new tax regimes. Calculate and compare tax savings between both regimes for FY 2024-25.',
};

export default function Page() {
    return <OldVsNewRegimeCalculator />;
} 