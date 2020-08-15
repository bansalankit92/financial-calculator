import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  public static getMonthlySip(amt: number, interest:number, months: number):number{
    const i = (interest/100)/months;    
    return amt*((Math.pow((1+i),months)-1)/i)*(1+i);
  }
}
