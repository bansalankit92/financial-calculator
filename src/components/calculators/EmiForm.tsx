import React from 'react';

interface EmiFormConfig {
  principal: { min: number; max: number; step: number; default: number };
  interest: { min: number; max: number; step: number; default: number };
  years: { min: number; max: number; step: number; default: number };
}

interface EmiFormProps {
  principal: number;
  interestRate: number;
  years: number;
  onPrincipalChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onYearsChange: (value: number) => void;
  config: EmiFormConfig;
}

export default function EmiForm({
  principal,
  interestRate,
  years,
  onPrincipalChange,
  onInterestRateChange,
  onYearsChange,
  config,
}: EmiFormProps) {
  const { principal: pCfg, interest: iCfg, years: yCfg } = config;

  const sliderClassName = "flex-1 h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md";
  const inputClassName = "block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

  const calculatePercentage = (value: number, max: number) => (value / max) * 100;
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={principal}
              onChange={e => onPrincipalChange(Number(e.target.value))}
              className={inputClassName}
              step={pCfg.step}
              min={pCfg.min}
              max={pCfg.max}
            />
            <input
              type="range"
              min={pCfg.min}
              max={pCfg.max}
              step={pCfg.step}
              value={principal}
              onChange={e => onPrincipalChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(principal, pCfg.max)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Max value: ₹{(pCfg.max / 100000).toFixed(1)} Lakh
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={interestRate}
              onChange={e => onInterestRateChange(Number(e.target.value))}
              className={inputClassName}
              step={iCfg.step}
              min={iCfg.min}
              max={iCfg.max}
            />
            <input
              type="range"
              min={iCfg.min}
              max={iCfg.max}
              step={iCfg.step}
              value={interestRate}
              onChange={e => onInterestRateChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(interestRate, iCfg.max)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Max value: {iCfg.max}%
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Years
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={years}
              onChange={e => onYearsChange(Number(e.target.value))}
              className={inputClassName}
              step={yCfg.step}
              min={yCfg.min}
              max={yCfg.max}
            />
            <input
              type="range"
              min={yCfg.min}
              max={yCfg.max}
              step={yCfg.step}
              value={years}
              onChange={e => onYearsChange(Number(e.target.value))}
              className={sliderClassName}
              style={getSliderStyle(years, yCfg.max)}
            />
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Max value: {yCfg.max} years
          </div>
        </div>
      </div>
    </div>
  );
} 