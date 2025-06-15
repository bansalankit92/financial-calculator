import { useMemo, useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, PieLabelRenderProps } from 'recharts';

interface EmiSummaryProps {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
}

function formatCurrency(amount: number, showFull: boolean = false): string {
  if (showFull) return `₹${amount.toLocaleString('en-IN')}`;
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

function numberToWords(num: number): string {
  const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  if (num === 0) return 'zero';
  function convertLessThanOneThousand(n: number): string {
    if (n === 0) return '';
    if (n < 20) return units[n];
    const digit = n % 10;
    if (n < 100) return tens[Math.floor(n / 10)] + (digit ? ' ' + units[digit] : '');
    return units[Math.floor(n / 100)] + ' hundred' + (n % 100 === 0 ? '' : ' and ' + convertLessThanOneThousand(n % 100));
  }
  function convertToWords(n: number): string {
    if (n === 0) return '';
    let result = '';
    const crores = Math.floor(n / 10000000);
    if (crores > 0) {
      result += convertLessThanOneThousand(crores) + ' crore ';
      n = n % 10000000;
    }
    const lakhs = Math.floor(n / 100000);
    if (lakhs > 0) {
      result += convertLessThanOneThousand(lakhs) + ' lakh ';
      n = n % 100000;
    }
    const thousands = Math.floor(n / 1000);
    if (thousands > 0) {
      result += convertLessThanOneThousand(thousands) + ' thousand ';
      n = n % 1000;
    }
    if (n > 0) {
      result += convertLessThanOneThousand(n);
    }
    return result.trim();
  }
  const numStr = num.toString().split('.')[0];
  const numValue = parseInt(numStr);
  const words = convertToWords(numValue);
  return (words || 'zero') + ' only';
}

export default function EmiSummary({ emi, totalInterest, totalPayment, principal }: EmiSummaryProps) {
  const COLORS = ['#3b82f6', '#fbbf24'];
  const data = useMemo(() => [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest }
  ], [principal, totalInterest]);

  // State for toggling full value display
  const [showFull, setShowFull] = useState<{ emi: boolean; interest: boolean; total: boolean }>({ emi: false, interest: false, total: false });

  const handleToggle = useCallback((key: 'emi' | 'interest' | 'total') => {
    setShowFull((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
    if (cx === undefined || cy === undefined || midAngle === undefined || innerRadius === undefined || outerRadius === undefined || percent === undefined) {
      return null;
    }
    const RADIAN = Math.PI / 180;
    const radius = (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5;
    const x = (cx as number) + radius * Math.cos(-midAngle * RADIAN);
    const y = (cy as number) + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > (cx as number) ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 'bold', textShadow: '0 0 3px rgba(0,0,0,0.5)' }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full aspect-square max-w-[320px] mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={600}
                isAnimationActive={true}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} animationEasing="ease-out" />
              <Legend verticalAlign="bottom" height={32} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600">Loan EMI</div>
            <div
              className="text-2xl font-semibold cursor-pointer"
              onClick={() => handleToggle('emi')}
              title="Click to toggle full value"
            >
              {formatCurrency(emi, showFull.emi)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Interest Payable</div>
            <div
              className="text-2xl font-semibold text-blue-600 cursor-pointer"
              onClick={() => handleToggle('interest')}
              title="Click to toggle full value"
            >
              {formatCurrency(totalInterest, showFull.interest)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Total Payment (Principal + Interest)</div>
            <div
              className="text-2xl font-semibold text-green-600 cursor-pointer"
              onClick={() => handleToggle('total')}
              title="Click to toggle full value"
            >
              {formatCurrency(totalPayment, showFull.total)}
            </div>
            <div className="text-sm text-gray-500 mt-1">{numberToWords(totalPayment)}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 