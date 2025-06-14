import { ROUTES } from '@/constants/routes';
import { redirect } from 'next/navigation';

export default function DefaultTaxCalculatorPage() {
    redirect(ROUTES.NEW_TAX_REGIME_2025_26);
} 