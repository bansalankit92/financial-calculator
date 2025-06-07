import { calculateWealthGrowth } from '@/lib/calculations';

interface WealthTableProps {
  monthlyInvestment: number;
  interestRate: number;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

export default function WealthTable({
  monthlyInvestment,
  interestRate,
}: WealthTableProps) {
  const projections = calculateWealthGrowth(monthlyInvestment, interestRate);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Calculation for different years</h2>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount monthly
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Value
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wealth Gain
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projections.map((projection) => (
                  <tr key={projection.duration}>
                    <td className="sticky left-0 bg-white px-4 py-3 whitespace-nowrap text-sm">
                      {projection.duration} yr
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {formatCurrency(projection.monthlyAmount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {formatCurrency(projection.totalValue)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                      {formatCurrency(projection.wealthGain)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 