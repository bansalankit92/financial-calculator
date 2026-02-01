import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { EMICalculationResult } from '@/types/calculator';

interface EmiBarChartProps {
  yearlyBreakup: EMICalculationResult['yearlyBreakup'];
}

function formatCurrency(amount: number | undefined): string {
  if (amount === undefined) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function EmiBarChart({ yearlyBreakup }: EmiBarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const data = yearlyBreakup.map((y) => ({
    year: y.year,
    Principal: y.principalPaid,
    Interest: y.interestPaid,
    Total: y.totalPayment,
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">EMI Payment / Year</h2>
      <ResponsiveContainer width="100%" height={350} minHeight={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
        >
          <XAxis dataKey="year" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip formatter={formatCurrency} />
          <Legend />
          <Bar          onClick={(_, index) => setActiveIndex(index)}
 dataKey="Principal" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} isAnimationActive>
            {/* <LabelList dataKey="Principal" position="top" formatter={formatCurrency} /> */}
          </Bar>
          <Bar  dataKey="Interest" stackId="a" fill="#fbbf24" isAnimationActive>
            {/* <LabelList dataKey="Interest" position="top" formatter={formatCurrency} /> */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {activeIndex !== null && data[activeIndex] && (
        <div className="mt-4 p-4 bg-blue-50 rounded text-blue-900">
          <div className="font-semibold">Year: {data[activeIndex].year}</div>
          <div>Principal Paid: <span className="font-mono">{formatCurrency(data[activeIndex].Principal)}</span></div>
          <div>Interest Paid: <span className="font-mono">{formatCurrency(data[activeIndex].Interest)}</span></div>
          <div>Total Payment: <span className="font-mono">{formatCurrency(data[activeIndex].Total)}</span></div>
        </div>
      )}
    </div>
  );
} 