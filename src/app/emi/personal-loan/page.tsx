'use client';
import LoanTypeTabs from '../LoanTypeTabs';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { EmiFormConfig } from '../EMICalculatorClient';

const EMICalculatorClient = dynamic(() => import('../EMICalculatorClient'), { ssr: false });

const personalLoanConfig: EmiFormConfig = {
  principal: { min: 200000, max: 5000000, step: 10000, default: 200000 },
  interest: { min: 5, max: 20, step: 0.1, default: 13 },
  years: { min: 1, max: 7, step: 1, default: 3 },
};

export default function PersonalLoanPage() {
  return (
    <div className="space-y-6">
      <LoanTypeTabs />
      <Suspense fallback={<div>Loading calculator...</div>}>
        <EMICalculatorClient config={personalLoanConfig} />
      </Suspense>
    </div>
  );
} 