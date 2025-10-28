import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {jwtDecode} from 'jwt-decode';

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
 return this.http.post(`${this.apiUrl}/auth/logout`,{withCredentials:true})
}

hasAuthCookie():boolean{
   // Can't read HttpOnly, but you can infer login from app state (like a flag after login)
return !!this.isLoggedIn; //return a "strict" boolean from a function
}


// getToken(){
//   //let cookie ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGluaUBrYWFzaGl2LmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzYxNjUxMjQ2LCJpc3MiOiJDYXJLYWFzaGl2QXV0aFNlcnZlciIsImF1ZCI6IkNhckthYXNoaXZDbGllbnQifQ.yNOVR2DKS78fA9rjsJDoD_Tciu0Vi2_e8D9NBmxkbaY"
// document.cookie = "auth_token=12345; path=/";
//   const cookies = document.cookie.split(';');
// const tokenCookie = cookies.find(row => row.startsWith(`${this.tokenkey}=`));
// console.log("tokenCookie",tokenCookie)
// return tokenCookie ? tokenCookie.split('=')[1]:null;
// }

  // /** Decode token payload */
  // decodeToken():any |null{
  //   const token = this.getToken();
  //   if(!token)return null;
  //   try{
  //     return jwtDecode(token);
  //   }catch(error){
  //     console.log('Invalid token:',error);
  //     return null;
  //   }      
  //   }

    getCurrentUser():any{
      throw new Error('Method not implements');
      //return this.decodeToken();
    }

  }

