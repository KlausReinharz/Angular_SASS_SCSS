import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NotificacionModule } from './services';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import { HeaderComponent } from './components/header/header.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatNativeDateModule, MatDateFormats,MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
const  StoreDevtools = !environment.production? StoreDevtoolsModule.instrument({maxAge:50}): [];
import {reducers, effects} from './store';


const APP_DATE_FORMATS: MatDateFormats ={
  parse:{
    dateInput:{day:'numeric', month:'numeric', year:'numeric'}
  },
  display:{
    dateInput:{day:'numeric', month:'short', year:'numeric'},
    monthYearLabel:{year:'numeric', month:'short'},
    dateA11yLabel:{year:'numeric', month:'long',day:'numeric'},
    monthYearA11yLabel:{year:'numeric', month:'long'}
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatNativeDateModule,

    StoreModule.forRoot(reducers,{
      runtimeChecks:{
        strictActionImmutability:true,
        strictStateImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreDevtools,

    NotificacionModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: MAT_DATE_LOCALE, useValue:'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
