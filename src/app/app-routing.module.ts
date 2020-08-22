import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SipComponent } from './components/sip/sip.component';
import { SalaryComponent } from './components/salary/salary.component';
import { IncomeTaxComponent } from './components/income-tax/income-tax.component';

const routes: Routes = [{
    path: '',
    component: SipComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
