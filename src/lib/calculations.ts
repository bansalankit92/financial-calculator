import { SIPFrequency, SIPCalculationResult } from '@/types/calculator';

export const PAYMENTS_PER_YEAR: Record<SIPFrequency, number> = {
  daily: 365,
  weekly: 52,
  monthly: 12,
  quarterly: 4,
  yearly: 1
};

export function calculateSIP(
  investment: number,
  interestRate: number,
  years: number,
  frequency: SIPFrequency = 'monthly'
): SIPCalculationResult {
  const paymentsPerYear = PAYMENTS_PER_YEAR[frequency];
  const totalPayments = years * paymentsPerYear;
  const ratePerPayment = interestRate / paymentsPerYear / 100;
  const totalInvestment = investment * totalPayments;

  // Formula: P * (((1 + r)^n - 1) / r) * (1 + r)
  const totalValue = investment * 
    ((Math.pow(1 + ratePerPayment, totalPayments) - 1) / ratePerPayment) * 
    (1 + ratePerPayment);

  const totalReturns = totalValue - totalInvestment;

  return {
    totalInvestment: Math.round(totalInvestment),
    totalReturns: Math.round(totalReturns),
    totalValue: Math.round(totalValue)
  };
}

export function getInvestmentLabel(frequency: SIPFrequency): string {
  switch (frequency) {
    case 'daily':
      return 'Daily Investment';
    case 'weekly':
      return 'Weekly Investment';
    case 'monthly':
      return 'Monthly Investment';
    case 'quarterly':
      return 'Quarterly Investment';
    case 'yearly':
      return 'Yearly Investment';
  }
}

export function getDefaultInvestment(frequency: SIPFrequency): number {
  switch (frequency) {
    case 'daily':
      return 100;
    case 'weekly':
      return 1000;
    case 'monthly':
      return 3000;
    case 'quarterly':
      return 9000;
    case 'yearly':
      return 36000;
  }
}

export function getMaxInvestment(frequency: SIPFrequency): number {
  switch (frequency) {
    case 'daily':
      return 10000;
    case 'weekly':
      return 100000;
    case 'monthly':
      return 500000;
    case 'quarterly':
      return 1500000;
    case 'yearly':
      return 6000000;
  }
}

export function calculateWealthGrowth(monthlyInvestment: number, interestRate: number) {
  const years = [1, 3, 5, 8, 10, 12, 15, 18, 20, 22, 25, 30, 35];
  
  return years.map(year => {
    const { totalValue, totalReturns } = calculateSIP(monthlyInvestment, interestRate, year);
    return {
      duration: year,
      monthlyAmount: monthlyInvestment,
      totalValue,
      wealthGain: totalReturns
    };
  });
}

export function getFrequencyComparison(monthlyAmount: number): { frequency: SIPFrequency; pros: string[]; cons: string[] }[] {
  return [
    {
      frequency: 'daily',
      pros: [
        'Maximum power of compounding',
        'Smaller amounts, easier on daily budget',
        'More investment opportunities to average out market volatility',
        'Better for short-term goals'
      ],
      cons: [
        'More transaction costs if not automated',
        'Requires strict daily discipline',
        'May be overwhelming to track',
        'Some platforms may not support daily SIPs'
      ]
    },
    {
      frequency: 'weekly',
      pros: [
        'Good balance of compounding benefits',
        'Better market averaging than monthly',
        'Aligns well with weekly income',
        'More flexible than daily commitment'
      ],
      cons: [
        'Requires more active management than monthly',
        'Weekly commitment might be challenging',
        'Higher transaction costs than monthly'
      ]
    },
    {
      frequency: 'monthly',
      pros: [
        'Most common and widely supported',
        'Aligns with monthly salary cycles',
        'Easy to maintain and track',
        'Good balance of compounding and convenience'
      ],
      cons: [
        'Less frequent market averaging compared to weekly/daily',
        'Might miss some market opportunities',
        'Monthly lump sum might be harder to spare'
      ]
    },
    {
      frequency: 'quarterly',
      pros: [
        'Lower transaction costs',
        'Good for long-term investors',
        'Easier to manage larger sums',
        'Less frequent monitoring needed'
      ],
      cons: [
        'Miss out on short-term market opportunities',
        'Less benefit from rupee cost averaging',
        'Larger amounts needed per investment'
      ]
    },
    {
      frequency: 'yearly',
      pros: [
        'Lowest transaction costs',
        'Good for annual bonus investments',
        'Minimal monitoring required',
        'Suitable for very long-term goals'
      ],
      cons: [
        'Minimal benefit from rupee cost averaging',
        'Miss out on compounding benefits',
        'Requires larger lump sum amounts',
        'Higher risk of timing the market wrong'
      ]
    }
  ];
} 