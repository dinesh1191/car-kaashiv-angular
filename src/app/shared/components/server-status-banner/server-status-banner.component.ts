import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-server-status-banner',
  imports: [CommonModule],
  templateUrl: './server-status-banner.component.html',
  styleUrl: './server-status-banner.component.scss',
})
export class ServerStatusBannerComponent {
  @Input() status: 'checking' | 'healthy' | 'unhealthy' = 'checking';

  get message(): string {
    switch (this.status) {
      case 'checking':
        return 'Waking up server… this may take a few seconds';
      case 'healthy':
        return 'Server is ready';
      case 'unhealthy':
        return 'Server is unavailable.Please try again later';
      default:
        return 'unknown error';
    }
  }
}
