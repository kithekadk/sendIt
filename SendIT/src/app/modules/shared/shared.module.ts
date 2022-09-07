import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from './ngrx/Effects/userEffects';
import { userReducer } from './ngrx/Reducer/userReducer';


@NgModule({
  declarations: [
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([userEffects]),
    StoreModule.forFeature('user', userReducer),  
  ]
})
export class SharedModule { }
