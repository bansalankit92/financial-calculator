import { Pipe, PipeTransform, LOCALE_ID } from '@angular/core';
import { CurrencyPipe, getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'mycurrency'
})
export class MycurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: number, ...args: unknown[]): string {

    // based on locale update both
    return getCurrencySymbol("INR",'narrow') + Math.round(value).toLocaleString("en-IN")
    //this.currencyPipe.transform(value,"INR",true,'1.0-0');
  }

}
