import React from 'react';

interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface StepGuideProps {
  title?: string;
  steps: Step[];
}

export default function StepGuide({ title, steps }: StepGuideProps) {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
      )}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                {step.icon || index + 1}
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
