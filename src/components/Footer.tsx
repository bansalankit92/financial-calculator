import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white mt-8 rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-center gap-8 text-center">
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-2xl font-bold mb-4">Income Tax</h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.OLD_VS_NEW_REGIME} className="hover:underline">Old vs New Regime Income Tax</Link>
              </li>
              <li>
                <Link href={ROUTES.NEW_TAX_REGIME_2024_25} className="hover:underline">(New) Income Tax 2024-25</Link>
              </li>
              <li>
                <Link href={ROUTES.NEW_TAX_REGIME_2025_26} className="hover:underline">(New) Income Tax 2025-26</Link>
              </li>
              <li>
                <Link href={ROUTES.OLD_TAX_REGIME} className="hover:underline">(Old) Income Tax</Link>
              </li>
              <li>
                <Link href={ROUTES.SALARY} className="hover:underline">Salary Calculator</Link>
              </li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-2xl font-bold mb-4">Investment</h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.SIP} className="hover:underline">SIP Calculator</Link>
              </li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-2xl font-bold mb-4">EMI</h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.EMI_HOME_LOAN} className="hover:underline">Home Loan</Link>
              </li>
              <li>
                <Link href={ROUTES.EMI_CAR_LOAN} className="hover:underline">Car Loan</Link>
              </li>
              <li>
                <Link href={ROUTES.EMI_EDU_LOAN} className="hover:underline">Educational Loan</Link>
              </li>
              <li>
                <Link href={ROUTES.EMI_PERSONAL_LOAN} className="hover:underline">Personal Loan</Link>
              </li>
              <li>
                <Link href={ROUTES.EMI} className="hover:underline">EMI Loan</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm w-full flex justify-center">
          © 2020-{new Date().getFullYear()} Design and developed by{' '}
          <Link href="https://ankitbansal.co.in" target="_blank" rel="noopener noreferrer" className="underline ml-1">Ankit Bansal</Link>
        </div>
      </div>
    </footer>
  );
} 