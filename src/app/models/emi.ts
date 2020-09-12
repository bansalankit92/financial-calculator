export class Breakup {
  year: number = 0;
  ppmt: number = 0;
  ipmt: number = 0;
  pmt: number = 0;
  bal: number = 0;
  month: string;
}

export class YearlyBreakup {
  year: number = 0;
  tppmt: number = 0;
  tipmt: number = 0;
  tpmt: number = 0;
  tbal: number = 0;
  months: Breakup[] = [];
}

export class Emi {
  p: number = 100000;
  r: number = 10;
  rate: number = 0;
  y: number = 5;
  n: number = this.y * 12;
  emi: number;
  totalEmi: number;
  totalInterest: number = 0;
  breakup: Breakup[] = [];
  yearlyBreakup = new Map < number, YearlyBreakup > ();

  constructor(p ? : number, i ? : number, y ? : number) {
    if (p)
      this.p = p;
    if (i)
      this.r = i;
    if (y) {
      this.y = y;
      this.n = y * 12;
    }
    this.calculate();
  }

  //https://gist.github.com/pies/4166888
  calculate() {
    if (this.r == 0) {
      return this.p / this.n;
    }
    this.rate = this.r / 100 / 12;
    this.emi = -this.PMT(this.rate, this.n, this.p, 0, 0);
    this.emi = Math.round(this.emi);
    this.totalEmi = this.emi * this.n;
    this.totalInterest = this.totalEmi - this.p;
    let date = new Date();
    this.breakup = [];
    this.yearlyBreakup = new Map < number, YearlyBreakup > ();
    for (let i = 0; i < this.n; i++) {
      let breakup = new Breakup();
      let updatedDate = this.addMonths(date.getMonth() + i);
      breakup.year = updatedDate.getFullYear();
      breakup.month = updatedDate.toLocaleString('default', {
        month: 'short'
      });
      breakup.pmt = this.emi;
      breakup.ipmt = Math.round(-this.IPMT(this.p, -this.emi, this.rate, i))
      breakup.ppmt = this.emi - breakup.ipmt;
      breakup.bal = this.totalEmi - (this.emi * (i + 1));
      this.breakup.push(breakup);

      let yb: YearlyBreakup = new YearlyBreakup();
      if (this.yearlyBreakup.has(breakup.year)) {
        yb = this.yearlyBreakup.get(breakup.year);
        yb.tppmt += breakup.ppmt;
        yb.tipmt += breakup.ipmt;
        yb.tpmt += breakup.pmt;
        yb.tbal = breakup.bal;
        yb.months.push(breakup);
      } else {
        yb.year = breakup.year;
        yb.tppmt += breakup.ppmt;
        yb.tipmt += breakup.ipmt;
        yb.tpmt += breakup.pmt;
        yb.tbal = breakup.bal;
        yb.months.push(breakup);
      }
      this.yearlyBreakup.set(breakup.year, yb);
    }
  }

  // https://www.experts-exchange.com/articles/1948/A-Guide-to-the-PMT-FV-IPMT-and-PPMT-Functions.html#:~:text=Code%20Example%3A%20calculating%20ppmt.&text=%C2%AB%C2%AB%20try%20coding%20this%20using%20formula,c%20with%20its%20appropriate%20formula.
  pmtFn(): number {
    let rate = this.r / 100 / 12;
    let nper = this.n;
    let pvIf = Math.pow((1 + rate), this.n);
    let pmt = ((rate / (pvIf - 1)) * (this.p * pvIf + 0));
    //if (type == 1) pmt /= (1 + r);
    return pmt;
  }

  fvFn(nper: number) {
    let c = -this.pmtFn();
    let rate = this.r / 100 / 12;
    let pvIf = Math.pow((1 + rate), nper);
    let fv = -(c * (pvIf - 1) / rate + this.p * pvIf);

    //   if (type == 1) {
    //     c = c * (1 + r);
    //  }
    return fv;
  }

  ipmtFn() {
    let rate = this.r / 100 / 12;
    let ipmt = this.fvFn(1) * rate;
    //if (type == 1) ipmt /= (1 + r);
    return ipmt;
  }


  PMT(rate: number, nper: number, pv: number, fv: number, type: number): number {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv) / nper;

    var pvif = Math.pow(1 + rate, nper);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
      pmt /= (1 + rate);
    }

    return pmt;
  }

  IPMT(pv: number, pmt: number, rate: number, per: number): number {
    var tmp = Math.pow(1 + rate, per);
    return 0 - (pv * tmp * rate + pmt * (tmp - 1));
  }

  PPMT(rate: number, per: number, nper: number, pv: number, fv: number, type: number): number {
    if (per < 1 || (per >= nper + 1)) return null;
    var pmt = this.PMT(rate, nper, pv, fv, type);
    var ipmt = this.IPMT(pv, pmt, rate, per - 1);
    return pmt - ipmt;
  }

  addMonths(mon: number): Date {
    let date = new Date();
    date.setMonth(mon);
    return date;
  }



}
