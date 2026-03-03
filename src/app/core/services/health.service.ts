import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = `${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) { }  
  
     getServerHealth(): Observable<any> {
      return this.http.get(`${this.apiUrl}/health/db`, {
      responseType:'text',
      headers:{'SKIP_LOADER':'true'}, // global spinner loader will not be executed
      withCredentials: false,
    });
  }
}
