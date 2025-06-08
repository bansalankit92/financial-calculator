'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChartBarIcon,
  BanknotesIcon,
  CalculatorIcon,
  CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';

const calculators = [
  {
    name: 'New Tax Regime Calculator',
    description: 'Calculate your income tax under new regime for FY 2024-25 & 2025-26. Includes standard deduction, NPS benefits, and tax rebates.',
    href: '/new-regime-income-tax/2024-25',
    icon: CalculatorIcon,
  },
  {
    name: 'Old Tax Regime Calculator',
    description: 'Calculate your income tax under old regime with all deductions like 80C, HRA, and more. Perfect for those who want to claim traditional tax benefits.',
    href: '/old-regime-income-tax',
    icon: CalculatorIcon,
  },
  {
    name: 'SIP Calculator',
    description: 'Plan your investments with our SIP calculator. Calculate returns with daily, weekly, monthly, quarterly, or yearly investments.',
    href: '/sip',
    icon: ChartBarIcon,
  },
  {
    name: 'EMI Calculator',
    description: 'Calculate EMIs for your home loan, car loan, or personal loan. Plan your repayments and understand total interest costs.',
    href: '/emi',
    icon: BanknotesIcon,
  },
  {
    name: 'Salary Calculator',
    description: 'Calculate your in-hand salary after tax and other deductions. Includes standard deduction and professional tax calculations.',
    href: '/salary',
    icon: CurrencyRupeeIcon,
  },
];

export default function HomeContent() {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Financial Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Make informed financial decisions with our comprehensive suite of calculators. 
            Whether you're calculating taxes under the new regime, planning investments through SIP, 
            or managing loan EMIs, we provide accurate and easy-to-use tools for all your financial needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 mb-12">
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

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Calculators?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Accurate & Up-to-date</h3>
              <p className="text-gray-600">Our calculators are regularly updated with the latest tax slabs, deductions, and financial regulations.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Easy to Use</h3>
              <p className="text-gray-600">Simple interface with instant calculations. No complex forms or confusing options.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Comprehensive Results</h3>
              <p className="text-gray-600">Get detailed breakdowns and visualizations to better understand your finances.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Updates</h2>
          <ul className="space-y-4 text-gray-600">
            <li>• New Tax Regime Calculator updated for FY 2025-26 with ₹60,000 rebate</li>
            <li>• Added NPS deduction calculator under Section 80CCD(2)</li>
            <li>• Enhanced SIP calculator with multiple investment frequency options</li>
            <li>• Updated standard deduction to ₹75,000 for FY 2024-25</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
} 