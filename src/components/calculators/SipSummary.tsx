/* eslint-disable @typescript-eslint/no-require-imports */
'use client';

import { useState, useMemo, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, PieLabelRenderProps } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

interface SipSummaryProps {
  totalInvestment: number;
  totalReturns: number;
  totalValue: number;
}

interface ChartDataEntry {
  name: string;
  value: number;
}

function formatCurrency(amount: number, showFull: boolean = false): string {
  if (!showFull && amount >= 10000000) { // 1 crore
    const crores = amount / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  } else if (!showFull && amount >= 100000) { // 1 lakh
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
    
    // Handle thousand crores (> 1000 crore)
    const thousandCrores = Math.floor(n / 1000000000);
    if (thousandCrores > 0) {
      result += convertLessThanOneThousand(thousandCrores) + ' thousand ';
      n = n % 1000000000;
    }
    
    // Handle crores (> 10 million)
    const crores = Math.floor(n / 10000000);
    if (crores > 0) {
      result += convertLessThanOneThousand(crores) + ' crore ';
      n = n % 10000000;
    }
    
    // Handle lakhs (100,000)
    const lakhs = Math.floor(n / 100000);
    if (lakhs > 0) {
      result += convertLessThanOneThousand(lakhs) + ' lakh ';
      n = n % 100000;
    }
    
    // Handle thousands
    const thousands = Math.floor(n / 1000);
    if (thousands > 0) {
      result += convertLessThanOneThousand(thousands) + ' thousand ';
      n = n % 1000;
    }
    
    // Handle remaining hundreds
    if (n > 0) {
      result += convertLessThanOneThousand(n);
    }
    
    return result.trim();
  }

  // Convert the number to a string and remove decimal points
  const numStr = num.toString().split('.')[0];
  const numValue = parseInt(numStr);
  
  const words = convertToWords(numValue);
  return (words || 'zero') + ' only';
}

export default function SipSummary({
  totalInvestment,
  totalReturns,
  totalValue,
}: SipSummaryProps) {
  const [showFullValue, setShowFullValue] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [clickedValues, setClickedValues] = useState<{[key: string]: boolean}>({});

  const COLORS = ['#3b82f6', '#fbbf24'];

  const data = useMemo(() => [
    { name: 'Invested Amount', value: totalInvestment },
    { name: 'Est. Returns', value: totalReturns }
  ], [totalInvestment, totalReturns]);

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

  const handleMouseEnter = useCallback((value: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + (rect.width / 2),
      y: rect.top - 40,
    });
    setShowFullValue(value);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowFullValue(null);
  }, []);

  const handleClick = useCallback((key: string) => {
    setClickedValues(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const renderCell = useCallback((entry: ChartDataEntry, index: number) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ), []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Investment Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full aspect-square max-w-[320px] mx-auto" style={{ minHeight: '320px' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={320}>
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
                {data.map((entry, index) => renderCell(entry, index))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : '₹0'}
                animationEasing="ease-out"
              />
              <Legend 
                verticalAlign="bottom"
                height={32}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600">Invested Amount</div>
            <div 
              className="text-2xl font-semibold cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(formatCurrency(totalInvestment, true), e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('investment')}
            >
              {formatCurrency(totalInvestment, clickedValues['investment'])}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">Est. Returns</div>
            <div 
              className="text-2xl font-semibold text-blue-600 cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(formatCurrency(totalReturns, true), e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('returns')}
            >
              {formatCurrency(totalReturns, clickedValues['returns'])}
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600">Total Value</div>
            <div 
              className="text-2xl font-semibold text-green-600 cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(formatCurrency(totalValue, true), e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('total')}
            >
              {formatCurrency(totalValue, clickedValues['total'])}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {numberToWords(totalValue)}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFullValue && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="fixed z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm transform -translate-x-1/2"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            {showFullValue}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 