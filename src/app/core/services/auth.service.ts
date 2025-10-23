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
    return this.http.post<any>(this.apiUrl,payload)
    .pipe(
      tap(response =>{
        if(response?.data?.token){
          //step 1: store JWT in LocalStorage temporaily
          localStorage.setItem('authToken',response.data.token);
          localStorage.setItem('username',response.data.username);
          localStorage.setItem('role',response.data.role);
        }
      })
    )
  };

logout():void{
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
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
