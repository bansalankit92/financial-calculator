'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const EMICalculatorClient = dynamic(() => import('./EMICalculatorClient'), { ssr: false });

export default function EMICalculatorPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading calculator...</div>}>
        <EMICalculatorClient />
      </Suspense>
    </div>
  );
} 