'use client';
import LoanTypeTabs from '../LoanTypeTabs';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { EmiFormConfig } from '../EMICalculatorClient';

const EMICalculatorClient = dynamic(() => import('../EMICalculatorClient'), { ssr: false });

const carLoanConfig: EmiFormConfig = {
  principal: { min: 100000, max: 8000000, step: 10000, default: 800000 },
  interest: { min: 5, max: 20, step: 0.1, default: 9 },
  years: { min: 1, max: 10, step: 1, default: 5 },
};

export default function CarLoanPage() {
  return (
    <div className="space-y-6">
      <LoanTypeTabs />
      <Suspense fallback={<div>Loading calculator...</div>}>
        <EMICalculatorClient config={carLoanConfig} />
      </Suspense>
    </div>
  );
} 