import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Employee } from '../../../../store/user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent {
  @Input() role!: Employee | any;

}
