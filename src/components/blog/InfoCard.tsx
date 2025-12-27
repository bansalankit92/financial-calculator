import React from 'react';
import {
  InformationCircleIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface InfoCardProps {
  type?: 'info' | 'tip' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const cardStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    text: 'text-blue-800',
    defaultIcon: InformationCircleIcon,
  },
  tip: {
    container: 'bg-amber-50 border-amber-200',
    icon: 'text-amber-600',
    title: 'text-amber-900',
    text: 'text-amber-800',
    defaultIcon: LightBulbIcon,
  },
  warning: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    title: 'text-red-900',
    text: 'text-red-800',
    defaultIcon: ExclamationTriangleIcon,
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    title: 'text-green-900',
    text: 'text-green-800',
    defaultIcon: CheckCircleIcon,
  },
};

export default function InfoCard({
  type = 'info',
  title,
  children,
  icon,
}: InfoCardProps) {
  const styles = cardStyles[type];
  const IconComponent = styles.defaultIcon;

  return (
    <div
      className={`my-6 rounded-xl border-l-4 ${styles.container} p-6`}
    >
      <div className="flex gap-4">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {icon || <IconComponent className="w-6 h-6" />}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-2 ${styles.title}`}>
              {title}
            </h4>
          )}
          <div className={`text-sm leading-relaxed ${styles.text}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
