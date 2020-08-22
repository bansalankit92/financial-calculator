import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

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
import { EmiComponent } from './components/emi/emi.component';
import { HomeLoanComponent } from './components/home-loan/home-loan.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from './services/calculator.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';
import { CurrencyPipe } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SideNavComponent } from './components/side-nav/side-nav.component';

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
    EmiComponent,
    HomeLoanComponent,
    MycurrencyPipe,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    NgxChartsModule,
    MatSidenavModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CalculatorService,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
