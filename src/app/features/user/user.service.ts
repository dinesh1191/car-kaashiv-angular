import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiBaseUrl+`/api/auth`;

  constructor(private http:HttpClient) { }




registerUser(payload:any):Observable<ApiResponse<any>>{
  return this.http.post<ApiResponse<any>>(`${this.apiUrl}/register-user`,payload);
  }
}
