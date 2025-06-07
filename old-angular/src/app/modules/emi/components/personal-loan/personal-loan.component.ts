import { Component, OnInit } from '@angular/core';
import { Emi } from '../../../../models/emi';

@Component({
  selector: 'app-personal-loan',
  templateUrl: './personal-loan.component.html',
  styleUrls: ['./personal-loan.component.scss']
})
export class PersonalLoanComponent implements OnInit {

  emi:Emi;
  maxAmt = 3000000;
  maxStep = 10000;
  constructor() { }

  ngOnInit(): void {
    this.emi = new Emi(200000,14,3);
  }

}
