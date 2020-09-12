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
  dedconveyance: number = 19200;
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
  takeHomeY: number = 0;
  takeHomeM: number = 0;
  savings = 0;
  gross: number = 0;

  constructor(salary: number) {
    this.salaryCtc = salary;
    this.salaryM = salary / 12;
    this.baseSalaryY = TaxUtil.calculateBase(salary);
    this.baseSalaryM = this.baseSalaryY / 12;
    this.dedepf = TaxUtil.getTaxValue(this.baseSalaryY, 12);
    this.dedpf = this.dedepf;
    this.dedhra = TaxUtil.getTaxValue(salary, 10); // 10% 
    this.standardDed = 50000; // 50
    this.dedprofTax = 2400
    this.dedconveyance = 19200;
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

    if(salary>2000000){
      this.dedhra = 120000;
    }
    OldRegime.calculate(this);
  }


  static calculate(old: OldRegime) {
    if( old.baseSalaryM*12 === old.baseSalaryY){
        old.dedepf = old.dedpf;
    }else{
      old.baseSalaryY = old.baseSalaryM*12;
      old.dedpf = TaxUtil.getTaxValue(old.baseSalaryY, 12);
      old.dedepf = old.dedpf;
      old.dedgratuity = TaxUtil.getTaxValue(old.baseSalaryY, 5);
    }
    old.dedconveyance = 19200;
    old.deductions = old.dedhra + old.standardDed + old.dedprofTax +
       + old.dedccd + old.ded80D + old.dedeea +  Math.min((old.ded80C+old.dedepf + old.dedpf),150000) 
        + old.dedlta + old.ded80g + old.ded80e;
    let totalTaxable = old.amtAfterDeductions = old.salaryCtc - old.deductions;
   
    if (totalTaxable <= 250000) {
      old.zeroPercent = 0;
    } else if (totalTaxable <= 500000) {
      totalTaxable -= 1 * 250000;
      old.fivePercent = TaxUtil.getTaxValue(totalTaxable, 5);
    } else
    if (totalTaxable <= 1000000) {
      old.fivePercent = TaxUtil.getTaxValue(250000, 5);
      totalTaxable -= 500000;
      old.twentyPercent = TaxUtil.getTaxValue(totalTaxable, 20);
    } else {
      old.fivePercent = TaxUtil.getTaxValue(250000, 5);
      old.twentyPercent = TaxUtil.getTaxValue(500000, 20);
      totalTaxable -= 1000000;
      old.thirtyPercent = TaxUtil.getTaxValue(totalTaxable, 30);
    }
    old.taxBeforeCess =  old.fivePercent +  old.twentyPercent  +  old.thirtyPercent ;
    old.cess = (old.taxBeforeCess * Constants.EDUCATION_CESS / 100);
    old.taxPayable = old.taxBeforeCess + old.cess;
    old.takeHomeY = old.salaryCtc - old.taxPayable - old.deductions + old.dedhra + old.dedconveyance + old.ded80C;
    old.takeHomeM = Math.round(old.takeHomeY/12);
    old.gross = old.salaryCtc - old.dedepf - old.dedgratuity;
  }
}
