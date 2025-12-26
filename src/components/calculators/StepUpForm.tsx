import { StepUpFrequency, StepUpType } from '@/types/calculator';
import {
  getStepUpInvestmentLabel,
  getStepUpLabel,
  getMaxStepUpInvestment,
  getMaxStepUpValue
} from '@/lib/calculations';

interface StepUpFormProps {
  initialInvestment: number;
  stepUpValue: number;
  stepUpType: StepUpType;
  stepUpFrequency: StepUpFrequency;
  interestRate: number;
  years: number;
  onInitialInvestmentChange: (value: number) => void;
  onStepUpValueChange: (value: number) => void;
  onStepUpTypeChange: (type: StepUpType) => void;
  onStepUpFrequencyChange: (frequency: StepUpFrequency) => void;
  onInterestRateChange: (value: number) => void;
  onYearsChange: (value: number) => void;
}

export default function StepUpForm({
  initialInvestment,
  stepUpValue,
  stepUpType,
  stepUpFrequency,
  interestRate,
  years,
  onInitialInvestmentChange,
  onStepUpValueChange,
  onStepUpTypeChange,
  onStepUpFrequencyChange,
  onInterestRateChange,
  onYearsChange,
}: StepUpFormProps) {
  const MAX_INVESTMENT = getMaxStepUpInvestment(stepUpFrequency);
  const MAX_STEP_UP = getMaxStepUpValue(stepUpFrequency, stepUpType);
  const MAX_INTEREST = 30;
  const MAX_YEARS = 35;

  const calculatePercentage = (value: number, max: number) => {
    return (value / max) * 100;
  };

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

  const getInvestmentConfig = (freq: StepUpFrequency) => {
    return freq === 'monthly'
      ? { min: 500, step: 500 }
      : { min: 10000, step: 10000 };
  };

  const getStepUpConfig = (freq: StepUpFrequency, type: StepUpType) => {
    if (type === 'percentage') {
      return { min: 1, step: 1 };
    }
    return freq === 'monthly'
      ? { min: 10, step: 10 }
      : { min: 1000, step: 1000 };
  };

  const { min: minInvestment, step: stepInvestment } = getInvestmentConfig(stepUpFrequency);
  const { min: minStepUp, step: stepStepUp } = getStepUpConfig(stepUpFrequency, stepUpType);

  // Calculate actual step-up value display
  const getStepUpDisplayText = () => {
    if (stepUpType === 'percentage') {
      return `${stepUpValue}% increase`;
    }
    return `₹${stepUpValue.toLocaleString('en-IN')} increase`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        {/* Frequency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Step-Up Frequency
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => onStepUpFrequencyChange('yearly')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                stepUpFrequency === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => onStepUpFrequencyChange('monthly')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                stepUpFrequency === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Initial Investment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getStepUpInvestmentLabel(stepUpFrequency)}
          </label>
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => onInitialInvestmentChange(Number(e.target.value))}
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
              value={initialInvestment}
              onChange={(e) => onInitialInvestmentChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(initialInvestment, MAX_INVESTMENT)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Max value: ₹{(MAX_INVESTMENT / 100000).toFixed(1)} Lakh
          </div>
        </div>

        {/* Step-Up Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Step-Up Type
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => onStepUpTypeChange('percentage')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                stepUpType === 'percentage'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Percentage (%)
            </button>
            <button
              onClick={() => onStepUpTypeChange('amount')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                stepUpType === 'amount'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Amount (₹)
            </button>
          </div>
        </div>

        {/* Step-Up Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getStepUpLabel(stepUpFrequency)} {stepUpType === 'percentage' ? '(%)' : '(₹)'}
          </label>
          <div className="flex items-center gap-2 sm:gap-4">
            <input
              type="number"
              value={stepUpValue}
              onChange={(e) => onStepUpValueChange(Number(e.target.value))}
              className={inputClassName}
              step={stepStepUp}
              min={minStepUp}
              max={MAX_STEP_UP}
            />
            <input
              type="range"
              min={minStepUp}
              max={MAX_STEP_UP}
              step={stepStepUp}
              value={stepUpValue}
              onChange={(e) => onStepUpValueChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(stepUpValue, MAX_STEP_UP)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {getStepUpDisplayText()}
          </div>
        </div>

        {/* Interest Rate */}
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

        {/* Number of Years */}
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
