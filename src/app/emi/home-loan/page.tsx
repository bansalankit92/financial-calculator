'use client';
import LoanTypeTabs from '../LoanTypeTabs';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { EmiFormConfig } from '../EMICalculatorClient';

const EMICalculatorClient = dynamic(() => import('../EMICalculatorClient'), { ssr: false });

const homeLoanConfig: EmiFormConfig = {
  principal: { min: 100000, max: 50000000, step: 50000, default: 8000000 },
  interest: { min: 5, max: 20, step: 0.1, default: 8 },
  years: { min: 1, max: 30, step: 1, default: 20 },
};

export default function HomeLoanPage() {
  return (
    <div className="space-y-6">
      <LoanTypeTabs />
      <Suspense fallback={<div>Loading calculator...</div>}>
        <EMICalculatorClient config={homeLoanConfig} />
      </Suspense>
    </div>
  );
} 