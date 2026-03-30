import { CommonModule } from '@angular/common';
import { Component,Input} from '@angular/core';
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
  styles: `
  .empty-container{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    text-align:center;
    padding:24px;
    color:#6b7280;
  }
  h3{
    margin-top: 12px;
    font-size: 18px;
    font-weight: 600;
  }
  p{
    font-size:14px;
    margin-top: 4px;
  } 
  `,
})
export class EmptyStateComponent {
  @Input() title = 'No Data Found';
  @Input() description = 'There is nothing to display here.';
  @Input() icon = 'inbox';  
}
