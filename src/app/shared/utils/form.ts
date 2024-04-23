import { ControlItem } from "../../models/frontend";

export const markFormGroupTouched =(formGroup:any)=>{
  (Object as any).values(formGroup.controls).forEach((control:any)=>{
    control.markAsTouched();

    if(control.controls){
      markFormGroupTouched(control);
    }

  })
}

export interface Control{
  //data del combobox, radio.etc
  items?:ControlItem[];
  //dispara
  changed?: ()=> void;
  //control recive
  map?: (() => void) | any;
}

export interface ControlEntities{
  [key:string]: Control;
}
// controles este es la funcion que se mapeara 
export const mapControls = (controls: ControlEntities) : void =>{
  Object.keys(controls).forEach((key:string)=>{
    if(controls[key].map){
      controls[key].map();
    }
  })
}
