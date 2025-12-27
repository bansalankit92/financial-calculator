import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/solid';

interface QuickTipProps {
  children: React.ReactNode;
}

export default function QuickTip({ children }: QuickTipProps) {
  return (
    <div className="my-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-400 rounded-r-xl p-5 shadow-sm">
      <div className="flex gap-3 items-start">
        <LightBulbIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-900 mb-1">Quick Tip</p>
          <div className="text-sm text-amber-800 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
