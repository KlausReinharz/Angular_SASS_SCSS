import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './components/notification/notification.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class NotificacionModule {
  static forRoot(): ModuleWithProviders<NotificacionModule>{
    return{
      ngModule:NotificacionModule,
      providers:[
        NotificationService
      ]
    };
  }
 }
