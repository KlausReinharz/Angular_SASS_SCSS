import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from '../../../../../../../../store/dictionaries';
import { EmployeeForm } from '../employee/employee.component';

export interface RecrutierForm{
  companyName: string;
  employeesCount:number;
}

@Component({
  selector: 'app-recrutier',
  templateUrl: './recrutier.component.html',
  styleUrl: './recrutier.component.scss'
})
export class RecrutierComponent implements OnInit, OnDestroy{
  //hijo
  @Input() parent!:FormGroup;
  @Input() name!: string;

  @Input() value!: RecrutierForm | EmployeeForm;
  @Input() dictionaries!: Dictionaries|null;


  form!:FormGroup;


  constructor(
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      companyName:[null,{
        updateOn: 'blur', validators:[
          Validators.required
        ]
      }],
      employeesCount:[null,{
        updateOn:'blur', validators:[
          Validators.required
        ]
      }]
    });

    if(this.value){
      this.form.patchValue(this.value);
    }
    //para agregar al formulario del padre
    this.parent.addControl(this.name,this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);

  }


}
