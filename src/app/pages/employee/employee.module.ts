import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeesComponent } from './components/employees/employees.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {reducers, effects}from './store';
import { UserPhotoModule } from '../../shared/layouts';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeesComponent,

  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('employee', reducers),
    EffectsModule.forFeature(effects),
    EmployeeRoutingModule,
    UserPhotoModule
  ]
})
export class EmployeeModule { }
