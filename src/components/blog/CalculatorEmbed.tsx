'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface CalculatorEmbedProps {
  title: string;
  description?: string;
  calculatorPath?: string; // Link to full calculator page
  children: React.ReactNode; // The actual calculator component
  showFullLink?: boolean;
}

export default function CalculatorEmbed({
  title,
  description,
  calculatorPath,
  children,
  showFullLink = true,
}: CalculatorEmbedProps) {
  return (
    <div className="my-10 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
          {calculatorPath && showFullLink && (
            <Link
              href={calculatorPath}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              Full Calculator
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Calculator Content */}
      <div className="p-6 bg-white">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-gray-600 text-sm">Loading calculator...</p>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>

      {/* Footer CTA */}
      {calculatorPath && (
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Want to explore more scenarios?
            </p>
            <Link
              href={calculatorPath}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Try Full Calculator
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
