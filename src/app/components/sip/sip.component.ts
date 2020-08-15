import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-sip',
  templateUrl: './sip.component.html',
  styleUrls: ['./sip.component.scss']
})
export class SipComponent implements OnInit {

  amount = 3000;
  total = 0;
  months = 12;
  interest = 12;
  constructor(private calcService: CalculatorService) { }

  formatMonth(value: number) {
    if (value >= 12) {
      return Math.round(value / 12) + 'yr';
    }
    return value;
  }

  formatInterest(value: number) {
    return value + '%';
  }

  formatAmount(value: number) {
    if (value >= 1000) {
      return Number(value / 1000).toPrecision(2) + 'k';
    }
    return value;
  }

  ngOnInit(): void {
    this.total = CalculatorService.getMonthlySip(this.amount,this.interest,this.months);
  }

  amountChanged($event:MatSliderChange ){
    this.amount = $event.value;
    this.total = CalculatorService.getMonthlySip(this.amount,this.interest,this.months);
  }

  inputChange(){
    this.total = CalculatorService.getMonthlySip(this.amount,this.interest,this.months);
  }

  interestChanged($event:MatSliderChange ){
    this.interest = $event.value;
    this.total = CalculatorService.getMonthlySip(this.amount,this.interest,this.months);
  }

  monthsChanged($event:MatSliderChange ){
    this.months = $event.value;
    this.total = CalculatorService.getMonthlySip(this.amount,this.interest,this.months);
  }

}
