import {
  TaxUtil
} from "../util/tax-util";
import {
  Constants
} from "../util/constants";
import { OldVsNewIncomeTaxComponent } from "../components/old-vs-new-income-tax/old-vs-new-income-tax.component";

export class NewRegime2020 {

  salaryCtc: number = 0;
  salaryMonthly: number = 0;
  baseSalaryY: number = 0;
  baseSalaryM: number = 0;
  deductions: number = 0;
  empNps: number = 0;
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
  takeHomeY: number = 0;
  takeHomeM: number = 0;
  gratuity: number = 0
  profTax: number = 2400;
  isGratuity:boolean = true;
  pf:number = 0;
  epf:number = 0;

  constructor(readonly salary: number) {
    this.salaryCtc = salary;
    this.salaryMonthly = salary / 12;
    this.baseSalaryY = TaxUtil.calculateBase(this.salaryCtc);
    this.baseSalaryM = this.baseSalaryY / 12;
    this.empNps = TaxUtil.getTaxValue(this.baseSalaryY, 10);
    this.gratuity = this.isGratuity? TaxUtil.getTaxValue(this.baseSalaryY, 5):0;
    NewRegime2020.calculate(this);
  }

  static calculate(newR: NewRegime2020) {
    if (newR.baseSalaryM * 12 === newR.baseSalaryY) {

    } else {
      newR.baseSalaryY = newR.baseSalaryM * 12;
      newR.empNps = TaxUtil.getTaxValue(newR.baseSalaryY, 10);
      newR.gratuity = newR.isGratuity? TaxUtil.getTaxValue(newR.baseSalaryY, 5):0;
    }
    newR.deductions = newR.empNps;
    
    let totalTaxable = newR.amtAfterDeductions = newR.salaryCtc - newR.deductions;
    if (totalTaxable <= 250000) {
      newR.zeroPercent = 0;
    } else if (totalTaxable <= 500000) {
      totalTaxable -= 1 * 250000;
      newR.fivePercent = TaxUtil.getTaxValue(totalTaxable, 5);
    } else
    if (totalTaxable <= 750000) {
      newR.fivePercent = TaxUtil.getTaxValue(250000, 5);
      totalTaxable -= 2 * 250000;
      newR.tenPercent = newR.fivePercent + TaxUtil.getTaxValue(totalTaxable, 10);
    } else
    if (totalTaxable <= 1000000) {
      newR.fivePercent = TaxUtil.getTaxValue(250000, 5);
      newR.tenPercent = TaxUtil.getTaxValue(250000, 10);
      totalTaxable -= 3 * 250000;
      newR.fifteenPercent = TaxUtil.getTaxValue(totalTaxable, 15);
    } else
    if (totalTaxable <= 1250000) {
      newR.fivePercent = TaxUtil.getTaxValue(250000, 5);
      newR.tenPercent = TaxUtil.getTaxValue(250000, 10);
      newR.fifteenPercent = TaxUtil.getTaxValue(250000, 15);
      totalTaxable -= 4 * 250000;
      newR.twentyPercent = TaxUtil.getTaxValue(totalTaxable, 20);
    } else
    if (totalTaxable <= 1500000) {
      newR.fivePercent = TaxUtil.getTaxValue(250000, 5);
      newR.tenPercent = TaxUtil.getTaxValue(250000, 10);
      newR.fifteenPercent = TaxUtil.getTaxValue(250000, 15);
      newR.twentyPercent = TaxUtil.getTaxValue(250000, 20);
      totalTaxable -= 5 * 250000;
      newR.twentyFivePercent = TaxUtil.getTaxValue(totalTaxable, 25);
    } else {
      newR.fivePercent = TaxUtil.getTaxValue(250000, 5);
      newR.tenPercent = TaxUtil.getTaxValue(250000, 10);
      newR.fifteenPercent = TaxUtil.getTaxValue(250000, 15);
      newR.twentyPercent = TaxUtil.getTaxValue(250000, 20);
      newR.twentyFivePercent = TaxUtil.getTaxValue(250000, 25);
      totalTaxable -= 6 * 250000;
      newR.thirtyPercent = TaxUtil.getTaxValue(totalTaxable, 30);
    }
    newR.taxBeforeCess = newR.fivePercent + newR.tenPercent + newR.fifteenPercent 
    +  newR.twentyPercent + newR.twentyFivePercent + newR.thirtyPercent;
    newR.cess = (newR.taxBeforeCess * Constants.EDUCATION_CESS / 100);
    newR.taxPayable = newR.taxBeforeCess + newR.cess;
    newR.pf = newR.epf;
    newR.takeHomeY = newR.salaryCtc - newR.taxPayable - newR.deductions - newR.profTax -newR.gratuity - newR.pf - newR.epf;
    newR.takeHomeM = Math.round(newR.takeHomeY/12);
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
