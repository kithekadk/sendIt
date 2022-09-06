import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:()=>import('./modules/shared/shared.module')
    .then(m => m.SharedModule)},
  {path:'', loadChildren:()=>import('./modules/admin/admin.module')
    .then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
