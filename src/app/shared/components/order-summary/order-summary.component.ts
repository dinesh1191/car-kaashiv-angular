import { Component, Input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  imports: [MATERIAL_IMPORTS, CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  @Input() payments: any[] = []; 
  
  getInitials(name: string): string {
  return name ? name.substring(0, 2).toUpperCase() : '';
}

}
