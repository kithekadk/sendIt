import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EditParcelComponent } from './components/edit-parcel/edit-parcel.component';
import { NewparcelComponent } from './components/newparcel/newparcel.component';
import { ParcelsComponent } from './components/parcels/parcels.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewOneComponent } from './components/view-one/view-one.component';

const routes: Routes = [
  {path:'admin', component: AdminDashboardComponent,
  children:[
    {path:'parcels', component: ParcelsComponent},
    {path:'clients', component: ClientsComponent},
    {path:'new', component: NewparcelComponent},
    {path:'update/:id', component: EditParcelComponent},
    {path:'view/:id', component: ViewOneComponent},
    {path:'profile', component: ProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
