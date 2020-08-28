import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { CalculatorService } from '../../services/calculator.service';
import { Constants } from '../../util/constants';
import { NewRegime2020 } from '../../models/new-regime2020';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TaxUtil } from '../../util/tax-util';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-income-tax',
  templateUrl: './income-tax.component.html',
  styleUrls: ['./income-tax.component.scss']
})
export class IncomeTaxComponent implements OnInit {

  salary = 1000000;
  isEdit = false;
  totalNewRegimeTax: number = 0;
  newRegime: NewRegime2020;
  taxInWords = "";
  maxSalarySlider = 5000000;

  private calculateSubj: Subject < boolean > = new Subject();

  constructor(private toastService: ToastService) {}

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
    if(this.salary > this.maxSalarySlider - 1000000) {
      this.maxSalarySlider = this.salary + 1000000;
    }
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
   
      this.newRegime =new NewRegime2020(this.salary);
      this.totalNewRegimeTax =this.newRegime.taxPayable;
      this.taxInWords  = CalculatorService.inWords(this.totalNewRegimeTax);
    if(this.salary<500000){
        this.toastService.success("No need to worry about tax buddy, Chillax!!");
      
    }
  }

}
