import { Component, Output, forwardRef, Input, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type PasswordType ='password'|'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>PasswordComponent),
      multi:true
    }
  ]
})
export class PasswordComponent implements ControlValueAccessor{
  value!:string;
  isDisabled!: boolean;
  passwordType!: PasswordType;

  @Input() placeholder!: string;
  @Output() changed = new EventEmitter<string>();


  constructor(){
    this.passwordType = 'password';
  }

  private propagateChange: any = () =>{};
  private propagateTouched: any = () =>{};

  writeValue(value: string):void{
    this.value = value;
  }

  registerOnChange(fn: any):void{
    this.propagateChange=fn;
  }

  registerOnTouched(fn: any):void{
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
  }

  onKeuup(event: Event):void{
    const {target} = event;
    this.value = (target as HTMLInputElement).value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);

  }

  onBlur():void{
    this.propagateTouched();
  }

  toglePassword():void{
    this.passwordType= this.passwordType =='password' ? 'text':'password';
  }



}
