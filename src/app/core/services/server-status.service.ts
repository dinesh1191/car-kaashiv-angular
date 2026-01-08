import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type ServerStatus = 'checking' | 'healthy' | 'unhealthy';
@Injectable({
  providedIn: 'root',
})
export class ServerStatusService {

  
  private statusSubject = new BehaviorSubject<ServerStatus>('checking');
  
  serverStatus$ = this.statusSubject.asObservable();
   
  markHealthy() {this.statusSubject.next('healthy');}
  markUnHealthy() {this.statusSubject.next('unhealthy');}

  
    // private _isHealthy$ = new BehaviorSubject<boolean>(false);
  // isHealthy$ = this._isHealthy$.asObservable();

  // markHealthy() {
  //   this._isHealthy$.next(true); // Example initial status
  // }
}
