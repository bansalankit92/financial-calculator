import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';
import { InlineEditInputComponent } from './components/forms/inline-edit-input/inline-edit-input.component'
import { CalculatorService } from './services/calculator.service';
import { ReferencesComponent } from './components/references/references.component';
import { GoodReadsComponent } from './components/good-reads/good-reads.component';
@NgModule({
  declarations: [
    MycurrencyPipe,
    InlineEditInputComponent,
    ReferencesComponent,
    GoodReadsComponent
  ],
  imports: [
    CommonModule,
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
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatTabsModule,
  ],
  exports: [
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
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatTabsModule,
    MycurrencyPipe,
    InlineEditInputComponent,
    GoodReadsComponent,
    ReferencesComponent,
  ],
  providers: [CalculatorService]
})
export class SharedModule { }
