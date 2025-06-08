'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import SipForm from '@/components/calculators/SipForm';
import SipSummary from '@/components/calculators/SipSummary';
import WealthTable from '@/components/calculators/WealthTable';
import { calculateSIP } from '@/lib/calculations';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(3000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(3);

  const { totalInvestment, totalReturns, totalValue } = calculateSIP(
    monthlyInvestment,
    interestRate,
    years
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">SIP Calculator</h1>
        <p className="text-gray-600">For mutual funds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SipForm
          monthlyInvestment={monthlyInvestment}
          interestRate={interestRate}
          years={years}
          onMonthlyInvestmentChange={setMonthlyInvestment}
          onInterestRateChange={setInterestRate}
          onYearsChange={setYears}
        />

        <SipSummary
          totalInvestment={totalInvestment}
          totalReturns={totalReturns}
          totalValue={totalValue}
        />
      </div>

      <WealthTable
        monthlyInvestment={monthlyInvestment}
        interestRate={interestRate}
      />
    </motion.div>
  );
} 