import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component: NavbarComponent,children:
  [
    {path:'', redirectTo: '/home',pathMatch:'full'},
    {path:'home', component: HomepageComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
