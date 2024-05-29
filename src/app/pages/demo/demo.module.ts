import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { provideClientHydration } from '@angular/platform-browser';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule
  ],
  providers:[
    provideClientHydration()
  ]
})
export class DemoModule { }
