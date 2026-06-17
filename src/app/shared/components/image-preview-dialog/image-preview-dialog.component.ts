import { Component, Inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material';
import { ImagePreviewDialogData } from './image-preview-dialog.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview-dialog',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './image-preview-dialog.component.html',
  styleUrl: './image-preview-dialog.component.scss'
})
export class ImagePreviewDialogComponent {
constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ImagePreviewDialogData,
) {}
}
