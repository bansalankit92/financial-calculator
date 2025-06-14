export type SIPFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface SIPCalculationParams {
  investment: number;
  interestRate: number;
  years: number;
  frequency: SIPFrequency;
}

export interface SIPCalculationResult {
  totalInvestment: number;
  totalReturns: number;
  totalValue: number;
}

export interface EMICalculationParams {
  principal: number;
  interestRate: number;
  years: number;
}

export interface EMICalculationResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  yearlyBreakup: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalPayment: number;
    months: {
      month: string;
      principalPaid: number;
      interestPaid: number;
      totalPayment: number;
      balance: number;
    }[];
  }[];
} 