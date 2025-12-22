import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerStatusService {
  private _isHealthy$ = new BehaviorSubject<boolean>(false);
  isHealthy$ = this._isHealthy$.asObservable();

  markHealthy() {
    this._isHealthy$.next(true); // Example initial status
  }
}
