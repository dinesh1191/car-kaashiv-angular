import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { environment } from '../../../environments/environment';


interface LoginRequest{
  username:string;
  password:string;
}

interface LoginResponse{
  token:string;
  username:string;
  role:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = `${environment.apiBaseUrl}/auth/login`;

  constructor(private http:HttpClient) { }

  login(payload:LoginRequest):Observable<any>{
    return this.http.post(this.apiUrl, payload,{withCredentials:true})    
  };


 logout():Observable<any>{
 return this.http.post(this.apiUrl,{},{withCredentials:true})
}

isAuthenticated():boolean{
  return !!localStorage.getItem('authToken');//!! is a double negation operator converts any value into a strict boolean
}

getToken(){
  return localStorage.getItem('authToken');
}
 saveToken(token:string):void{
  localStorage.setItem('auth_token',token);
 }
}
