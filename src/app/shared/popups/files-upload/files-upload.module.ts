import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploadDirective } from './files-upload.directive';
import { FilesUploadComponent } from './files-upload.component';

import {MatDialogModule} from '@angular/material/dialog';
import {ImageCropperModule} from 'ngx-image-cropper';
import { DropZoneDirective } from './directives/drop-zone/drop-zone.directive';
import { UploadComponent } from './components/upload/upload.component';
import { SizePipe } from './pipes/file-size/file/size.pipe';
import { CropperComponent } from './components/cropper/cropper.component';

@NgModule({
  declarations: [
    FilesUploadDirective,
    FilesUploadComponent,
    DropZoneDirective,
    UploadComponent,
    SizePipe,
    CropperComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ImageCropperModule,
  ],
  exports:[
    FilesUploadDirective
  ]
})
export class FilesUploadModule { }
