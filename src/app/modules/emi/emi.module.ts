import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { EmiRoutingModule } from './emi-routing.module';
import { HomeLoanComponent } from './components/home-loan/home-loan.component';
import { CarLoanComponent } from './components/car-loan/car-loan.component';
import { PersonalLoanComponent } from './components/personal-loan/personal-loan.component';
import { EduLoanComponent } from './components/edu-loan/edu-loan.component';
import { NavEmiComponent } from './components/nav-emi/nav-emi.component';
import { EmiComponent } from './emi.component';
import { SharedModule } from '../shared/shared.module';
import { SeoService } from '../../services/seo.service';

@NgModule({
  declarations: [EmiComponent, HomeLoanComponent, CarLoanComponent, PersonalLoanComponent, EduLoanComponent, NavEmiComponent],
  imports: [
    CommonModule,
    EmiRoutingModule,
    SharedModule
  ],
  providers: [
    SeoService,
  ],
})
export class EmiModule { }
