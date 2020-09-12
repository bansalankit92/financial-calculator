import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmiComponent } from './emi.component';
import { HomeLoanComponent } from './components/home-loan/home-loan.component';
import { CarLoanComponent } from './components/car-loan/car-loan.component';
import { EduLoanComponent } from './components/edu-loan/edu-loan.component';
import { PersonalLoanComponent } from './components/personal-loan/personal-loan.component';

const routes: Routes = [{
  path: '',
  component: EmiComponent
},
{
  path: 'home-loan',
  component: HomeLoanComponent
},
{
  path: 'car-loan',
  component: CarLoanComponent
},
{
  path: 'edu-loan',
  component: EduLoanComponent
},
{
  path: 'personal-loan',
  component: PersonalLoanComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmiRoutingModule { }
