interface SipFormProps {
  monthlyInvestment: number;
  interestRate: number;
  years: number;
  onMonthlyInvestmentChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onYearsChange: (value: number) => void;
}

export default function SipForm({
  monthlyInvestment,
  interestRate,
  years,
  onMonthlyInvestmentChange,
  onInterestRateChange,
  onYearsChange,
}: SipFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Investment
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => onMonthlyInvestmentChange(Number(e.target.value))}
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => onMonthlyInvestmentChange(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
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
              onChange={(e) => onInterestRateChange(Number(e.target.value))}
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={interestRate}
              onChange={(e) => onInterestRateChange(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
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
              onChange={(e) => onYearsChange(Number(e.target.value))}
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="range"
              min="1"
              max="35"
              step="1"
              value={years}
              onChange={(e) => onYearsChange(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 