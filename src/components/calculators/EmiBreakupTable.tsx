import React, { useState } from 'react';
import { EMICalculationResult } from '@/types/calculator';

interface EmiBreakupTableProps {
  yearlyBreakup: EMICalculationResult['yearlyBreakup'];
  emi: number;
  principal: number;
  interestRate: number;
  years: number;
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function EmiBreakupTable({ yearlyBreakup, emi, principal, interestRate, years }: EmiBreakupTableProps) {
  // By default, expand the first year
  const [expandedYears, setExpandedYears] = useState<{ [year: number]: boolean }>(() => {
    const obj: { [year: number]: boolean } = {};
    if (yearlyBreakup.length > 0) obj[yearlyBreakup[0].year] = true;
    return obj;
  });

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 w-full">
      <h2 className="text-xl font-semibold mb-2">Your Repayment/Breakup Details (Monthly)</h2>
      <p className="text-gray-600 mb-4">Your debt repayment schedule in regular instalments over a period of time.</p>
      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-6 sm:px-0">
          <table className="min-w-full border text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 border">Year</th>
              <th className="px-3 py-2 border">Principal Paid</th>
              <th className="px-3 py-2 border">Interest Paid</th>
              <th className="px-3 py-2 border">Total Payment</th>
              <th className="px-3 py-2 border">Balance</th>
            </tr>
          </thead>
          <tbody>
            {yearlyBreakup.map((year) => (
              <React.Fragment key={year.year}>
                <tr
                  className={`bg-gray-100 font-semibold cursor-pointer ${expandedYears[year.year] ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleYear(year.year)}
                >
                  <td className="px-3 py-2 border flex items-center gap-2">
                    <span>{year.year}</span>
                    <span className="text-xs text-blue-600">{expandedYears[year.year] ? '▼' : '▶'}</span>
                  </td>
                  <td className="px-3 py-2 border">{formatCurrency(year.principalPaid)}</td>
                  <td className="px-3 py-2 border">{formatCurrency(year.interestPaid)}</td>
                  <td className="px-3 py-2 border">{formatCurrency(year.totalPayment)}</td>
                  <td className="px-3 py-2 border">{formatCurrency(year.months[year.months.length-1]?.balance ?? 0)}</td>
                </tr>
                {expandedYears[year.year] && year.months.map((month, j) => (
                  <tr key={month.month + j}>
                    <td className="px-3 py-2 border text-gray-500">{month.month}</td>
                    <td className="px-3 py-2 border text-gray-500">{formatCurrency(month.principalPaid)}</td>
                    <td className="px-3 py-2 border text-gray-500">{formatCurrency(month.interestPaid)}</td>
                    <td className="px-3 py-2 border text-gray-500">{formatCurrency(month.totalPayment)}</td>
                    <td className="px-3 py-2 border text-gray-500">{formatCurrency(month.balance)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Formula used by EMI Calculator</h3>
        <div className="bg-gray-50 p-4 rounded-md text-sm">
          <div className="mb-2">
            <span className="font-mono text-red-600">R ( {` ${(interestRate/12/100).toFixed(5)} `} ) = Interest( {interestRate} % )/12/100</span>
          </div>
          <div className="mb-2">
            <span className="font-mono text-blue-600">EMI = [P * R * (1+R)<sup>n</sup>] / [((1+R)<sup>n</sup>)-1]</span>
          </div>
          <div className="mb-2">
            <span className="font-mono text-green-600">EMI ( {formatCurrency(emi)} ) = [{formatCurrency(principal)} * {(interestRate/12/100).toFixed(5)} * (1+{(interestRate/12/100).toFixed(5)})^{years*12}] / [((1+{(interestRate/12/100).toFixed(5)})^{years*12})-1]</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md text-sm mt-4">
          <div className="mb-2">
            <span className="font-mono text-purple-600">Monthly EMI<br />=PMT(rate ( {(interestRate/12/100).toFixed(4)} ), nper ( {years*12} ), pv ( {formatCurrency(principal)} )) = {formatCurrency(emi)}</span>
          </div>
          <div className="mb-2">
            <span className="font-mono text-orange-600">Interest Paid for first month<br />=IPMT(pv ( {formatCurrency(principal)} ), pmt ( {formatCurrency(emi)} ), rate ( {(interestRate/12/100).toFixed(4)} ), per ( 0 )) = {formatCurrency(Math.round(principal * (interestRate/12/100)))}</span>
          </div>
          <div className="mb-2">
            <span className="font-mono text-teal-600">Principal Paid for first month<br />=PPMT(rate ( {(interestRate/12/100).toFixed(4)} ), per ( 0 ), nper ( {years*12} ), pv ( {formatCurrency(principal)} )) = {formatCurrency(emi - Math.round(principal * (interestRate/12/100)))}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 