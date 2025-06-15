import { getFrequencyComparison } from '@/lib/calculations';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';


export default function FrequencyComparison() {
  const comparisons = getFrequencyComparison();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-3">SIP Frequency Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {comparisons.map((comparison) => (
          <div
            key={comparison.frequency}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4"
          >
            <h4 className="text-lg font-semibold capitalize">
              {comparison.frequency} SIP
            </h4>
            
            <div>
              <h5 className="text-sm font-medium text-green-600 flex items-center gap-1 mb-2">
                <CheckCircleIcon className="h-4 w-4" />
                Advantages
              </h5>
              <ul className="space-y-2">
                {comparison.pros.map((pro, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-medium text-red-600 flex items-center gap-1 mb-2">
                <XCircleIcon className="h-4 w-4" />
                Limitations
              </h5>
              <ul className="space-y-2">
                {comparison.cons.map((con, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 