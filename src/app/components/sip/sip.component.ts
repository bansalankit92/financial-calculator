import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { CalculatorService } from '../../services/calculator.service';
import { Subject } from 'rxjs';
import {
  debounceTime
} from "rxjs/operators";
import { Sip } from '../../models/sip';
import { Constants } from '../../util/constants';

@Component({
  selector: 'app-sip',
  templateUrl: './sip.component.html',
  styleUrls: ['./sip.component.scss']
})
export class SipComponent implements OnInit {

  amount = Constants.SIP_BASE_AMT;
  total = 0;
  interest = Constants.SIP_BASE_INTEREST;
  years = Constants.SIP_BASE_YEARS;
  months = this.years * 12;
  colorScheme = Constants.CHART_PIE_COLOR_SCHEME;

  sipArr:Sip[] = [];

  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  single = [];

  private calculateSubj: Subject < boolean > = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.calculateTotal();
    this.calculateSubj.pipe(debounceTime(100)).subscribe(val => {
      this.calculateTotal();
    });
  }

  formatMonth(value: number) {
    if (value >= 12) {
      return Math.round(value / 12) + 'yr';
    }
    return value;
  }

  formatYear(value: number) {
    return value + ' yr';
  }

  formatInterest(value: number) {
    return value + '%';
  }

  formatAmount(value: number) {
    if (value >= 1000) {
      return Number(value / 1000) + 'k';
    }
    return value;
  }

  amountChanged($event: MatSliderChange) {
    this.amount = $event.value;
    this.updateTotal();
  }

  inputChange() {
    this.updateTotal();
  }

  interestChanged($event: MatSliderChange) {
    this.interest = $event.value;
    this.updateTotal();
  }

  yearsChanged($event: MatSliderChange) {
    this.years = $event.value;
    this.months = this.years * 12;
    this.updateTotal();
  }

  private updateTotal() {
    this.calculateSubj.next(true)
  }

  private calculateTotal() {
    this.total = this.getTotal();
    this.calculateChart();
    this.createTable();
  }

  getTotal(): number {
    return CalculatorService.getMonthlySip(this.amount, this.interest, this.months);
  }

  getValueInWords(value): string {
    return CalculatorService.numInWords(Math.round(value));
  }

  investedAmount(): number {
    return Math.round(this.amount * this.months);
  }

  earnings(): number {
    return Math.round(this.total - (this.amount * this.months));
  }

  calculateChart() {
    this.single = [];
    this.single = [{
        "name": "Invested Amount",
        "value": this.investedAmount()
      },
      {
        "name": "Earnings",
        "value": this.earnings()
      }
    ];
  }

  createTable(){
    this. sipArr= [];
    this.sipArr.push(new Sip(this.amount,this.interest,1));
    this.sipArr.push(new Sip(this.amount,this.interest,3));
    this. sipArr.push(new Sip(this.amount,this.interest,5));
    this. sipArr.push(new Sip(this.amount,this.interest,8));
    this. sipArr.push(new Sip(this.amount,this.interest,10));
    this. sipArr.push(new Sip(this.amount,this.interest,12));
    this. sipArr.push(new Sip(this.amount,this.interest,15));
    this. sipArr.push(new Sip(this.amount,this.interest,18));
    this. sipArr.push(new Sip(this.amount,this.interest,20));
    this. sipArr.push(new Sip(this.amount,this.interest,22));
    this. sipArr.push(new Sip(this.amount,this.interest,25));
    this. sipArr.push(new Sip(this.amount,this.interest,30));
    this. sipArr.push(new Sip(this.amount,this.interest,35));

  }

  tableClicked(item: Sip){
    this.years = item.yr;
    this.months = this.years * 12;
    this.updateTotal();
  }

}
