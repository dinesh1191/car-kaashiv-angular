import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../models/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

registerEmployee(employeeData:any):Observable<ApiResponse<any>>{
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/auth/register-employee`, employeeData);
}
}
