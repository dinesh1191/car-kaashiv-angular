import { Component,Input, Output, EventEmitter, HostListener } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-part-list-view',
  imports: [SharedModule,EmptyStateComponent],
  standalone: true,
  templateUrl: './part-list-view.component.html',
  styleUrls: ['./part-list-view.component.scss']
})
export class PartListViewComponent {

  @Input() parts: any[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  isMobile = false;

  columns = ['image', 'name', 'price', 'stock', 'actions'];

  ngOnInit() {
    this.checkScreen(window.innerWidth);
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen(window.innerWidth);
  }

  private checkScreen(width: number) {
    this.isMobile = width <= 480;
  }

}
