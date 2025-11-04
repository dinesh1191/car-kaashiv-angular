import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from './shared/material';
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';
import { LoaderService } from './core/services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...MATERIAL_IMPORTS, GlobalLoaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
constructor(public loaderService:LoaderService){}
  title = 'car-kaashiv-angular';
  ngAfterViewInit(){
console.log("Appcomponent checked at:",performance.now());
  }
}
