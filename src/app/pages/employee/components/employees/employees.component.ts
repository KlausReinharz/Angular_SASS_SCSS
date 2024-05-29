import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import {User} from '../../store/list/list.models';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {
  @Input() employees!: User;



  constructor() { }

  ngOnInit(): void {
    console.log(this.employees)
  }

}
