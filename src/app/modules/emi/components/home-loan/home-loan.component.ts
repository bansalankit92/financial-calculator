import { Component, OnInit } from '@angular/core';
import { Emi } from '../../../../models/emi';

@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.scss']
})
export class HomeLoanComponent implements OnInit {

  emi:Emi;
  maxAmt = 20000000;
  maxStep = 50000;
  constructor() { }

  ngOnInit(): void {
    this.emi = new Emi(5000000,9,25);
  }

}
