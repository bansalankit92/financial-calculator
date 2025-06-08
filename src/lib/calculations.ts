import { SIPFrequency, SIPCalculationResult } from '@/types/calculator';

const PAYMENTS_PER_YEAR: Record<SIPFrequency, number> = {
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