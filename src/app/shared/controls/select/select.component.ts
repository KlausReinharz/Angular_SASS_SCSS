import { Component, forwardRef, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {ControlItem, Value} from '../../../models/frontend';
import { MatSelectChange } from '@angular/material/select';
export {ControlItem, Value} from '../../../models/frontend';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() Items: ControlItem[];

  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<Value>();

  value!: Value;
  isDisabled!: boolean;

  constructor(){}

  private propagateChange: any = () =>{}
  private propagateTouched: any = () =>{}

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
  }

  onChanged(event: MatSelectChange):void{
    const value  = event.value? event.value : null;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void{
    this.propagateTouched();
  }



}
