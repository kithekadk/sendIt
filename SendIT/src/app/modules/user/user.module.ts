import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserdashboardComponent } from './component/userdashboard/userdashboard.component';
import { IncomingComponent } from './component/incoming/incoming.component';
import { OutgoingComponent } from './component/outgoing/outgoing.component';


@NgModule({
  declarations: [
    UserdashboardComponent,
    IncomingComponent,
    OutgoingComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
