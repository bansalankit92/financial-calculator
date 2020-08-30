import {
  TaxUtil
} from "../util/tax-util";
import {
  Constants
} from "../util/constants";

export class OldRegime {
  salaryCtc: number = 0;
  salaryM: number = 0;
  baseSalaryY: number = 0;
  baseSalaryM: number = 0;
  deductions: number = 0;
  dedhra: number = 0; // 10% 
  standardDed: number = 0; // 50
  dedprofTax = 2400
  dedconveyance: number = 0;
  ded80C: number = 0; // 150000 = 
  dedccd: number = 0; // 50
  ded80D: number = 0; // 25
  dedeea: number = 0; //  2 lakh house loan interest
  dedepf: number = 0;
  dedpf: number = 0;
  dedgratuity: number = 0;
  dedlta: number = 0;
  ded80g: number = 0; // donations
  ded80e: number = 0; // education loan
  zeroPercent: number = 0;
  fivePercent: number = 0;
  twentyPercent: number = 0;
  thirtyPercent: number = 0;
  amtAfterDeductions: number = 0;
  taxBeforeCess: number = 0;
  cess: number = 0;
  taxPayable: number = 0;


  constructor(salary: number) {
    this.salaryCtc = salary;
    this.salaryM = salary / 12;
    this.baseSalaryY = TaxUtil.calculateBase(salary);
    this.baseSalaryM = this.baseSalaryY / 12;

    this.dedhra = TaxUtil.getTaxValue(salary, 10); // 10% 
    this.standardDed = 50000; // 50
    this.dedprofTax = 2400
    this.dedconveyance = TaxUtil.getTaxValue(salary, 2);
    this.ded80C = 0; // 150000 = 
    this.dedccd = 0; // 50
    this.ded80D = 0; // 25
    this.dedeea = 0; //  2 lakh house loan interest
    this.dedepf = TaxUtil.getTaxValue(this.baseSalaryY, 12);
    this.dedpf = this.dedepf;
    this.dedgratuity = TaxUtil.getTaxValue(this.baseSalaryY, 5);;
    this.dedlta = 0;
    this.ded80g = 0; // donations
    this.ded80e = 0; // education loan

    OldRegime.calculate(this);
  }

  static calculate(old: OldRegime) {
   
    
    old.baseSalaryY = old.baseSalaryM*12;
    old.dedepf = TaxUtil.getTaxValue(old.baseSalaryY, 12);
    old.dedpf = old.dedepf;
    old.dedgratuity = TaxUtil.getTaxValue(old.baseSalaryY, 5);;
    old.deductions = old.dedhra + old.standardDed + old.dedprofTax + old.dedconveyance +
      old.ded80C + old.dedccd + old.ded80D + old.dedeea + old.dedepf + old.dedpf + old.dedgratuity +
      old.dedlta + old.ded80g + old.ded80e;
    let totalTaxable = old.amtAfterDeductions = old.salaryCtc - old.deductions;
    let tax = 0;
    if (totalTaxable <= 250000) {
      old.zeroPercent = tax = 0;
    } else if (totalTaxable <= 500000) {
      totalTaxable -= 1 * 250000;
      old.fivePercent = tax += TaxUtil.getTaxValue(totalTaxable, 5);
    } else
    if (totalTaxable <= 1000000) {
      old.fivePercent = tax += TaxUtil.getTaxValue(250000, 5);
      totalTaxable -= 500000;
      old.twentyPercent = tax += TaxUtil.getTaxValue(totalTaxable, 20);
    } else {
      old.fivePercent = tax += TaxUtil.getTaxValue(250000, 5);
      old.twentyPercent = tax += TaxUtil.getTaxValue(250000, 20);
      totalTaxable -= 1000000;
      old.thirtyPercent = tax += TaxUtil.getTaxValue(totalTaxable, 30);
    }
    old.taxBeforeCess = tax;
    old.cess = (tax * Constants.EDUCATION_CESS / 100);
    old.taxPayable = tax + old.cess;
  }
}
