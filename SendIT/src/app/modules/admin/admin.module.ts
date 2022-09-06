import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ParcelsComponent } from './components/parcels/parcels.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NewparcelComponent } from './components/newparcel/newparcel.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ParcelsComponent,
    ClientsComponent,
    NewparcelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
