import { Component, OnInit } from '@angular/core';
import { NewRegime2020 } from '../../models/new-regime2020';
import { Subject } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { debounceTime } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';
import { CalculatorService } from '../../modules/shared/services/calculator.service';
import { OldRegime } from '../../models/old-regime19';

@Component({
  selector: 'app-old-vs-new-income-tax',
  templateUrl: './old-vs-new-income-tax.component.html',
  styleUrls: ['./old-vs-new-income-tax.component.scss'],
})
export class OldVsNewIncomeTaxComponent implements OnInit {
  salary = 1000000;
  isEdit = false;
  totalNewRegimeTax: number = 0;
  newRegime: NewRegime2020 = new NewRegime2020(this.salary);
  taxInWords = '';
  maxSalarySlider = 5000000;
  oldRegime: OldRegime = new OldRegime(this.salary);

  private calculateSubj: Subject<boolean> = new Subject();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.getBothRegime();
    this.calculateSubj.pipe(debounceTime(100)).subscribe((val) => {
      this.getBothRegime();
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
    this.baseChange();
    // this.updateTax();
  }

  baseChange() {
    OldRegime.calculate(this.oldRegime);
    NewRegime2020.calculate(this.newRegime);
  }

  inwords(): string {
    return CalculatorService.inWords(this.salary);
  }

  updateTax(): void {
    this.newRegime.newSalary(this.salary);
    this.oldRegime.newSalary(this.salary);
    this.calculateSubj.next(true);
  }
  salaryUpdate() {
    this.updateTax();
  }

  getBothRegime() {
    this.inputChange();
    this.getNewRegimeTax();
    this.getOldRegimeTax();
  }

  getNewRegimeTax() {
    this.totalNewRegimeTax = this.newRegime.taxPayable;
    this.taxInWords = CalculatorService.inWords(this.totalNewRegimeTax);
  }

  getOldRegimeTax() {
    this.taxInWords = CalculatorService.inWords(this.oldRegime.taxPayable);
  }
}
