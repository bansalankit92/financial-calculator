import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
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
