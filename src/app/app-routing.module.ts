import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SipComponent } from './components/sip/sip.component';

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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
