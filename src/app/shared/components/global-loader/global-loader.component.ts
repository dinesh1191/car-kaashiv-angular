import { Component } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { LoaderService } from '../../../core/services/loader.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-global-loader',
  imports: [MatProgressSpinner, NgIf,AsyncPipe],
  standalone: true,
  template: 
  `<div class="loader-overlay" *ngIf=" loaderService.isLoading$ | async">
<mat-progress-spinner mode='indeterminate' diameter="50"></mat-progress-spinner>
  </div>`
   ,
  styles: [
     `
    .loader-overlay{
      position : fixed;
      top:0;left:0;
      right:0;bottom:0;
      background: rgba(255,255,255,0.6);
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:2000
    }
    `
  ]
})
export class GlobalLoaderComponent {

constructor( public loaderService:LoaderService){}


}
