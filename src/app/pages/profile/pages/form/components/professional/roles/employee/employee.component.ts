
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from '../../../../../../../../store/dictionaries';
import { RecrutierForm } from '../recrutier/recrutier.component';

export interface EmployeeForm{
  specialization:string;
  skill: string[];
  quelificacion:string;
  expecteadSalary:number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})

export class EmployeeComponent implements OnInit, OnDestroy{
  //hijo
  @Input() parent!:FormGroup;
  @Input() name!: string;

  @Input() value!: EmployeeForm | RecrutierForm;
  @Input() dictionaries!: Dictionaries|null;


  form!:FormGroup;


  constructor(
    private fb: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      expectedSalary:[null,{
        updateOn: 'blur', validators:[
          Validators.required
        ]
      }],
      specialization:[null,{
        updateOn:'change', validators:[
          Validators.required
        ]
      }],
      qualification:[null,{
        updateOn:'change', validators:[
          Validators.required
        ]
      }],
      skills:[null,{
        updateOn:'change', validators:[
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

