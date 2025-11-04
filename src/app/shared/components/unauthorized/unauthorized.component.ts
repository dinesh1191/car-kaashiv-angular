import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [SharedModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
  constructor(
   private router:Router
  ){}

  goback(){
    this.router.navigate(['/login'])
  }
}
