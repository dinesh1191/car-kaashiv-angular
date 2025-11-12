import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../material';
import { PRIME_IMPORTS } from '../../../prime';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule,    
    ...MATERIAL_IMPORTS,
    ...PRIME_IMPORTS],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
 sidebarVisible = false;
}
