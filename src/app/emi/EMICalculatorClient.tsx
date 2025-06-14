'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateEMI } from '@/lib/calculations';
import EmiForm from '@/components/calculators/EmiForm';
import EmiSummary from '@/components/calculators/EmiSummary';
import EmiBreakupTable from '@/components/calculators/EmiBreakupTable';
import EmiBarChart from '@/components/calculators/EmiBarChart';

export default function EMICalculatorClient() {
  // Defaults
  const [principal, setPrincipal] = useState(800000);
  const [interestRate, setInterestRate] = useState(9);
  const [years, setYears] = useState(5);

  const emiResult = calculateEMI({ principal, interestRate, years });

  // Placeholder components to be implemented
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