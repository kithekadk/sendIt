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
import { SearchPipe } from './custompipes/search.pipe';
import { parcelEffects } from './ngrx/Effects/parcelEffects';
import { parcelReducer } from './ngrx/Reducer/parcelReducer';
import { SearchparcelPipe } from './custompipes/searchparcel.pipe';
import { ContainerDirective } from './CustomDirectives/customDirectives';
import { DynamicComponent } from './components/dynamic/dynamic.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    SearchPipe,
    SearchparcelPipe,
    ContainerDirective,
    DynamicComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([userEffects, parcelEffects]),
    StoreModule.forFeature('user', userReducer),  
    StoreModule.forFeature('parcel', parcelReducer),  
  ],
  exports: [
    SearchPipe,
    SearchparcelPipe,
    DynamicComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
