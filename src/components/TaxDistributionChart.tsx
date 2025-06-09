/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = require('react-chartjs-2').Pie;

interface TaxDistributionChartProps {
  taxableIncome: number;
  totalTax: number;
  totalDeductions: number;
  ctc: number;
}

export default function TaxDistributionChart({
  taxableIncome,
  totalTax,
  totalDeductions,
  ctc,
}: TaxDistributionChartProps) {
  const inHandSalary = ctc - totalDeductions - totalTax;
  
  const chartData: ChartData<'pie'> = {
    labels: ['Net Tax', 'In-Hand Salary', 'Deductions'],
    datasets: [
      {
        data: [totalTax, inHandSalary, totalDeductions],
        backgroundColor: ['#ef4444', '#22c55e', '#3b82f6'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-full aspect-square max-w-[300px] mx-auto">
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const value = context.raw as number;
                  const percentage = ((value / ctc) * 100).toFixed(1);
                  return `₹${value.toLocaleString('en-IN')} (${percentage}%)`;
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
} 