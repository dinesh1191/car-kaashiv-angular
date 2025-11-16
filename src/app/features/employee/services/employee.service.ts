import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }


  registerEmployee(employeeData:any){
    return this.http.post(`${this.apiUrl}/employees/register`, employeeData);
}

}
