import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() isAuthotizrd !: boolean|null;
  @Output () signOut = new EventEmitter<void>();

  onSignOut():void{
    this.signOut.emit();
  }

}
