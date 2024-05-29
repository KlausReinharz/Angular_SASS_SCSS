import * as fromList from './list/list.reducer';
import { ListEffects } from './list/list.effects';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface EmployeeState{
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<EmployeeState> = {
  list: fromList.reducer
};


export const effects: any [] = [
  ListEffects
]

export const getEmployeeState = createFeatureSelector<EmployeeState>('employee');

