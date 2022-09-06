import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomingComponent } from './component/incoming/incoming.component';
import { OutgoingComponent } from './component/outgoing/outgoing.component';
import { UserdashboardComponent } from './component/userdashboard/userdashboard.component';

const routes: Routes = [
  {path:'user', component:UserdashboardComponent,
  children: [
    {path:'sent', component:OutgoingComponent},
    {path:'received', component:IncomingComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
