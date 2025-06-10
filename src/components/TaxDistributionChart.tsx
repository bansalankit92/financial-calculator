/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, PieLabelRenderProps } from 'recharts';
import { useMemo, useCallback } from 'react';

interface TaxDistributionChartProps {
  totalTax: number;
  totalDeductions: number;
  ctc: number;
}

export default function TaxDistributionChart({
  totalTax,
  totalDeductions,
  ctc,
}: TaxDistributionChartProps) {
  const inHandSalary = useMemo(() => ctc - totalDeductions - totalTax, [ctc, totalDeductions, totalTax]);
  
  const COLORS = ['#ef4444', '#22c55e', '#3b82f6'];
  
  const data = useMemo(() => [
    { name: 'Net Tax', value: totalTax },
    { name: 'In-Hand Salary', value: inHandSalary },
    { name: 'Deductions', value: totalDeductions }
  ], [totalTax, inHandSalary, totalDeductions]);

  const renderCustomizedLabel = useCallback(({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
    if (cx === undefined || cy === undefined || midAngle === undefined || 
        innerRadius === undefined || outerRadius === undefined || percent === undefined) {
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
  }, []);

  const formatTooltipValue = useCallback((value: number) => {
    const percentage = ((value / ctc) * 100).toFixed(1);
    return [`₹${value.toLocaleString('en-IN')}`, `${percentage}%`];
  }, [ctc]);

  const renderCell = useCallback((entry: any, index: number) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ), []);

  return (
    <div className="w-full aspect-square max-w-[400px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={600}
            isAnimationActive={true}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => renderCell(entry, index))}
          </Pie>
          <Tooltip 
            formatter={formatTooltipValue}
            animationEasing="ease-out"
          />
          <Legend 
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 