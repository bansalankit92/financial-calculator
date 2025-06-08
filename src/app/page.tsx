'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import SipForm from '@/components/calculators/SipForm';
import SipSummary from '@/components/calculators/SipSummary';
import WealthTable from '@/components/calculators/WealthTable';
import { calculateSIP } from '@/lib/calculations';
import Link from 'next/link';
import { CalculatorIcon, CurrencyRupeeIcon, BanknotesIcon, ChartBarIcon } from '@heroicons/react/24/outline';

ChartJS.register(ArcElement, Tooltip, Legend);

const calculators = [
  {
    name: 'SIP Calculator',
    description: 'Calculate your Systematic Investment Plan (SIP) returns and wealth growth over time.',
    href: '/sip',
    icon: ChartBarIcon,
  },
  {
    name: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installments (EMI) for loans and mortgages.',
    href: '/emi',
    icon: BanknotesIcon,
  },
  {
    name: 'Income Tax Calculator',
    description: 'Compare tax liability under old and new tax regimes.',
    href: '/tax-comparison',
    icon: CalculatorIcon,
  },
  {
    name: 'Salary Calculator',
    description: 'Calculate your in-hand salary after all deductions.',
    href: '/salary',
    icon: CurrencyRupeeIcon,
  },
];

export default function Home() {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make informed financial decisions with our suite of calculators. Whether you're planning investments,
            loans, or managing taxes, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4 sm:px-6">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-6 flex items-start space-x-6"
              >
                <div className="flex-shrink-0">
                  <calculator.icon className="h-12 w-12 text-blue-500 group-hover:text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {calculator.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{calculator.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
