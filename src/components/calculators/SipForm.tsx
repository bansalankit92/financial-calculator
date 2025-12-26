import { SIPFrequency } from '@/types/calculator';
import { getInvestmentLabel, getMaxInvestment } from '@/lib/calculations';

interface SipFormProps {
  investment: number;
  interestRate: number;
  years: number;
  frequency: SIPFrequency;
  onInvestmentChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onYearsChange: (value: number) => void;
}

export default function SipForm({
  investment,
  interestRate,
  years,
  frequency,
  onInvestmentChange,
  onInterestRateChange,
  onYearsChange,
}: SipFormProps) {
  const MAX_INVESTMENT = getMaxInvestment(frequency);
  const MAX_INTEREST = 30;
  const MAX_YEARS = 35;

  // Calculate percentage for slider background
  const calculatePercentage = (value: number, max: number) => {
    return (value / max) * 100;
  };

  // Get color based on percentage
  const getSliderColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 70) return 'rgb(34, 197, 94)'; // green-500
    if (percentage >= 40) return 'rgb(59, 130, 246)'; // blue-500
    return 'rgb(99, 102, 241)'; // indigo-500
  };

  const getSliderStyle = (value: number, max: number) => ({
    background: `linear-gradient(to right, 
      ${getSliderColor(value, max)} 0%, 
      ${getSliderColor(value, max)} ${calculatePercentage(value, max)}%, 
      #e5e7eb ${calculatePercentage(value, max)}%, 
      #e5e7eb 100%)`
  });

  const sliderClassName = "flex-1 h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md";
  const inputClassName = "block w-20 sm:w-28 md:w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm min-w-0";

  const getInvestmentConfig = (freq: SIPFrequency) => {
    switch (freq) {
      case 'daily':
        return { min: 50, step: 50 };
      case 'weekly':
        return { min: 100, step: 100 };
      case 'monthly':
        return { min: 500, step: 500 };
      case 'quarterly':
        return { min: 1500, step: 1500 };
      case 'yearly':
        return { min: 6000, step: 1000 };
    }
  };

  const { min: minInvestment, step: stepInvestment } = getInvestmentConfig(frequency);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getInvestmentLabel(frequency)}
          </label>
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              type="number"
              value={investment}
              onChange={(e) => onInvestmentChange(Number(e.target.value))}
              className={inputClassName}
              step={stepInvestment}
              min={minInvestment}
              max={MAX_INVESTMENT}
            />
            <input
              type="range"
              min={minInvestment}
              max={MAX_INVESTMENT}
              step={stepInvestment}
              value={investment}
              onChange={(e) => onInvestmentChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(investment, MAX_INVESTMENT)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Max value: ₹{(MAX_INVESTMENT / 100000).toFixed(1)} Lakh
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              type="number"
              value={interestRate}
              onChange={(e) => onInterestRateChange(Number(e.target.value))}
              className={inputClassName}
              step="0.5"
              min="1"
              max={MAX_INTEREST}
            />
            <input
              type="range"
              min="1"
              max={MAX_INTEREST}
              step="0.5"
              value={interestRate}
              onChange={(e) => onInterestRateChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(interestRate, MAX_INTEREST)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Max value: {MAX_INTEREST}%
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Years
          </label>
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              type="number"
              value={years}
              onChange={(e) => onYearsChange(Number(e.target.value))}
              className={inputClassName}
              step="1"
              min="1"
              max={MAX_YEARS}
            />
            <input
              type="range"
              min="1"
              max={MAX_YEARS}
              step="1"
              value={years}
              onChange={(e) => onYearsChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(years, MAX_YEARS)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Max value: {MAX_YEARS} years
          </div>
        </div>
      </div>
    </div>
  );
} 