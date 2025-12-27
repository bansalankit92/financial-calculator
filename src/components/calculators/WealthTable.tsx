import { SIPFrequency } from '@/types/calculator';
import { calculateSIP } from '@/lib/calculations';

interface WealthTableProps {
  investment: number;
  interestRate: number;
  frequency: SIPFrequency;
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
  investment,
  interestRate,
  frequency
}: WealthTableProps) {
  const years = [1, 2, 3, 5, 10, 15, 20, 25, 30];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Years
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Investment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Est. Returns
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {years.map((year) => {
              const { totalInvestment, totalReturns, totalValue } = calculateSIP(
                investment,
                interestRate,
                year,
                frequency
              );

              return (
                <tr key={year} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {year} {year === 1 ? 'year' : 'years'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{totalInvestment.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{totalReturns.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
} 