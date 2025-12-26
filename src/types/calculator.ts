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

export type StepUpFrequency = 'monthly' | 'yearly';
export type StepUpType = 'percentage' | 'amount';

export interface StepUpCalculationParams {
  initialInvestment: number;
  stepUpValue: number;
  stepUpType: StepUpType;
  stepUpFrequency: StepUpFrequency;
  interestRate: number;
  years: number;
}

export interface StepUpCalculationResult {
  totalInvestment: number;
  totalReturns: number;
  totalValue: number;
  yearlyBreakdown: {
    year: number;
    investment: number;
    cumulativeInvestment: number;
    value: number;
  }[];
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