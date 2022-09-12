import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ParcelsComponent } from './components/parcels/parcels.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NewparcelComponent } from './components/newparcel/newparcel.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {NgxPaginationModule } from 'ngx-pagination'
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ParcelsComponent,
    ClientsComponent,
    NewparcelComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    GoogleMapsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    // GooglePlaceModule
   
  ]
})
export class AdminModule { }
