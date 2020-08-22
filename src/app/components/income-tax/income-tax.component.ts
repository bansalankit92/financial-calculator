import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { CalculatorService } from '../../services/calculator.service';
import { Constants } from '../../util/constants';
import { NewRegime2020 } from '../../util/new-regime2020';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-income-tax',
  templateUrl: './income-tax.component.html',
  styleUrls: ['./income-tax.component.scss']
})
export class IncomeTaxComponent implements OnInit {

  salary = 1000000;
  isEdit = false;
  totalNewRegimeTax: number = 0;
  private calculateSubj: Subject < boolean > = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.getNewRegimeTax();
    this.calculateSubj.pipe(debounceTime(100)).subscribe(val => {
      this.getNewRegimeTax();
    });
  }
  formatSalary(value: number) {
    if (value >= 100000) {
      return Number(value / 100000).toPrecision(2) + 'LPA';
    }
    return value;
  }

  salaryChanged($event: MatSliderChange) {
    this.salary = $event.value;
    this.updateTax();
  }

  inputChange() {
    this.updateTax();
  }

  inwords(): string {
    return CalculatorService.inWords(this.salary);
  }

  updateTax(): void {
    this.calculateSubj.next(true)
  }

  getNewRegimeTax() {
    let tax = this.calculateNewRegimeTax();
    this.totalNewRegimeTax = tax + (tax * Constants.EDUCATION_CESS / 100);
  }

  calculateNewRegimeTax(): number {
    let tax = 0;
    let totalTaxable = this.getTotalTaxableAmount();

    if (totalTaxable <= 250000) {
      return tax;
    }
    if (totalTaxable <= 500000) {
      totalTaxable -= 1 * 250000;
      tax += this.getTaxValue(totalTaxable, 5);
      return tax;
    }
    tax += this.getTaxValue(250000, 5);
    if (totalTaxable <= 750000) {
      totalTaxable -= 2 * 250000;
      tax += this.getTaxValue(totalTaxable, 10);
      return tax;
    }
    tax += this.getTaxValue(250000, 10);
    if (totalTaxable <= 1000000) {
      totalTaxable -= 3 * 250000;
      tax += this.getTaxValue(totalTaxable, 15);
      return tax;
    }
    tax += this.getTaxValue(250000, 15);
    if (totalTaxable <= 1250000) {
      totalTaxable -= 4 * 250000;
      tax += this.getTaxValue(totalTaxable, 20);
      return tax;
    }
    tax += this.getTaxValue(250000, 20);
    if (totalTaxable <= 1500000) {
      totalTaxable -= 5 * 250000;
      tax += this.getTaxValue(totalTaxable, 25);
      return tax;
    }
    tax += this.getTaxValue(250000, 25);
    totalTaxable -= 6 * 250000;
    tax += this.getTaxValue(totalTaxable, 30);
    return tax;
  }

  getTaxValue(amount: number, percent: number): number {
    if (percent <= 0) return 0;
    return amount * percent / 100;
  }

  getTotalTaxableAmount(): number {
    return NewRegime2020.getTotalTaxableAmount(this.salary);
  }

}
