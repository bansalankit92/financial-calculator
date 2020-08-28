import {
  TaxUtil
} from "../util/tax-util";
import {
  Constants
} from "../util/constants";

export class NewRegime2020 {

  salaryCtc: number = 0;
  salaryMonthly: number = 0;
  baseSalaryY: number = 0;
  baseSalaryM: number = 0;
  deductions: number = 0;
  zeroPercent: number = 0;
  fivePercent: number = 0;
  tenPercent: number = 0;
  fifteenPercent: number = 0;
  twentyPercent: number = 0;
  twentyFivePercent: number = 0;
  thirtyPercent: number = 0;
  amtAfterDeductions: number = 0;
  taxBeforeCess: number = 0;
  taxPayable: number = 0;
  cess: number = 0;

  constructor(readonly salary: number) {
    this.salaryCtc = salary;
    this.salaryMonthly = salary / 12;
    this.baseSalaryY = TaxUtil.calculateBase(salary);
    this.baseSalaryM = this.baseSalaryY / 12;
    this.deductions = NewRegime2020.deductNps(salary);
    let totalTaxable = this.amtAfterDeductions = salary - this.deductions;
    let tax = 0;
    if (totalTaxable <= 250000) {
      this.zeroPercent = tax = 0;
    } else if (totalTaxable <= 500000) {
      totalTaxable -= 1 * 250000;
      this.fivePercent = tax += TaxUtil.getTaxValue(totalTaxable, 5);
    } else
    if (totalTaxable <= 750000) {
      this.fivePercent = tax += TaxUtil.getTaxValue(250000, 5);
      totalTaxable -= 2 * 250000;
      this.tenPercent = tax += TaxUtil.getTaxValue(totalTaxable, 10);
    } else
    if (totalTaxable <= 1000000) {
      this.fivePercent = tax += TaxUtil.getTaxValue(250000, 5);
      this.tenPercent = tax += TaxUtil.getTaxValue(250000, 10);
      totalTaxable -= 3 * 250000;
      this.fifteenPercent = tax += TaxUtil.getTaxValue(totalTaxable, 15);
    } else
    if (totalTaxable <= 1250000) {
      this.fivePercent = tax += TaxUtil.getTaxValue(250000, 5);
      this.tenPercent = tax += TaxUtil.getTaxValue(250000, 10);
      this.fifteenPercent = tax += TaxUtil.getTaxValue(250000, 15);
      totalTaxable -= 4 * 250000;
      this.twentyPercent = tax += TaxUtil.getTaxValue(totalTaxable, 20);
    } else
    if (totalTaxable <= 1500000) {
      this.fivePercent = tax += TaxUtil.getTaxValue(250000, 5);
      this.tenPercent = tax += TaxUtil.getTaxValue(250000, 10);
      this.fifteenPercent = tax += TaxUtil.getTaxValue(250000, 15);
      this.twentyPercent = tax += TaxUtil.getTaxValue(250000, 20);
      totalTaxable -= 5 * 250000;
      this.twentyFivePercent = tax += TaxUtil.getTaxValue(totalTaxable, 25);
    } else {
      this.fivePercent = tax += TaxUtil.getTaxValue(250000, 5);
      this.tenPercent = tax += TaxUtil.getTaxValue(250000, 10);
      this.fifteenPercent = tax += TaxUtil.getTaxValue(250000, 15);
      this.twentyPercent = tax += TaxUtil.getTaxValue(250000, 20);
      this.twentyFivePercent = tax += TaxUtil.getTaxValue(250000, 25);
      totalTaxable -= 6 * 250000;
      this.thirtyPercent = tax += TaxUtil.getTaxValue(totalTaxable, 30);
    }
    this.taxBeforeCess = tax;
    this.cess = (tax * Constants.EDUCATION_CESS / 100);
    this.taxPayable = tax + this.cess ;
  }

  static getTaxableAmountWihDeduction(salary: number): number {
    return salary - this.deductNps(salary);
  }

  static deductionOnBase(salary: number, percent: number): number {
    return (TaxUtil.calculateBase(salary) * percent / 100);
  }

  static deductNps(salary: number): number {
    return this.deductionOnBase(salary, 10);
  }

}
