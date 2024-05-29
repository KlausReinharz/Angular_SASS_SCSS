import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../../../shared/controls';
import { FormFieldModule } from '../../../../shared/controls/form-field/form-field.module';
import { ButtonModule } from '../../../../shared/buttons';



@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    FormFieldModule,
    ButtonModule

  ]
})
export class FormModule { }
