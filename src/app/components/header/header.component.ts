import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../store/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() isAuthotizrd !: boolean|null;
  @Output () signOut = new EventEmitter<void>();

  @Input() user!: User |null;

  constructor(
    private router: Router
  ){}

  onSignOut():void{
    this.signOut.emit();
  }

  OnProfileNavigate():void{
    console.log('this.user.uid', this.user);
    const path = this.user ? this.user.uid : 'new';
    this.router.navigate(['/profile', path]);

  }

}
