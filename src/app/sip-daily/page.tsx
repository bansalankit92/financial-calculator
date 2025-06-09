'use client';

import { Suspense } from 'react';
import SIPCalculator from '@/components/calculators/SIPCalculator';
import SIPTabs from '@/components/calculators/SIPTabs';

export default function DailySIPCalculatorPage() {
  return (
    <div className="space-y-6">
      <SIPTabs />
      <Suspense fallback={<div>Loading calculator...</div>}>
        <SIPCalculator frequency="daily" />
      </Suspense>
    </div>
  );
} 