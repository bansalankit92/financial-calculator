import { Component, OnInit } from '@angular/core';
import { MatLegacySliderChange as MatSliderChange } from '@angular/material/legacy-slider';
import { CalculatorService } from '../../modules/shared/services/calculator.service';
import { NewRegime2020 } from '../../models/new-regime2020';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-income-tax',
  templateUrl: './income-tax.component.html',
  styleUrls: ['./income-tax.component.scss'],
})
export class IncomeTaxComponent implements OnInit {
  salary = 1000000;
  isEdit = false;
  totalNewRegimeTax: number = 0;
  newRegime: NewRegime2020 = new NewRegime2020(this.salary);
  taxInWords = '';
  maxSalarySlider = 5000000;

  private calculateSubj: Subject<boolean> = new Subject();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.getNewRegimeTax();
    this.calculateSubj.pipe(debounceTime(100)).subscribe((val) => {
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
    if (this.salary > this.maxSalarySlider - 1000000) {
      this.maxSalarySlider = this.salary + 1000000;
    }
  }

  inputChange() {
    this.updateTax();
  }

  baseChange() {
    NewRegime2020.calculate(this.newRegime);
  }

  inwords(): string {
    return CalculatorService.inWords(this.salary);
  }

  updateTax(): void {
    this.newRegime.newSalary(this.salary);
    this.calculateSubj.next(true);
  }

  getNewRegimeTax() {
    this.inputChange();
    this.totalNewRegimeTax = this.newRegime.taxPayable;
    this.taxInWords = CalculatorService.inWords(this.totalNewRegimeTax);
    if (this.salary < 500000) {
      this.toastService.success('No need to worry about tax buddy, Chillax!!');
    }
  }
}
