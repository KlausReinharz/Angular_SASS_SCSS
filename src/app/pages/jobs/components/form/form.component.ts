import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import * as fromRoot  from '../../../../store';
import * as fromList from '../../store/list';

import { markFormGroupTouched, regex, regexErrors } from '../../../../shared/utils';

import { Job } from '../../store/list';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';





@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  regexErrors = regexErrors;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {value:Job}

  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      title:[null,{
          updateOn:'blur', validators:[
            Validators.required,
            Validators.maxLength(128),
          ]
        }
      ],
      salary:[null,{
        updateOn:'blur', validators:[
          Validators.required
        ]
      }
    ]

    });

    if(this.data.value){
      this.form.patchValue(this.data.value);
    }

  }

  onSubmit():void{
    if(this.form.valid){
      if(this.data.value){
        const updateJob = {...this.data.value, ...this.form.value};
        this.store.dispatch(new fromList.Update(updateJob));
      }else{
        this.store.dispatch(new fromList.Create(this.form.value));
      }

      this.dialogRef.close();


    }else{
      markFormGroupTouched(this.form);

    }
  }


}
