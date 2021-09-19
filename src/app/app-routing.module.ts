import { Constants } from './util/constants';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SipComponent } from './components/sip/sip.component';
import { SalaryComponent } from './components/salary/salary.component';
import { IncomeTaxComponent } from './components/income-tax/income-tax.component';
import { OldIncomeTaxComponent } from './components/old-income-tax/old-income-tax.component';
import { OldVsNewIncomeTaxComponent } from './components/old-vs-new-income-tax/old-vs-new-income-tax.component';
import { FdComponent } from './components/fd/fd.component';

const routes: Routes = [
  {
    path: '',
    component: OldVsNewIncomeTaxComponent,
    data: {
      title: 'Free Financial Calculator',
      description: 'To calculate monthly mutual funds, sip',
      ogUrl: Constants.WEBSITE_URL,
    },
  },
  {
    path: 'sip',
    component: SipComponent,
    data: {
      title: 'SIP Calculator',
      description:
        'To calculate monthly mutual funds, Systematic Investment Plans(SIP)',
      ogUrl: Constants.WEBSITE_URL + '/sip',
    },
  },
  {
    path: 'systematic-investment-plan',
    component: SipComponent,
    data: {
      title: 'SIP Calculator',
      description:
        'To calculate monthly mutual funds, Systematic Investment Plans(SIP)',
      ogUrl: Constants.WEBSITE_URL + '/systematic-investment-plan',
    },
  },
  {
    path: 'income-tax-calculator',
    component: IncomeTaxComponent,
    data: {
      title: 'New Regime Income Tax Calculator',
      description:
        'To calculate the income tax you will be paying in case of new regime 2020-21/22',
      ogUrl: Constants.WEBSITE_URL + '/income-tax-calculator-new-regime',
    },
  },
  {
    path: 'income-tax-calculator-2020-21',
    component: IncomeTaxComponent,
    data: {
      title: 'New Regime Income Tax Calculator',
      description:
        'To calculate the income tax you will be paying in case of new regime',
      ogUrl: Constants.WEBSITE_URL + '/income-tax-calculator-new-regime',
    },
  },
  {
    path: 'income-tax-calculator-new-regime',
    component: IncomeTaxComponent,
    data: {
      title: 'New Regime Income Tax Calculator',
      description:
        'To calculate the income tax you will be paying in case of new regime',
      ogUrl: Constants.WEBSITE_URL + '/income-tax-calculator-new-regime',
    },
  },
  {
    path: 'old-income-tax-calculator',
    component: OldIncomeTaxComponent,
    data: {
      title: 'Old Regime Income Tax Calculator',
      description:
        'To calculate the income tax you will be paying in case of old regime',
      ogUrl: Constants.WEBSITE_URL + '/old-regime-income-tax-calculator',
    },
  },
  {
    path: 'old-regime-income-tax-calculator',
    component: OldIncomeTaxComponent,
    data: {
      title: 'Old Regime Income Tax Calculator',
      description:
        'To calculate the income tax you will be paying in case of old regime',
      ogUrl: Constants.WEBSITE_URL + '/old-regime-income-tax-calculator',
    },
  },
  {
    path: 'old-vs-new-regime-income-tax-calculator',
    component: OldVsNewIncomeTaxComponent,
    data: {
      title: 'New vs Old Regime Income Tax Calculator',
      description:
        'To compare the income tax you will be paying in case of old regime vs new regime',
      ogUrl: Constants.WEBSITE_URL + '/old-vs-new-regime-income-tax-calculator',
    },
  },
  {
    path: 'salary-calculator',
    component: SalaryComponent,
    data: {
      title: 'Salary Calculator | Take Home Salary Calculator',
      description:
        'To calculate your actual inhand salary, take home salary from the CTC after all deductions and tax paying.',
      ogUrl: Constants.WEBSITE_URL + '/salary-calculator',
    },
  },
  {
    path: 'take-home-salary-calculator',
    component: SalaryComponent,
    data: {
      title: 'Take Home Salary Calculator',
      description:
        'To calculate inhand/take home salary from the CTC after all deductions and tax paying',
      ogUrl: Constants.WEBSITE_URL + '/take-home-salary-calculator',
    },
  },
  // {
  //   path: 'fd',
  //   component: FdComponent,
  //   data: {
  //     title: 'Fixed Deposit Calculator',
  //     description:
  //       'To calculate the money you will get in case you invest in fixed deposit FD',
  //     ogUrl: Constants.WEBSITE_URL + '/fd',
  //   },
  // },
  {
    path: 'emi',
    loadChildren: () =>
      import('./modules/emi/emi.module').then((mod) => mod.EmiModule),
    data: {
      title: 'EMI Calculator',
      description:
        'To calculate how much money you will need to give when you start an emi.',
      ogUrl: Constants.WEBSITE_URL + '/emi',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
