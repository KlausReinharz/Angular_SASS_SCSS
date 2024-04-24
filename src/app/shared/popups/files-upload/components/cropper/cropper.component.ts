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

  croppedImage!: string|any;


  imageCropped(event: ImageCroppedEvent){
    fetch(event.objectUrl)
      .then(response=>response.blob())
      .then(blob=>{
        const reader = new FileReader();
        reader.onloadend =() =>{
          this.croppedImage = reader.result;
        };
        reader.readAsDataURL(blob);
      })
    /*
    this.croppedImage = event.base64 as string;
    console.log(this.croppedImage);*/
  }

  onCrop(){
    const file = dataURLtoFile(this.croppedImage,this.imageFile);
    this.changed.emit(file);
    /*
      const file = dataURLtoFile(this.croppedImage, this.imageFile);
      this.changed.emit(file);
      console.log(file+'Oncrop');*/

  }
}
