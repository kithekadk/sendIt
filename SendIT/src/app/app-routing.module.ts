import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { AuthuserGuard } from './modules/shared/guards/authuser.guard';


const routes: Routes = [
  {path:'',  loadChildren:()=>import('./modules/shared/shared.module')
    .then(m => m.SharedModule)},
  {path:'', canActivate:[AuthGuard] ,loadChildren:()=>import('./modules/admin/admin.module')
    .then(m => m.AdminModule)},
  {path:'', canActivate:[AuthuserGuard] ,loadChildren:()=>import('./modules/user/user.module')
    .then(m => m.UserModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

