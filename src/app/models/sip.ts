import { CalculatorService } from "../services/calculator.service";

export class Sip {
  yr: number;
  amt: number;
  total: number;
  earn: number;

  constructor(
    amt: number,
    interest: number,
    year: number) {

    let total =  CalculatorService.getMonthlySipByYear(amt,interest,year);
        this.yr = year;
        this.amt = amt;
        this.total = total;
        this.earn = this.earnings();
  }

  earnings(): number {
    return Math.round(this.total - (this.amt * this.yr*12));
  }
}
