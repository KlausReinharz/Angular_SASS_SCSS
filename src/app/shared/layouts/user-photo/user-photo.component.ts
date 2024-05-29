import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrl: './user-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPhotoComponent {
  @Input() photoURL!: string ;

  constructor(
    private sanitizer: DomSanitizer
  ){}

  get safePhotoURL():SafeStyle | null{
    return this.photoURL ? this.sanitizer.bypassSecurityTrustStyle(`url(${this.photoURL})`): null;
  }

}
