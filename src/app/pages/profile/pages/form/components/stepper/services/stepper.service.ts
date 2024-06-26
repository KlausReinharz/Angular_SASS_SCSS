import { Injectable } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';

export interface Step{
  key:string;
  label: string;
}
export interface ActiveStep extends Step{
  index: number;
}

@Injectable()
export class StepperService {
  steps!:Step[];
  activeStep!: ActiveStep;

  next = new Subject<boolean>();
  next$!: Observable<boolean>;

  prev = new Subject<void>();
  prev$ = this.prev.asObservable();

  complete = new Subject<boolean>();
  complete$!: Observable<boolean>;

  cancel = new Subject<void>();
  cancel$ = this.cancel.asObservable();

  check = new Subject<'next'|'complete'>();
  check$ = this.check.asObservable();






  init(steps: Step[]):void{
    this.steps = steps;
    this.activeStep={...steps[0], index: 0}
  }

  constructor() {
    this.next$ = this.next.asObservable().pipe(filter(isOk=> isOk));

    this.complete$ = this.complete.asObservable().pipe(filter(isOk=> isOk));
  }

  onNext():void{
    const index = this.activeStep.index +1;
    this.activeStep={...this.steps[index],index};

  }
  onPrev():void{
    const index = this.activeStep.index - 1;
    this.activeStep={...this.steps[index],index};
  }
}
