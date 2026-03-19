import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MATERIAL_IMPORTS } from '../../material';


@Component({
  selector: 'app-empty-state',
  imports: [CommonModule, MATERIAL_IMPORTS, SharedModule],
  template: `
    <div class="empty-container">
      <mat-icon>{{ icon }}</mat-icon>
      <h3>{{ title }}</h3>
       <p>{{ description }}</p>      
    </div>
  `,
  styles: ``,
})
export class EmptyStateComponent {
  @Input() title = 'No Data Found';
  @Input() description = 'There is nothing to display here.';
  @Input() icon = 'inbox';  
}
