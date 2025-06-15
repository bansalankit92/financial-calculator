'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateEMI } from '@/lib/calculations';
import EmiForm from '@/components/calculators/EmiForm';
import EmiSummary from '@/components/calculators/EmiSummary';
import EmiBreakupTable from '@/components/calculators/EmiBreakupTable';
import EmiBarChart from '@/components/calculators/EmiBarChart';

export interface EmiFormConfig {
  principal: { min: number; max: number; step: number; default: number };
  interest: { min: number; max: number; step: number; default: number };
  years: { min: number; max: number; step: number; default: number };
}

const defaultConfig: EmiFormConfig = {
  principal: { min: 100000, max: 50000000, step: 50000, default: 8000000 },
  interest: { min: 5, max: 20, step: 0.1, default: 8 },
  years: { min: 1, max: 30, step: 1, default: 20 },
};

export default function EMICalculatorClient({ config = defaultConfig }: { config?: EmiFormConfig }) {
  const [principal, setPrincipal] = useState(config.principal.default);
  const [interestRate, setInterestRate] = useState(config.interest.default);
  const [years, setYears] = useState(config.years.default);

  const emiResult = calculateEMI({ principal, interestRate, years });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">EMI Calculator</h1>
          <p className="text-gray-600">Calculate your loan EMI, interest, and repayment schedule</p>
        </div>
      </div>

      {/* Form and Summary side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EmiForm
          principal={principal}
          interestRate={interestRate}
          years={years}
          onPrincipalChange={setPrincipal}
          onInterestRateChange={setInterestRate}
          onYearsChange={setYears}
          config={config}
        />
        <EmiSummary
          emi={emiResult.emi}
          totalInterest={emiResult.totalInterest}
          totalPayment={emiResult.totalPayment}
          principal={principal}
        />
      </div>

      {/* Bar Chart - to be implemented */}
      <EmiBarChart yearlyBreakup={emiResult.yearlyBreakup} />

      {/* Breakup Table - to be implemented */}
      <EmiBreakupTable
        yearlyBreakup={emiResult.yearlyBreakup}
        emi={emiResult.emi}
        principal={principal}
        interestRate={interestRate}
        years={years}
      />
    </motion.div>
  );
} 