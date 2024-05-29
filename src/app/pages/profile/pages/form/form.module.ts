import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule } from '@angular/forms';
import {FormFieldModule,InputModule, AutocompleteModule, SelectModule, CheckboxesModule, DateRangeModule} from '../../../../shared/controls';
import { FilesUploadModule} from '../../../../shared/popups';
import { SpinnerModule } from '../../../../shared/indicators';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { StepperModule } from './components';
import { PersonalComponent } from './components/personal/personal.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { RadiosModule } from '../../../../shared/controls';

import { UserPhotoModule } from '../../../../shared/layouts';
import { EmployeeComponent } from './components/professional/roles/employee/employee.component';
import { RecrutierComponent } from './components/professional/roles/recrutier/recrutier.component';
import { ExperienceComponent } from './components/professional/roles/employee/experience/experience.component';
import { ButtonModule } from "../../../../shared/buttons";
import { MapperService } from './services';


@NgModule({
    declarations: [
        FormComponent,
        PersonalComponent,
        ProfessionalComponent,
        EmployeeComponent,
        RecrutierComponent,
        ExperienceComponent
    ],
    imports: [
        CommonModule,
        FormRoutingModule,
        StepperModule,
        FormFieldModule,
        InputModule,
        AutocompleteModule,
        FilesUploadModule,
        SpinnerModule,
        ReactiveFormsModule,
        UserPhotoModule,
        RadiosModule,
        SelectModule,
        CheckboxesModule,
        DateRangeModule,
        ButtonModule
    ],
    providers:[
      MapperService,

    ]
})
export class FormModule { }
