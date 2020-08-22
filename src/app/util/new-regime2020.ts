import {
  Constants
} from "./constants";

export class NewRegime2020 {


  static getTotalTaxableAmount(salary: number): number {
    return salary - this.deductNps(salary);
  }

  static calculateBase(salary: number): number {
    return Math.floor(salary * Constants.SALARY_BASE_PERCENT / 100);
  }

  static deductionOnBase(salary: number, percent: number): number {
    return (this.calculateBase(salary) * percent / 100);
  }

  static deductNps(salary: number): number { 
    return this.deductionOnBase(salary, 10);
  }
}
