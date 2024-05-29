import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects),
    ProfileRoutingModule
  ],
  providers:[

  ]
})
export class ProfileModule { }
