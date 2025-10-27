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


  constructor(private http:HttpClient) { }

  login(payload:LoginRequest):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`, payload, { withCredentials: true });
  };


 logout():Observable<any>{
 return this.http.post(`${this.apiUrl}/auth/logout`,{withCredentials:true})
}

getToken(){
const cookies = document.cookie.split('; ');
const tokenCookie = cookies.find(row => row.startsWith(`${this.tokenkey}=`));
return tokenCookie ? tokenCookie.split('=')[1]:null;
}

  /** Decode token payload */
  decodeToken():any |null{
    const token = this.getToken();
    if(!token)return null;
    try{
      return jwtDecode(token);
    }catch(error){
      console.log('Invalid token:',error);
      return null;
    }      
    }

    getCurrentUser():any{
      return this.decodeToken();
    }
  }

