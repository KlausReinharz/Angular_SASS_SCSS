import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrl: './files-upload.component.scss',
})
export class FilesUploadComponent implements OnInit {
  isHovering?: boolean;

  files: File[] = [];
  imageFile!: File | null;
  isError!: boolean;

  filesURls: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    this.dropGeneral(files);
  }

  onDropFile(event: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  dropGeneral(files: FileList): void {
    this.isError = false;

    if (this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }
    // aqui en vez de image le puse imagen pero no lee el recortar

    if(this.data.crop && files.length === 1 && files.item(0)?.type.split('/')[0]==='imagen'){
      this.imageFile = files.item(0) as File;
      console.log(this.imageFile);
      return;
    }


    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i) as File);
    }

    console.log(files);
  }
  onUploadComplete(url: string): void {
    this.filesURls.push(url);
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesURls : this.filesURls[0];
    this.dialogRef.close(res);
  }
  onClose(): void {
    this.dialogRef.close();
  }

  onCrop(file: File): void {
    this.imageFile = null;
    this.files.push(file);
  }
}
