import { Component, OnInit,OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { StepperService } from './components/stepper/services';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';


import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../../../app/store';
import * as fromDictionaries from '../../../../../app/store/dictionaries';
import { PersonalForm } from './components/personal/personal.component';
import { ProfesionalForm } from './components/professional/professional.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent implements OnInit, OnDestroy{

  dictionaries$!: Observable<fromDictionaries.Dictionaries>;
  dictionariesIsReady$!: Observable<boolean>;
  private destroy = new Subject<any>();


  constructor(
    public stepper:StepperService,
    private store : Store<fromRoot.State>
  ){ }

  ngOnInit(): void {
    this.dictionaries$= this.store.pipe(select(fromDictionaries.getDictionaries)) as Observable<any>;
    this.dictionariesIsReady$=this.store.pipe(select(fromDictionaries.getIsReady))as Observable<boolean>;

    this.stepper.init([
      //cambiarlos temporalmente el orden
      {key: 'professional', label: 'Profesional'},
      {key: 'personal', label: 'Personal'},

    ])
    this.stepper.complete$.pipe(takeUntil(this.destroy)).subscribe(()=>{
      console.log('stepper completado')

    });
    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(()=>{
      console.log('stepper cancelado')

    });

  }
  onChangedPersonal(data: PersonalForm):void{
    console.log('Personal data', data)

  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();

  }

  onChangedProfesional(date:ProfesionalForm){
    console.log('data de profesional', date)
  }




}
