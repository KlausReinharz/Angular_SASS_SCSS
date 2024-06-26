import { Component } from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Ecommerce';
  IsAuthorized$!: Observable<boolean>;

  user$!: Observable<fromUser.User>

  constructor(private store:Store<fromRoot.State>){}

  // se dispara para la carga

  ngOnInit(){
    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.User>;

    this.IsAuthorized$=this.store.pipe(select(fromUser.getIsAuthorized));

    this.store.dispatch(new fromUser.Init());
    this.store.dispatch(new fromDictionaries.Read());
  }

  onSignOut():void{
    this.store.dispatch(new fromUser.SignOutEmail())
  }
}
