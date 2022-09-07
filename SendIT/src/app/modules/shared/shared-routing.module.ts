import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';

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
