import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SipComponent } from './components/sip/sip.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LumpsumComponent } from './components/lumpsum/lumpsum.component';
import { FdComponent } from './components/fd/fd.component';
import { RdComponent } from './components/rd/rd.component';
import { PpfComponent } from './components/ppf/ppf.component';
import { IncomeTaxComponent } from './components/income-tax/income-tax.component';
import { SalaryComponent } from './components/salary/salary.component';
import { RetirementComponent } from './components/retirement/retirement.component';
import { FinancialFreedomComponent } from './components/financial-freedom/financial-freedom.component';
import { CalculatorService } from './modules/shared/services/calculator.service';
import { CurrencyPipe } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { OldIncomeTaxComponent } from './components/old-income-tax/old-income-tax.component';
import { OldVsNewIncomeTaxComponent } from './components/old-vs-new-income-tax/old-vs-new-income-tax.component';
import { OldTaxAdvOptionComponent } from './components/old-tax-adv-option/old-tax-adv-option.component';
import { SeoService } from './services/seo.service';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SipComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    LumpsumComponent,
    FdComponent,
    RdComponent,
    PpfComponent,
    IncomeTaxComponent,
    SalaryComponent,
    RetirementComponent,
    FinancialFreedomComponent,
    SideNavComponent,
    OldIncomeTaxComponent,
    OldVsNewIncomeTaxComponent,
    OldTaxAdvOptionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CalculatorService,
    CurrencyPipe,
    SeoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
