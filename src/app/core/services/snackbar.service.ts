import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isDevMode } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    type: 'success' | 'error' | 'warning' = 'success',
    duration = 10000,err?:any) {    
    
      const panelClass =
        type === 'error'
        ? 'snackbar-error'
        : type === 'warning'
        ? 'snackbar-warning'
        : 'snackbar-success';
        const icon = type === 'success' ? ' ✔' : type === 'error' ? ' ✖' : ' ⚠️';
   
    


    // Developer-only console log (won’t show in production build)
    if(isDevMode() && err){
        console.warn('[DevMode Error Details]',err);        
    }


    // User-friendly snackbar
    this.snackBar.open(message + `${icon}`, 'Close', {
      duration,
      panelClass: [`${panelClass}`],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
