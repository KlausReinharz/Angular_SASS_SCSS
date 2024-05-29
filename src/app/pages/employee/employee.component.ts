import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import * as fromRoot from '../../store';
import * as fromList from './store/list';
import {User} from './store/list/list.models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit{

  employee$!: Observable<User[]>;

  constructor(
    private store: Store<fromRoot.State>
  ){}

  ngOnInit(): void {
    this.employee$ = this.store.pipe(select(fromList.getItems)) as Observable<User[]>;
    this.store.dispatch(new fromList.Read());

    this.employee$.subscribe(data => {
      console.log(data);
    })

  }

}
