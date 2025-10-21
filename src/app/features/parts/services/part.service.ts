import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Part} from '../../../models/part.model'
import { ApiResponse } from '../../../models/api-response.model';
@Injectable({
  providedIn: 'root'
})
export class PartService {
private apiUrl = `${environment.apiBaseUrl}/parts`;
private delete = this.apiUrl+`delete`
  constructor(private http:HttpClient) { }

  getParts(): Observable<ApiResponse<Part[]>> {
  return this.http.get<ApiResponse<Part[]>>(`${this.apiUrl}`);
 }

  addPart(part:Part):Observable<ApiResponse<Part>> {
    return this.http.post<ApiResponse<Part>>(this.apiUrl,part);
  }

  updatePart(id:number,part:Part):Observable<ApiResponse<Part>>{
    return this.http.put<ApiResponse<Part>>(`${this.apiUrl}/${id}`, part);
  }

  deletePart(id:number) : Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
  
}
