/* eslint-disable @typescript-eslint/no-require-imports */
'use client';

import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const Pie = require('react-chartjs-2').Pie;

interface SipSummaryProps {
  totalInvestment: number;
  totalReturns: number;
  totalValue: number;
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

  const chartData = {
    labels: ['Invested Amount', 'Est. Returns'],
    datasets: [
      {
        data: [totalInvestment, totalReturns],
        backgroundColor: ['#3b82f6', '#fbbf24'],
        borderWidth: 0,
      },
    ],
  };

  const handleMouseEnter = (value: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + (rect.width / 2),
      y: rect.top - 40, // Position further up
    });
    setShowFullValue(value);
  };

  const handleMouseLeave = () => {
    setShowFullValue(null);
  };

  const handleClick = (key: string) => {
    setClickedValues(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Investment Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full aspect-square max-w-[300px] mx-auto">
          <Pie 
            data={chartData}
            options={{
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
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