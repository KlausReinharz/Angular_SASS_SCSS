import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import *as fromForm from './form/form.reducer';

import * as formUser from './user/user.reducer';
import { UserEffects } from "./user/user.effects";

export interface ProfileState{
  form: fromForm.FormState;
  user: formUser.UserState;
}

export const reducers: ActionReducerMap<ProfileState> = {
  form: fromForm.reducer,
  user: formUser.reducer
}

export const effects: any[]=[
  UserEffects
]
export const getProfileState = createFeatureSelector<ProfileState>('profile');
