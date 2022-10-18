import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPropositionsComponent } from './propositions/propositions.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminPropositionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
