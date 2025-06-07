import { Constants } from "./constants";

export class TaxUtil{
    static getTaxValue(amount: number, percent: number): number {
        if (percent <= 0) return 0;
        return amount * percent / 100;
      }

      static calculateBase(salary: number): number {
        return Math.floor(salary * Constants.SALARY_BASE_PERCENT / 100);
      }
}