import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperService } from './services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnDestroy, OnInit {

  private destroy = new Subject<any>();

  constructor(private stepper: StepperService){}

  ngOnInit(): void {
    this.stepper.next$.pipe(takeUntil(this.destroy)).subscribe(()=>{
      this.stepper.onNext();
    })

  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();


  }

  get steps(){
    return this.stepper.steps;
  }

  get activeStep(){
    return this.stepper.activeStep;
  }

  isActive(index:number):boolean{
    return index === this.activeStep.index;
  }

  isCompleted(index:number):boolean{
    return index < this.activeStep.index;
  }

  isFirst():boolean{
    return this.activeStep.index ===0;
  }

  isLast():boolean{
    return this.activeStep.index === this.steps.length - 1;
  }

  onNext(){
    //this.stepper.onNext();
    this.stepper.check.next('next');

  }

  onComplete(){
    this.stepper.check.next('complete');

  }

  onPrev(){
    this.stepper.onPrev();
  }

  onCancel(){
    this.stepper.cancel.next();

  }



}
