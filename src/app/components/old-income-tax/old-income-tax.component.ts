import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { debounceTime } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';
import { CalculatorService } from '../../modules/shared/services/calculator.service';
import { OldRegime } from '../../models/old-regime19';
import { Constants } from '../../util/constants';

@Component({
  selector: 'app-old-income-tax',
  templateUrl: './old-income-tax.component.html',
  styleUrls: ['./old-income-tax.component.scss'],
})
export class OldIncomeTaxComponent implements OnInit {
  salary = 1000000;
  isEdit = false;
  oldRegime: OldRegime = new OldRegime(1000000);
  taxInWords = '';
  maxSalarySlider = 5000000;

  private calculateSubj: Subject<boolean> = new Subject();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.getOldRegimeTax();
    this.calculateSubj.pipe(debounceTime(100)).subscribe((val) => {
      this.getOldRegimeTax();
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

  salaryUpdate() {
    this.updateTax();
  }
  inputChange() {
    OldRegime.calculate(this.oldRegime);
  }

  inwords(): string {
    return CalculatorService.inWords(this.salary);
  }

  updateTax(): void {
    this.oldRegime.newSalary(this.salary);
    this.calculateSubj.next(true);
  }

  getOldRegimeTax() {
    this.inputChange();
    this.taxInWords = CalculatorService.inWords(this.oldRegime.taxPayable);
    if (this.salary < 500000) {
      this.toastService.success('No need to worry about tax buddy, Chillax!!');
    }
  }
}
