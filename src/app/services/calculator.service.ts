import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() {}

  public static getMonthlySip(amt: number, interest: number, months: number): number {
    const i = (interest / 100) / 12;
    return amt * ((Math.pow((1 + i), months) - 1) / i) * (1 + i);
  }

  public static getMonthlySipByYear(amt: number, interest: number, year: number): number {
    let months = year *12
    const i = (interest / 100) / 12;
    return amt * ((Math.pow((1 + i), months) - 1) / i) * (1 + i);
  }

  public static numInWords(price): string {
    // let sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    //   dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
    //   tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
    //   handle_tens = function(dgt, prevDgt) {
    //     return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
    //   },
    //   handle_utlc = function(dgt, nxtDgt, denom) {
    //     return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
    //   };
  
    // let str = "",
    //   digitIdx = 0,
    //   digit = 0,
    //   nxtDigit = 0,
    //   words = [];      
    // if (price += "", isNaN(parseInt(price))) str = "";
    // else if (parseInt(price) > 0 && price.length <= 10) {
    //   for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
    //     case 0:
    //       words.push(handle_utlc(digit, nxtDigit, ""));
    //       break;
    //     case 1:
    //       words.push(handle_tens(digit, price[digitIdx + 1]));
    //       break;
    //     case 2:
    //       words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
    //       break;
    //     case 3:
    //       words.push(handle_utlc(digit, nxtDigit, "Thousand"));
    //       break;
    //     case 4:
    //       words.push(handle_tens(digit, price[digitIdx + 1]));
    //       break;
    //     case 5:
    //       words.push(handle_utlc(digit, nxtDigit, "Lakh"));
    //       break;
    //     case 6:
    //       words.push(handle_tens(digit, price[digitIdx + 1]));
    //       break;
    //     case 7:
    //       words.push(handle_utlc(digit, nxtDigit, "Crore"));
    //       break;
    //     case 8:
    //       words.push(handle_tens(digit, price[digitIdx + 1]));
    //       break;
    //     case 9:
    //       words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
    //   } 
    //   str = words.reverse().join("")
    // } else str = "";
    return this.inWords(price)
  
  }

 
static inWords (num) {
  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
  
    if ((num = num.toString()).length > 9) return 'More than 99 crores';
    var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (Number(n[1]) != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (Number(n[2]) != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (Number(n[3]) != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (Number(n[4]) != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (Number(n[5]) != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}
}
