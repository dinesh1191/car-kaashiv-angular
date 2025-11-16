import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }




registerUser(payload:any){
  return this.http.post(`${this.apiUrl}/auth/register`,payload);
  }
}
