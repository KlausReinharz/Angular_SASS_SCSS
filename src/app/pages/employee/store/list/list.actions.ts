import { Action } from "@ngrx/store";
import {User} from './list.models';

export enum Types{
  READ='[Employee] Read: start',
  READ_SUCCESS='[Employee] Read: success',
  READ_ERROR='[Employee] Read: error'
}

export class Read implements Action{
  readonly type=Types.READ;
  constructor(){}
}

export class ReadSucces implements Action{
  readonly type=Types.READ_SUCCESS;
  constructor(public items: User[]){}
}

export class ReadError implements Action{
  readonly type=Types.READ_ERROR;
  constructor(public error:string){}
}


export type All= Read|ReadSucces|ReadError;
