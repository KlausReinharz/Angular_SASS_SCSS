import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements ControlValueAccessor{
  @Input() placeholder!: string;
  @Input() min!:Date;
  @Input() max!:Date;

  @Output () Changed = new EventEmitter<Value>();
  @Output () closed = new EventEmitter<void>();

  get inputValue():Date|null {
    return this.value? new Date(this.value): null;
  }


  value!:Value;
  isDisabled!: boolean;

  private propagateChange: any =() =>{}
  private propagateTouched: any =() => {}


  constructor(){}

  writeValue(value: Value): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched =fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled=isDisabled;
  }

  onChanged(event: MatDatepickerInputEvent<Date>):void{
    const value = event.value ? event.value.getTime(): new Date().getTime();
    this.value = value;
    this.propagateChange(value);
    this.Changed.emit(value);
  }


  onClosed():void{
    this.propagateTouched();
    this.closed.emit();
  }



}
