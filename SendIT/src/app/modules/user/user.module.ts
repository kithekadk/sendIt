import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserdashboardComponent } from './component/userdashboard/userdashboard.component';
import { IncomingComponent } from './component/incoming/incoming.component';
import { OutgoingComponent } from './component/outgoing/outgoing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleMapsModule } from '@angular/google-maps';
import { ViewOneComponent } from './component/view-one/view-one.component';


@NgModule({
  declarations: [
    UserdashboardComponent,
    IncomingComponent,
    OutgoingComponent,
    UserprofileComponent,
    ViewOneComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    GooglePlaceModule,
    GoogleMapsModule,
  ]
})
export class UserModule { }
