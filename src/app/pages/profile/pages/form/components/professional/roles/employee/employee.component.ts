
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dictionaries } from '../../../../../../../../store/dictionaries';
import { RecrutierForm } from '../recrutier/recrutier.component';
import { ExperienceForm } from './experience/experience.component';

import { ControlEntities, mapControls } from '../../../../../../../../shared/utils/form';
import { MapperService } from '../../../../services/mapper/mapper.service';

export interface EmployeeForm{
  specialization:string |null;
  skills: string[];
  qualificacion:string | null;
  expecteadSalary:number;
  experiences: ExperienceForm[];
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

  controls!:ControlEntities;


  constructor(
    private fb: FormBuilder,
    private mapperService: MapperService

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
      qualification:[{value: null, disabled: true},{
        updateOn:'change', validators:[
          Validators.required
        ]
      }],
      skills:[{value: null, disabled: true},{
        updateOn:'change', validators:[
          Validators.required
        ]
      }],


    });

    this.controls={
      specialization:{
        items:this.dictionaries?.specializations.ControlItems,
        changed: () =>{
          this.controls['qualification'].map();
          this.controls['skills'].map();
        }
      },
      qualification:{
        items:this.dictionaries?.qualifications.ControlItems,
        map: () =>{
          if(this.form.value.specialization){
            this.form.controls['qualification'].enable();
          }else{
            this.form.controls['qualification'].reset();
            this.form.controls['qualification'].disable();
          }
        }
      },
      skills:{
        items:this.dictionaries?.skills.ControlItems,
        map: () =>{
          if(this.form.value.specialization){
            this.form.controls['skills'].enable();
            const items = [...this.dictionaries?.skills.ControlItems || [] ].map(
              (item, index)=>({...item, label: `${item.label}(${index + 1})`})
            );

            this.controls['skills'].items = items;

          }else{
            this.form.controls['skills'].reset();
            this.form.controls['skills'].disable();
          }

        }
      }
    };

    if(this.value){
      this.form.patchValue(this.value);
    }
    //este definido con el forms index de los controles
    mapControls(this.controls);
    //para agregar al formulario del padre
    this.parent.addControl(this.name,this.form);

  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);


  }


  onComplete(): void {
    const profileFormValue = this.form.value; // Obtén el valor del formulario

    // Pasa el formulario completo al servicio MapperService para ser procesado
    this.mapperService.processEmployeeForm(profileFormValue);
  }




}

