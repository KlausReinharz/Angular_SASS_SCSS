import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { dataURLtoFile } from '../../utils/file';


@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrl: './cropper.component.scss'
})
export class CropperComponent {
  @Input() imageFile!: File ;
  @Output() changed = new EventEmitter<File>();

  croppedImage!: string;


  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64 as string;
    console.log(this.croppedImage);
  }

  onCrop(){
      const file = dataURLtoFile(this.croppedImage, this.imageFile);
      this.changed.emit(file);
      console.log(file+'Oncrop');
  }
}
