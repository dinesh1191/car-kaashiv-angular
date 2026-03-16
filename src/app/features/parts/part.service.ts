import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api-response.model';
import { Part } from '../../models/part.model';
import { HTTP_CONTEXT } from '../../core/constants/http-context.constants';

@Injectable({
  providedIn: 'root'
})
export class PartService {
private apiUrl = `${environment.apiBaseUrl}/api/parts`;

  constructor(private http:HttpClient) { }

  getAllParts(): Observable<ApiResponse<Part[]>> {
  return this.http.get<ApiResponse<Part[]>>(`${this.apiUrl}`,{headers: new HttpHeaders().set(HTTP_CONTEXT.SKIP_SUCCESS, 'true'),withCredentials:true});
 }
 getPartById(id:number):Observable<ApiResponse<Part>>{
  return this.http.get<ApiResponse<Part>>(`${this.apiUrl}/${id}`,{withCredentials:true})
 }

  addPart(formData: FormData):Observable<ApiResponse<Part>> {
    return this.http.post<ApiResponse<Part>>(`${this.apiUrl}`,formData);
  }

  updatePart(id:number,part:Part):Observable<ApiResponse<Part>>{
    return this.http.put<ApiResponse<Part>>(`${this.apiUrl}/${id}`, part,{withCredentials:true});
  }

  deletePart(id:number) : Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`,{ withCredentials: true });
  }
  
  /** Helper to convert plain object + file into FormData */
  buildFormData(data: any, file?: string): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value as string);
    });
    // if (file) formData.append('part_image', file);
    return formData;
  }

  

  
}
