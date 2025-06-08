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

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About SIP Calculator</h2>
          <p className="text-gray-700 mb-4">
            A Systematic Investment Plan (SIP) calculator helps you estimate the future value of your regular monthly investments. 
            It takes into account the power of compounding and helps you plan your long-term financial goals.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">How it Works</h3>
          <p className="text-gray-700 mb-4">
            The SIP calculator uses the following parameters:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Monthly Investment: The amount you invest each month</li>
            <li>Expected Return Rate: Annual expected return rate on your investment</li>
            <li>Time Period: Investment duration in years</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">SIP Formula</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-mono text-sm">
              FV = P × ((1 + r)^n - 1) × (1 + r)/r
            </p>
            <p className="text-gray-600 mt-2">
              Where:<br />
              FV = Future Value<br />
              P = Monthly Investment Amount<br />
              r = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)<br />
              n = Total Number of Months (Years × 12)
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Benefits of SIP</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Disciplined investing through regular monthly contributions</li>
            <li>Benefit from rupee cost averaging</li>
            <li>Power of compounding over long-term</li>
            <li>Lower risk through systematic investing</li>
            <li>Flexibility to start with small amounts</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
} 