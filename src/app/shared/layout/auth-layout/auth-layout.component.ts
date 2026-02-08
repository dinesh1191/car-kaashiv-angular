import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../material';
import { CommonModule } from '@angular/common';
import { PRIME_IMPORTS } from '../../prime';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule,
    ...MATERIAL_IMPORTS,
    ...PRIME_IMPORTS, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
