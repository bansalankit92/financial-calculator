export type SIPFrequency = 'monthly' | 'quarterly' | 'yearly' | 'weekly';

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