import { User } from "./list.models";
import * as fromActions from './list.actions';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, map, of, switchMap, take } from "rxjs";
import { Injectable } from "@angular/core";

import { extractDocumentChangeActionData } from "../../../../shared/utils/data";


type Action = fromActions.All;

@Injectable()
export class ListEffects {

    constructor(
        private actions: Actions,
        private afs: AngularFirestore
    ){}

    read: Observable<Action> = createEffect( () =>
        this.actions.pipe(
            ofType(fromActions.Types.READ),
            switchMap(() =>
                this.afs.collection<User>('users', ref => ref.where('roleId','==','employee')).snapshotChanges().pipe(
                    take(1),
                    map(changes => changes.map( x => extractDocumentChangeActionData(x, false))),
                    map((items: User[]) => new fromActions.ReadSucces(items)),
                    catchError(err => of(new fromActions.ReadError(err.message)))
                )
            )
        )
    );
}
