export function calculateSIP(
  monthlyInvestment: number,
  interestRate: number,
  years: number
) {
  const monthlyRate = interestRate / 12 / 100;
  const months = years * 12;
  const totalInvestment = monthlyInvestment * months;

  // Formula: P * (((1 + r)^n - 1) / r) * (1 + r)
  const totalValue = monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate);

  const totalReturns = totalValue - totalInvestment;

  return {
    totalInvestment: Math.round(totalInvestment),
    totalReturns: Math.round(totalReturns),
    totalValue: Math.round(totalValue)
  };
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