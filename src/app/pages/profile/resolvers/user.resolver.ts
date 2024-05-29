import {Injectable, inject} from '@angular/core';
import * as fromRoot from '../../../store';
import * as fromUser from '../../../store/user';
import { ActivatedRouteSnapshot,ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of} from 'rxjs';
import {catchError, filter, map, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getUser } from '../store/user/user.selectors';

export const UserResolver: ResolveFn<fromUser.User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) =>{
  //const store = inject(Store<fromRoot.State>);
  //return store.pipe(select(fromUser.getUser),filter((user:any) => !!user), take(1));
  return inject(fromUser.getUser).getUser(route.paramMap.get('users'));
}

/*
@Injectable()
export class UserResolver implements Resolve<fromUser.User>{
  constructor(private store: Store<fromRoot.State>){}
  resolve(): Observable<fromUser.User>{
    return this.store.pipe(select(fromUser.getUser),filter((user:any) => !!user), take(1));
  }
}
*/


/*
export const UserResolver: ResolveFn<fromUser.User> = (
):Observable<fromUser.User> =>{
  const store = inject(Store<fromRoot.State>);
  return store.pipe(select(fromUser.getUser),filter((user:any) => !!user), take(1));
}

export const UserResolver: ResolveFn<fromUser.User> = (
): Observable<fromUser.User> => {
  const afs = inject(AngularFirestore);
  return afs.collection('users').doc('FEZjwn7iP9RAdSsgXPjeTFVjQgQ2').get().pipe(
    map((doc: any) => doc.data()),
    filter((user: any) =>!!user),
    take(1)
  );
}
*/
/*
export const UserResolver: ResolveFn<fromUser.User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):Observable<fromUser.User> =>{
  const store = inject(Store<fromRoot.State>);
  return store.pipe(select(fromUser.getUser),filter((user:any) => !!user), take(1));
}
*/
/*
export const UserResolver: ResolveFn<fromUser.User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,

): Observable<fromUser.User> => {
  const store = inject(Store<fromRoot.State>);
  return store.pipe(
    select(fromUser.getUser),
    filter((user: any) => !!user),
    tap((user: any) => console.log('User data:', user)),
    take(1)
  );
};

*/













