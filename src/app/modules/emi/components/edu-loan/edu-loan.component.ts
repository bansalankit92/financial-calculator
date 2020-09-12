import { Component, OnInit } from '@angular/core';
import { Emi } from '../../../../models/emi';

@Component({
  selector: 'app-edu-loan',
  templateUrl: './edu-loan.component.html',
  styleUrls: ['./edu-loan.component.scss']
})
export class EduLoanComponent implements OnInit {

  emi:Emi;
  maxAmt = 10000000;
  maxStep = 10000;
  constructor() { }

  ngOnInit(): void {
    this.emi = new Emi(500000,9,10);
  }

}
