import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';
import { Dictionaries } from '../../../../../../store/dictionaries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexErrors } from '../../../../../../shared/utils/regex';
import { markFormGroupTouched } from '../../../../../../shared';
import { RecrutierForm } from './roles/recrutier/recrutier.component';
import { EmployeeForm } from './roles/employee/employee.component';

export interface ProfesionalForm{
  about?: string | null;
  roleId?: string | null;
  role?: RecrutierForm | EmployeeForm |null|any;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrl: './professional.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value!: ProfesionalForm | any;
  @Input() dictionaries!: Dictionaries | null;

  @Output() changed = new EventEmitter<ProfesionalForm>();

  form!: FormGroup;
  regexErrors = regexErrors;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private stepper: StepperService
  ){}

  private destroy = new Subject<any>();


  ngOnInit(): void {
    this.form = this.fb.group({
      roleId: [null,{
        updateOn:'change', validators:[
          Validators.required
        ]
      }],
      about:[null,{
        updateOn:'blur', validators:[
          Validators.required
        ]
      }]
    });

    if(this.value){
      this.form.patchValue(this.value)
    }


    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type)=>{
      //type==='complete'
      //this.stepper[type].next(true);
      if(!this.form.valid){
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      }else{
        this.changed.emit(this.form.value);
      }
      this.stepper[type].next(this.form.valid);
    })

  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
