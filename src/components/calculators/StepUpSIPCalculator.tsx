'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShareIcon } from '@heroicons/react/24/outline';
import StepUpForm from '@/components/calculators/StepUpForm';
import StepUpSummary from '@/components/calculators/StepUpSummary';
import StepUpBreakdownTable from '@/components/calculators/StepUpBreakdownTable';
import { calculateStepUpSIP, getDefaultStepUpInvestment, getDefaultStepUpValue } from '@/lib/calculations';
import { useQueryParams } from '@/hooks/useQueryParams';
import { StepUpFrequency, StepUpType } from '@/types/calculator';

export default function StepUpSIPCalculator() {
  const { getQueryParam, createQueryString } = useQueryParams();
  const [showCopied, setShowCopied] = useState(false);

  // Initialize state from URL parameters or defaults
  const [stepUpFrequency, setStepUpFrequency] = useState<StepUpFrequency>('yearly');
  const [stepUpType, setStepUpType] = useState<StepUpType>('percentage');

  const [initialInvestment, setInitialInvestment] = useState(() =>
    getQueryParam('investment', getDefaultStepUpInvestment(stepUpFrequency))
  );
  const [stepUpValue, setStepUpValue] = useState(() =>
    getQueryParam('stepup', getDefaultStepUpValue(stepUpFrequency, stepUpType))
  );
  const [interestRate, setInterestRate] = useState(() =>
    getQueryParam('interest', 12)
  );
  const [years, setYears] = useState(() =>
    getQueryParam('years', 10)
  );

  const { totalInvestment, totalReturns, totalValue, yearlyBreakdown } = calculateStepUpSIP({
    initialInvestment,
    stepUpValue,
    stepUpType,
    stepUpFrequency,
    interestRate,
    years
  });

  const handleStepUpTypeChange = (type: StepUpType) => {
    const newStepUpValue = getDefaultStepUpValue(stepUpFrequency, type);
    setStepUpType(type);
    setStepUpValue(newStepUpValue);
  };

  const handleStepUpFrequencyChange = (frequency: StepUpFrequency) => {
    const newInvestment = getDefaultStepUpInvestment(frequency);
    const newStepUpValue = getDefaultStepUpValue(frequency, stepUpType);
    setStepUpFrequency(frequency);
    setInitialInvestment(newInvestment);
    setStepUpValue(newStepUpValue);
  };

  const handleShare = async () => {
    try {
      // Build shareable URL with current values only when sharing
      const queryString = createQueryString({
        investment: initialInvestment,
        stepup: stepUpValue,
        type: stepUpType,
        frequency: stepUpFrequency,
        interest: interestRate,
        years
      });
      const shareUrl = `${window.location.origin}${window.location.pathname}?${queryString}`;
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Step-Up SIP Calculator</h1>
          <p className="text-gray-600">For mutual funds with increasing investments</p>
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors relative"
        >
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
          {showCopied && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded">
              Copied!
            </div>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StepUpForm
          initialInvestment={initialInvestment}
          stepUpValue={stepUpValue}
          stepUpType={stepUpType}
          stepUpFrequency={stepUpFrequency}
          interestRate={interestRate}
          years={years}
          onInitialInvestmentChange={setInitialInvestment}
          onStepUpValueChange={setStepUpValue}
          onStepUpTypeChange={handleStepUpTypeChange}
          onStepUpFrequencyChange={handleStepUpFrequencyChange}
          onInterestRateChange={setInterestRate}
          onYearsChange={setYears}
        />

        <StepUpSummary
          totalInvestment={totalInvestment}
          totalReturns={totalReturns}
          totalValue={totalValue}
        />
      </div>

      <StepUpBreakdownTable yearlyBreakdown={yearlyBreakdown} />

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About Step-Up SIP Calculator</h2>
          <p className="text-gray-700 mb-4">
            A Step-Up SIP calculator helps you estimate the future value of your SIP investments when you increase your investment amount periodically.
            This strategy helps you invest more as your income grows, maximizing the power of compounding over time.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">How it Works</h3>
          <p className="text-gray-700 mb-4">
            The Step-Up SIP calculator uses the following parameters:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Initial Investment: The amount you start investing (monthly or yearly)</li>
            <li>Step-Up Value: The increase in your investment (percentage or fixed amount)</li>
            <li>Step-Up Frequency: How often you increase your investment (monthly or yearly)</li>
            <li>Expected Return Rate: Annual expected return rate on your investment</li>
            <li>Time Period: Investment duration in years</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Benefits of Step-Up SIP</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Align investments with growing income over time</li>
            <li>Maximize wealth creation through increased contributions</li>
            <li>Accelerate achievement of financial goals</li>
            <li>Combat inflation by increasing investment amounts</li>
            <li>Flexible options: choose percentage or fixed amount increases</li>
            <li>Monthly or yearly step-up options to suit your needs</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Example Scenarios</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Yearly Step-Up with Percentage</h4>
              <p className="text-gray-700">
                Start with ₹1,00,000 per year and increase by 10% annually.
                After 10 years with 12% expected returns, you could accumulate significant wealth while gradually increasing your investment as your income grows.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-semibold mb-2">Monthly Step-Up with Fixed Amount</h4>
              <p className="text-gray-700">
                Start with ₹5,000 per month and increase by ₹100 every month.
                This gradual increase helps you consistently invest more without feeling the burden of a sudden jump in investment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
