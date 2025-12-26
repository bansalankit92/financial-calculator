'use client';

import { Suspense } from 'react';
import StepUpSIPCalculator from '@/components/calculators/StepUpSIPCalculator';

export default function StepUpSIPCalculatorPage() {
  return (
    <Suspense fallback={<div>Loading calculator...</div>}>
      <StepUpSIPCalculator />
    </Suspense>
  );
}
