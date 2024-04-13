import { Component, forwardRef, EventEmitter,Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {ControlItem, Value} from '../../../models/frontend';
export {ControlItem, Value} from '../../../models/frontend';


@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrl: './radios.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>RadiosComponent),
      multi: true
    }
  ]
})
export class RadiosComponent implements ControlValueAccessor{
  value!: Value;
  isDisabled!: boolean;

  @Input() items!:ControlItem[] ;
  @Output() changed = new EventEmitter<Value>();


  private propagateChange: any = () =>{}

  constructor(){}


 writeValue(value: Value): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  OnChanged(value: Value):void{
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);

  }

  isChecked(value: Value):boolean{
    return this.value === value;
  }






}
