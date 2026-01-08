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
   status: 'checking' | 'healthy' | 'unhealthy' = 'checking';
  visible = true;


constructor(private serverStatusService:ServerStatusService){
 
}
ngOnInit() {
  this.serverStatusService.serverStatus$.subscribe(resStatus => {
    this.status = resStatus;
    this.visible = true; // show banner on status change

    if(this.status === 'healthy'){
      setTimeout(()=>{
        this.visible = false;
        console.log('banner hidden');       
      },3500) // hide banner after 1.5 seconds
    }
  });
  
}

  get message(): string {
    switch (this.status) {
      case 'checking': return 'Waking up server… this may take a few seconds';
      case 'healthy': return 'Server is ready';
      case 'unhealthy':return 'Server is unavailable.Please try again later';
      default: return 'unknown error';
    }
  }
}
