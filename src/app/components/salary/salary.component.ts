import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { NewRegime2020 } from '../../models/new-regime2020';
import { OldRegime } from '../../models/old-regime19';
import { Subject } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { debounceTime } from 'rxjs/operators';
import { CalculatorService } from '../../modules/shared/services/calculator.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {

  salary = 1000000;
  isEdit = false;
  totalNewRegimeTax: number = 0;
  newRegime: NewRegime2020;
  taxInWords = "";
  maxSalarySlider = 5000000;
  oldRegime: OldRegime;
  regimeType = "old";

  private calculateSubj: Subject < boolean > = new Subject();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.getOldRegimeTax();
    this.getNewRegimeTax();
    this.calculateSubj.pipe(debounceTime(100)).subscribe(val => {
      this.getNewRegimeTax();
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
    if(this.salary > this.maxSalarySlider - 1000000) {
      this.maxSalarySlider = this.salary + 1000000;
    }
  }
  baseChange(){
    OldRegime.calculate(this.oldRegime);
    NewRegime2020.calculate(this.newRegime)
  }
  inputChange() {
    OldRegime.calculate(this.oldRegime);
   // this.updateTax();
  }

  inwords(): string {
    return CalculatorService.inWords(this.salary);
  }

  updateTax(): void {
    this.calculateSubj.next(true)
  }
  salaryUpdate() {
    this.updateTax();
  }
  getNewRegimeTax() {
      this.newRegime =new NewRegime2020(this.salary);
      this.totalNewRegimeTax =this.newRegime.taxPayable;
      this.taxInWords  = CalculatorService.inWords(this.totalNewRegimeTax);
  }

  getOldRegimeTax() {
    this.oldRegime = new OldRegime(this.salary);    
    this.taxInWords = CalculatorService.inWords(this.oldRegime.taxPayable);    
  }

}
