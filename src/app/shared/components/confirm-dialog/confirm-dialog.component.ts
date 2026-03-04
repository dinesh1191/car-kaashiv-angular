import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../material';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions,MATERIAL_IMPORTS],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
  ) {}
  confirm(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}

