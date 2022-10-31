import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalDetailsComponent } from './additional-details/additional-details.component';
import { SellerFormsComponent } from './seller-forms.component';

const routes: Routes = [
  {
    path: '',
    component: SellerFormsComponent,
  },
  {
    path: 'sell-out',
    component: SellerFormsComponent
  },
  {
    path: 'investment',
    component: SellerFormsComponent
  },
  {
    path: 'mergers-acquisitions',
    component: SellerFormsComponent
  },
  {
    path: 'commercial-property',
    component: SellerFormsComponent
  },
  {
    path: 'details',
    component: AdditionalDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerFormsRoutingModule { }
