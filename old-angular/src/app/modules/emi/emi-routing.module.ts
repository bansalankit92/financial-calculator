import { Constants } from 'src/app/util/constants';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmiComponent } from './emi.component';
import { HomeLoanComponent } from './components/home-loan/home-loan.component';
import { CarLoanComponent } from './components/car-loan/car-loan.component';
import { EduLoanComponent } from './components/edu-loan/edu-loan.component';
import { PersonalLoanComponent } from './components/personal-loan/personal-loan.component';

const routes: Routes = [
  {
    path: '',
    component: EmiComponent,
    data: {
      title: 'EMI Calculator',
      description:
        'To calculate how much money you will need to give when you start an emi.',
      ogUrl: Constants.WEBSITE_URL + '/emi',
    },
  },
  {
    path: 'home-loan',
    component: HomeLoanComponent,
    data: {
      title: 'Home Loan EMI Calculator',
      description:
        'To calculate how much money you will need to give in case of home loan.',
      ogUrl: Constants.WEBSITE_URL + '/emi/home-loan' ,
    },
  },
  {
    path: 'car-loan',
    component: CarLoanComponent,
    data: {
      title: 'Car Loan EMI Calculator',
      description:
        'To calculate how much money you will need to give in case of car loan.',
      ogUrl: Constants.WEBSITE_URL + '/emi/car-loan' ,
    },
  },
  {
    path: 'edu-loan',
    component: EduLoanComponent,
    data: {
      title: 'Education Loan EMI Calculator',
      description:
        'To calculate how much money you will need to give in case of Education loan.',
      ogUrl: Constants.WEBSITE_URL + '/emi/edu-loan' ,
    },
  },
  {
    path: 'personal-loan',
    component: PersonalLoanComponent,
    data: {
      title: 'Personal Loan EMI Calculator',
      description:
        'To calculate how much money you will need to give in case of personal loan.',
      ogUrl: Constants.WEBSITE_URL + '/emi/personal-loan' ,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmiRoutingModule {}
