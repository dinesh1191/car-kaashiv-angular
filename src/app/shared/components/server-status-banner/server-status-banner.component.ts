import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ServerStatusService } from '../../../core/services/server-status.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-server-status-banner',
  imports: [CommonModule],
  templateUrl: './server-status-banner.component.html',
  styleUrl: './server-status-banner.component.scss',
})
export class ServerStatusBannerComponent {
  @Input() status: 'checking' | 'healthy' | 'unhealthy' = 'checking';
  isHealthy$ : Observable<boolean>;

constructor(private serverStatusService:ServerStatusService){
  this.isHealthy$ = this.serverStatusService.isHealthy$;
}

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
