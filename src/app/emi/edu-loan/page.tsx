'use client';
import LoanTypeTabs from '../LoanTypeTabs';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { EmiFormConfig } from '../EMICalculatorClient';

const EMICalculatorClient = dynamic(() => import('../EMICalculatorClient'), { ssr: false });

const eduLoanConfig: EmiFormConfig = {
  principal: { min: 100000, max: 10000000, step: 10000, default: 1500000 },
  interest: { min: 5, max: 20, step: 0.1, default: 10 },
  years: { min: 1, max: 15, step: 1, default: 7 },
};

export default function EduLoanPage() {
  return (
    <div className="space-y-6">
      <LoanTypeTabs />
      <Suspense fallback={<div>Loading calculator...</div>}>
        <EMICalculatorClient config={eduLoanConfig} />
      </Suspense>
    </div>
  );
} 