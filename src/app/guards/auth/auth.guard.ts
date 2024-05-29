import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment, UrlTree, CanMatchFn, CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store';
import * as fromUser from '../../store/user'
import { filter, map, take, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivateFn, CanActivateChildFn, CanMatchFn{
  constructor(private router: Router, private store: Store<fromRoot.State>){}

  private check():Observable<boolean> {
    return this.store.pipe(select(fromUser.getUserState)).pipe(
      filter(state => !state.loading),
      take(1),
      tap(state => {
        if(!state.uid){
          this.router.navigate(['auth/login']);
        }
      }),
      map(state => !!state.uid)
    )
  }

  canActivateFn(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }
  canActivateChildFn(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }
  canMatchFn(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }
}
