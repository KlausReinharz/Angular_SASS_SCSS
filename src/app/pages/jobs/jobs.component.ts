import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/';
import * as fromUser from '../../store/user/';
import * as fromList from './store/list';
import { Job } from './store/list/list.models';
import { Observable, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsComponent implements OnInit{
  jobs$!: Observable<Job[]>;
  IsEditable$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.jobs$ = this.store.pipe(select(fromList.selectAll)) as Observable<Job[]>;
    this.IsEditable$=this.store.pipe(
      select(fromUser.getRoleId),
      map((roleId:any)=>['recruiter','employee'].includes(roleId))
    )
    this.store.dispatch(new fromList.Read());

    this.jobs$.subscribe(data => {
      console.log(data,'job');
    })

  }

  onAdd():void{
    this.dialog.open(FormComponent,{
      width: '650px',
      height: '220px',
      data:{}
    });


  }

  onEdit(value:Job):void{
    this.dialog.open(FormComponent,{
      width: '650px',
      height: '220px',
      data:{value}
    });

  }

  onDelete(id:string):void{
    this.store.dispatch(new fromList.Delete(id));

  }


}
