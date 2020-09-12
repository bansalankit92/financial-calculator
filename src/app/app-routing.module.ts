import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SipComponent } from './components/sip/sip.component';
import { SalaryComponent } from './components/salary/salary.component';
import { IncomeTaxComponent } from './components/income-tax/income-tax.component';
import { OldIncomeTaxComponent } from './components/old-income-tax/old-income-tax.component';
import { OldVsNewIncomeTaxComponent } from './components/old-vs-new-income-tax/old-vs-new-income-tax.component';
import { FdComponent } from './components/fd/fd.component';
import { EmiComponent } from './components/emi/emi.component';

const routes: Routes = [{
    path: '',
    component: SipComponent,
    data: {
      title: 'SIP Calculator',
      description:'To calculate monthly mutual funds, sip',
      ogUrl: '/'
    } 
  },
  {
    path: 'sip',
    component: SipComponent
  },
  {
    path: 'systematic-investment-plan',
    component: SipComponent
  },
  {
    path: 'salary-calculator',
    component: SalaryComponent
  },
  {
    path: 'income-tax-calculator',
    component: IncomeTaxComponent
  },
  {
    path: 'income-tax-calculator-2020-21',
    component: IncomeTaxComponent
  },
  {
    path: 'income-tax-calculator-new-regime',
    component: IncomeTaxComponent
  },
  {
    path: 'old-income-tax-calculator-2019-20',
    component: OldIncomeTaxComponent
  },
  {
    path: 'old-vs-new-regime-income-tax-calculator',
    component: OldVsNewIncomeTaxComponent
  },
  {
    path: 'salary-calculator',
    component: SalaryComponent
  },
  {
    path: 'take-home-calculator',
    component: SalaryComponent
  },
  {
    path: 'fd',
    component: FdComponent
  },
  {
    path: 'emi',
    component: EmiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
