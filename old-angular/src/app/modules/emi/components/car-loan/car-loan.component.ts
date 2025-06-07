import { Component, OnInit } from '@angular/core';
import { Emi } from '../../../../models/emi';

@Component({
  selector: 'app-car-loan',
  templateUrl: './car-loan.component.html',
  styleUrls: ['./car-loan.component.scss']
})
export class CarLoanComponent implements OnInit {

  emi:Emi;
  maxAmt = 5000000;
  maxStep = 10000;
  constructor() { }

  ngOnInit(): void {
    this.emi = new Emi(800000,9,5);
  }
}
