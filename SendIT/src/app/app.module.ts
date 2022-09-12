import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'
import { SearchPipe } from './modules/shared/custompipes/search.pipe';
import { SharedModule } from './modules/shared/shared.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    GoogleMapsModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    SharedModule,
    GooglePlaceModule

  ],
  providers: [SearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
