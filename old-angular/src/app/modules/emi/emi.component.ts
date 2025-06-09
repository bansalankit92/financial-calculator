import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Emi, YearlyBreakup } from '../../models/emi';
import { Constants } from '../../util/constants';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatLegacySliderChange as MatSliderChange } from '@angular/material/legacy-slider';
import { CalculatorService } from '../shared/services/calculator.service';
@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.scss']
})
export class EmiComponent implements OnInit {

  @ViewChild('pieChartRef') pieChartRef: ElementRef;
  @ViewChild('multiChartRef') multiChartRef: ElementRef;

  @Input() emi: Emi = new Emi();
  @Input() maxAmt = 20000000;
  @Input() stepAmt = 1000;
  selectedYear: number = -1;
  colorScheme = Constants.CHART_PIE_COLOR_SCHEME;

  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Years';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'EMI Payment / year';
  animations: boolean = true;


  view = [200, 300];
  multichartView = [300, 400] // [300,400]
  single = [];
  multi = [];

  private calculateSubj: Subject < boolean > = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.selectedYear = new Date().getFullYear();
    this.calculateTotal();
    this.calculateSubj.pipe(debounceTime(100)).subscribe(val => {
      this.calculateTotal();
    });
    setTimeout(() => {
      this.updateView();
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
    this.emi.p = $event.value;
    this.updateTotal();
  }

  inputChange() {
    this.updateTotal();
  }

  interestChanged($event: MatSliderChange) {
    this.emi.r = $event.value;
    this.updateTotal();
  }

  yearsChanged($event: MatSliderChange) {
    this.emi.y = $event.value;
    this.emi.n = this.emi.y * 12;
    this.updateTotal();
  }

  private updateTotal() {
    this.calculateSubj.next(true)
  }

  private calculateTotal() {
    this.emi.calculate();
    this.calculateChart();
    this.updateView();
  }

  lesserThan(val1: number, val2: number) {
    return val1 < val2;
  }

  getValueInWords(value): string {
    return CalculatorService.numInWords(Math.round(value));
  }

  calculateChart() {
    this.single = [];
    this.single = [{
        "name": "Loan Amount",
        "value": this.emi.p
      },
      {
        "name": "Total Interest",
        "value": this.emi.totalInterest
      }
    ];

    this.multi = [];
    this.emi.yearlyBreakup.forEach((value: YearlyBreakup, key: number) => {
      this.multi.push({
        "name": key,
        "series": [{
            "name": "Principal Paid",
            "value": value.tppmt
          },
          {
            "name": "Interest Paid",
            "value": value.tipmt
          }
        ]
      });
    });

  }

  toggleRow(val: number) {
    this.selectedYear = this.selectedYear === val ? -1 : val;
  }

  onSelect(event) {
    this.selectedYear = event.series
  }

  updateView() {
    if (this.pieChartRef && this.pieChartRef.nativeElement)
      this.view = [this.pieChartRef.nativeElement.offsetWidth, 300];
    if (this.multiChartRef && this.multiChartRef.nativeElement)
      this.multichartView = [this.multiChartRef.nativeElement.offsetWidth, 400];
  }

}
