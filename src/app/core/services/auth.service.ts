import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import { SKIP_LOADER } from '../interceptors/api-response.interceptor';

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
private apiUrl = `${environment.apiBaseUrl}`;
private tokenkey = `auth_token`//used in cookies/localstorage

isLoggedIn = false;
  constructor(private http:HttpClient) { }

  login(payload:LoginRequest):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`, payload, { withCredentials: true });
  };

 logout():Observable<any>{
 return this.http.post(`${this.apiUrl}/auth/logout`,{ withCredentials:true})
 }

hasAuthCookie():boolean{ // Can't read HttpOnly, but you can infer login from app state (like a flag after login)   
return !!this.isLoggedIn; //!! return a "strict" boolean from a function
}

getProfileDetails():Observable<any>{
return this.http.get(`${this.apiUrl}/auth/me`,{ context:new HttpContext().set(SKIP_LOADER,true), withCredentials:true })}

    getCurrentUser():any{
      throw new Error('Method not implements');
      //return this.decodeToken();
    }

  }

