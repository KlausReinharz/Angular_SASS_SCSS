import { Injectable} from '@angular/core';
import { Actions, ofType, createEffect} from '@ngrx/effects';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/compat/firestore';

import { Observable, of, zip, from } from 'rxjs';
import {map, switchMap, catchError, take} from "rxjs/operators";

import { Dictionaries, Dictionary, Item, ControlItem } from "./dictionaries.models";

import * as fromActions from './dictionaries.actions';

import * as jsonCountries from '../../../assets/countries.json'

type Action = fromActions.All;

const documentItem = (x: DocumentChangeAction<any>): Item => {
  const data = x.payload.doc.data();
  return {
    id: x.payload.doc.id,
    ...data
  };
}
const itemToControlItem = (x: Item): ControlItem => ({
  value: x.id,
  label: x.name,
  icon: x.icon
});

const addDictionary = (items: Item[]): Dictionary => ({
  items,
  ControlItems: [...items].map((x) => itemToControlItem(x))
})

@Injectable()
export class DictionariesEffects{
  constructor(private actions: Actions, private afs: AngularFirestore){}
  read:Observable<Action>=createEffect( ()=>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap( ()=>{
        return zip(
          this.afs.collection('roles').snapshotChanges().pipe(
            take(1),
            map(itmes => itmes.map(x=>documentItem(x) ))
          ),
          this.afs.collection('specializations').snapshotChanges().pipe(
            take(1),
            map(itmes => itmes.map(x=>documentItem(x) ))
          ),
          this.afs.collection('qualifications').snapshotChanges().pipe(
            take(1),
            map(itmes => itmes.map(x=>documentItem(x) ))
          ),
          this.afs.collection('skills').snapshotChanges().pipe(
            take(1),
            map(itmes => itmes.map(x=>documentItem(x) ))
          ),
          of((jsonCountries as any).default.map((country:any) =>({
            id:country.code.toUpperCase(),
            name: country.name,
            icon:{
              src:null,
              cssClass: 'fflag fflag-'+country.code.toUpperCase()
            }
            }))
          )
        ).pipe(
          map(([roles, specializations, qualifications, skills, countries])=>{
            const dictionaries: Dictionaries = {
              roles:addDictionary(roles),
              specializations:addDictionary(specializations),
              qualifications:addDictionary(qualifications),
              skills:addDictionary(skills),
              countries:addDictionary(countries)
            };
            return new fromActions.ReadSucces(dictionaries);
          }),
          catchError(err=> of(new fromActions.ReadError(err.message)))
        )
      })
    )
  )
}
